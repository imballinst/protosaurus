import fs, { writeFile } from "fs-extra";

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
  messageStrings: string;
}

// Main exported functions.
export async function convertPackageToMdx(packagePath: string) {
  const content = await fs.readFile(packagePath, "utf-8");
  const json: {
    files: Protofile[];
  } = JSON.parse(content);
  const messageData: MessageData[] = [];

  for (const file of json.files) {
    if (!file.messages) {
      continue;
    }

    const length = file.messages.length;

    for (let i = 0; i < length; i++) {
      const message = file.messages[i];
      messageData.push({
        name: message.name,
        messageStrings: getMessageString(message),
      });
    }
  }

  return messageData;
}

export async function emitMessagesJson(
  filePath: string,
  messages: MessageData[]
) {
  const map: { [index: string]: string } = {};
  for (const message of messages) {
    map[message.name] = `#${message.name.toLowerCase()}`;
  }

  return writeFile(`${filePath}.json`, JSON.stringify(map));
}

export async function emitMdx(filePath: string, messages: MessageData[]) {
  // Separate each message with double new lines.
  const messageStrings = messages.map((m) => m.messageStrings).join("\n\n");
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
import Json from "@site/static/toc.json";

${messageStrings}`.trim()
  );
}

function getMessageString(message: ProtoMessage) {
  const fields = message.fields
    .map((field, idx) => getField(field, idx + 1))
    .join("\n");
  let messageBlock = "";

  if (fields === "") {
    messageBlock = "{}";
  } else {
    messageBlock = `{\n${fields}\n}`;
  }

  return `<Definition>

<DefinitionHeader name="message">

## ${message.name}

</DefinitionHeader>

${message.description}

\`\`\`protosaurus
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
