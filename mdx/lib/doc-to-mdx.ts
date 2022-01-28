import fs, { writeFile } from "fs-extra";
import path from "path";

// Types.
interface Protofile {
  name: string;
  title: string;
  description: string;
  package: string;
  hasEnums: false;
  hasExtensions: boolean;
  hasMessages: boolean;
  hasServices: boolean;
  // TODO(imballinst): create proper typing.
  enums: any;
  extensions: any;
  messages: ProtoMessage[];
  services: ProtoService[];
}

interface ProtoMessage {
  name: string;
  longName: string;
  fullName: string;
  description: string;
  hasExtensions: boolean;
  hasFields: boolean;
  hasOneofs: boolean;
  extensions: any[];
  fields: Field[];
}

interface Field {
  name: string;
  description: string;
  label: string;
  type: string;
  longType: string;
  fullType: string;
  ismap: boolean;
  isoneof: boolean;
  oneofdecl: string;
  defaultValue: string;
  options?: {
    [index: string]: any;
  };
}

interface ProtoService {
  name: string;
  longName: string;
  fullName: string;
  description: string;
  methods: {
    name: string;
    description: string;
    requestType: string;
    requestLongType: string;
    requestFullType: string;
    requestStreaming: boolean;
    responseType: string;
    responseLongType: string;
    responseFullType: string;
    responseStreaming: boolean;
    options: any;
  };
}

export interface MessageData {
  name: string;
  packageName: string;
  hash: string;
  messageStrings: string;
}

export interface PackageData {
  name: string;
  messagesData: MessageData[];
}

// Main exported functions.
export async function convertPackageToMdx(packagePath: string) {
  const content = await fs.readFile(packagePath, "utf-8");
  const json: {
    files: Protofile[];
  } = JSON.parse(content);
  const packageData: PackageData[] = [];

  for (const file of json.files) {
    if (!file.messages) {
      continue;
    }

    const length = file.messages.length;
    const messagesData: MessageData[] = [];

    for (let i = 0; i < length; i++) {
      const message = file.messages[i];
      // When a `longName` has a "dot" separator, then it's a submessage.
      const messageNameArray = message.longName.split(".");

      messagesData.push({
        name: message.longName,
        packageName: file.package,
        hash: message.longName.toLowerCase().replace(".", ""),
        messageStrings: getMessageString({
          message,
          parentMessage:
            messageNameArray.length > 1 ? messageNameArray[0] : undefined,
          packageName: file.package,
        }),
      });
    }

    packageData.push({
      name: file.package,
      messagesData,
    });
  }

  return packageData;
}

export async function emitMessagesJson({
  filePath,
  messages,
  isWkt,
}: {
  filePath: string;
  messages: MessageData[];
  isWkt?: boolean;
}) {
  const map: { [index: string]: string } = {};

  for (const message of messages) {
    const { name, packageName, hash } = message;
    // For example:
    // If it's not WKT, then it's /docs/booking.v1#Booking.
    // If it's WKT, then it's /docs/wkt/google.protobuf#Int32.
    map[name] = `/docs/${isWkt ? "wkt/" : ""}${packageName}#${hash}`;
  }

  // Check for existence and create parent directories, if not exist.
  await createParentDirectoriesIfNotExist(filePath);

  return writeFile(`${filePath}.json`, JSON.stringify(map));
}

export async function emitMdx(filePath: string, messages: MessageData[]) {
  // Separate each message with double new lines.
  const messageStrings = messages.map((m) => m.messageStrings).join("\n\n");

  // Check for existence and create parent directories, if not exist.
  await createParentDirectoriesIfNotExist(filePath);

  return writeFile(
    `${filePath}.mdx`,
    `
---
---

import ReferenceWrapper from "@theme/ReferenceWrapper";
import DefinitionHeader from "@theme/DefinitionHeader";
import Definition from "@theme/Definition";
import RpcDefinition from "@theme/RpcDefinition";
import RpcDefinitionHeader from "@theme/RpcDefinitionHeader";
import RpcDefinitionDescription from "@theme/RpcDefinitionDescription";
import Description from "@theme/Description";

${messageStrings}\n`.trimStart()
  );
}

// Helper functions.
async function createParentDirectoriesIfNotExist(filePath: string) {
  const parentDirectory = path.dirname(filePath);

  try {
    await fs.stat(parentDirectory);
  } catch (err) {
    // Not found.
    await fs.mkdirp(parentDirectory);
  }
}

function getMessageString({
  message,
  parentMessage,
  packageName,
}: {
  message: ProtoMessage;
  parentMessage?: string;
  packageName: string;
}) {
  const fields = message.fields
    .map((field, idx) => getField(field, idx + 1))
    .join("\n");
  let heading = "";
  let messageBlock = "";

  if (fields === "") {
    messageBlock = "{}";
  } else {
    messageBlock = `{\n${fields}\n}`;
  }

  if (parentMessage) {
    // Set heading 3 for submessages.
    heading = `### ${parentMessage}.${message.name}`;
  } else {
    // Otherwise, heading 2.
    heading = `## ${message.name}`;
  }

  return `<Definition>

<DefinitionHeader name="message">

${heading}

</DefinitionHeader>

${message.description.replace(/\//g, "\\/")}

\`\`\`protosaurus--${packageName}.${message.name}
message ${message.name} ${messageBlock}
\`\`\`

</Definition>`;
}

function getField(field: Field, num: number) {
  return `  ${getCommentString(field.description)}
  ${field.type} ${field.name} = ${num};`;
}

function getCommentString(comment: string) {
  const lines = comment.split("\n");
  for (let i = 0; i < lines.length; i++) {
    lines[i] = `// ${lines[i]}`;
  }

  return lines.join("\n");
}
