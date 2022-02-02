import fs, { writeFile } from "fs-extra";
import {
  Field,
  MessageData,
  PackageData,
  Protofile,
  ProtoMessage,
  ProtoService,
  ServiceMethod,
} from "./types";

// Main exported functions.
export async function convertPackageToMdx(packagePath: string) {
  const content = await fs.readFile(packagePath, "utf-8");
  const json: {
    files: Protofile[];
  } = JSON.parse(content);
  const packageData: PackageData[] = [];
  const rawProtoMessages: ProtoMessage[] = [];

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
        body: getMessageString({
          message,
          parentMessage:
            messageNameArray.length > 1 ? messageNameArray[0] : undefined,
          packageName: file.package,
          level: 1,
        }),
      });
    }

    packageData.push({
      name: file.package,
      description: file.description,
      messagesData,
      servicesData: [],
      rawProtoServices: file.services,
    });
    rawProtoMessages.push(...file.messages);
  }

  return { packageData, rawProtoMessages };
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
    // If it's not WKT, then it's /docs/messages/booking.v1#Booking.
    // If it's WKT, then it's /docs/wkt/google.protobuf#Int32.
    map[name] = `/docs/${isWkt ? "wkt" : "messages"}/${packageName}#${hash}`;
  }

  return writeFile(`${filePath}.json`, JSON.stringify(map));
}

export async function emitMdx(filePath: string, pkg: PackageData) {
  const services = pkg.servicesData.map((m) => m.body).join("\n\n");
  const messages = pkg.messagesData.map((m) => m.body).join("\n\n");

  const servicesString = services.length ? `## Services\n\n${services}` : "";
  const messagesString = messages.length ? `## Messages\n\n${messages}` : "";

  return writeFile(
    `${filePath}.mdx`,
    `
---
---

import ReferenceWrapper from "@theme/ReferenceWrapper";
import Description from "@theme/Description";
import Definition from "@theme/Definition";
import DefinitionHeader from "@theme/DefinitionHeader";
import RpcDefinition from "@theme/RpcDefinition";
import RpcDefinitionHeader from "@theme/RpcDefinitionHeader";
import RpcDefinitionDescription from "@theme/RpcDefinitionDescription";
import RpcMethodText from "@theme/RpcMethodText";

${getPackageDescription(pkg)}

${servicesString}${messagesString}\n`.trimStart()
  );
}

export async function emitCategoryMetadata(directory: string, label: string) {
  const metadata = `
label: ${label}
  `.trim();

  return writeFile(`${directory}/_category_.yml`, metadata);
}

export async function createDirectoryIfNotExist(directory: string) {
  try {
    await fs.stat(directory);
  } catch (err) {
    // Not found.
    await fs.mkdirp(directory);
  }
}

export function getServiceString({
  service,
  packageName,
  allProtoMessages,
  allWktMessages,
}: {
  service: ProtoService;
  packageName: string;
  allProtoMessages: Record<string, ProtoMessage>;
  allWktMessages: Record<string, ProtoMessage>;
}) {
  const serviceBody: string[] = [];

  for (const method of service.methods) {
    serviceBody.push(
      getServiceMethodString({
        method,
        packageName,
        allProtoMessages,
        allWktMessages,
      })
    );
  }

  return `<Definition>

<DefinitionHeader name="service">

### ${service.name}

</DefinitionHeader>

${service.description}

${serviceBody.join("\n\n")}

</Definition>\n\n`;
}

// Helper functions.
function getPackageDescription(pkg: PackageData) {
  if (pkg.description === "") {
    return "";
  }

  return `
<Description>

${pkg.description}

</Description>
  `.trim();
}

// Messages.
function getMessageString({
  message,
  parentMessage,
  packageName,
  isLongVersion = true,
  level,
}: {
  message: ProtoMessage;
  parentMessage?: string;
  isLongVersion?: boolean;
  packageName: string;
  level: number;
}) {
  const messageBody = getMessageBody({
    packageName,
    message,
    isLongVersion,
    level,
  });

  return `<Definition>

${getMessageHeading(message.name, parentMessage, isLongVersion)}

${messageBody}

</Definition>`;
}

function getMessageHeading(
  name: string,
  parentMessage: string | undefined,
  isLongVersion: boolean
) {
  if (!isLongVersion) {
    return "";
  }

  let heading = name;

  if (isLongVersion) {
    if (parentMessage) {
      // Set heading 3 for submessages.
      heading = `#### ${parentMessage}.${name}`;
    } else {
      // Otherwise, heading 2.
      heading = `### ${name}`;
    }
  }

  return `
<DefinitionHeader name="message">

${heading}

</DefinitionHeader>
  `.trim();
}

function getMessageBody({
  packageName,
  message,
  isLongVersion,
  level,
}: {
  packageName: string;
  message: ProtoMessage;
  isLongVersion?: boolean;
  level: number;
}) {
  const fields = message.fields
    .map((field, idx) => getField(field, idx + 1, level))
    .join("\n");
  let messageBlock = "";
  let description = "";

  if (fields === "") {
    messageBlock = "{}";
  } else {
    messageBlock = `{\n${fields}\n}`;
  }

  if (isLongVersion) {
    description = `${message.description.replace(/\//g, "\\/")}`;
  }

  return `
${description}

\`\`\`protosaurus--${packageName}.${message.name}
message ${message.name} ${messageBlock}
\`\`\`
  `.trim();
}

function getField(field: Field, num: number, level: number) {
  let prefixSpaces = "";

  for (let i = 0; i < level; i++) {
    prefixSpaces += "  ";
  }

  return (
    getCommentString(field.description, prefixSpaces) +
    `${prefixSpaces}${field.type} ${field.name} = ${num};`
  );
}

function getCommentString(comment: string, prefix: string) {
  if (comment === "") {
    return "\n";
  }

  const lines = comment.split("\n");
  for (let i = 0; i < lines.length; i++) {
    lines[i] = `${prefix}// ${lines[i]}`;
  }

  return `${lines.join("\n")}\n`;
}

// Services.
function getServiceMethodString({
  method,
  packageName,
  allProtoMessages,
  allWktMessages,
}: {
  packageName: string;
  method: ServiceMethod;
  allProtoMessages: Record<string, ProtoMessage>;
  allWktMessages: Record<string, ProtoMessage>;
}) {
  const {
    requestType,
    responseType,
    requestStreaming,
    responseStreaming,
    name,
  } = method;
  let requestMessage: ProtoMessage;
  let responseMessage: ProtoMessage;

  // Set request message.
  if (allProtoMessages?.[requestType]) {
    requestMessage = allProtoMessages?.[requestType];
  } else {
    // WKT.
    requestMessage = allWktMessages[requestType];
  }

  // Set response message.
  if (allProtoMessages?.[responseType]) {
    responseMessage = allProtoMessages?.[responseType];
  } else {
    // WKT.
    responseMessage = allWktMessages[responseType];
  }

  return `
<RpcDefinition>

<RpcDefinitionHeader
  requestTypePrefix="${requestStreaming ? "stream" : ""}"
  requestType="${requestType}"
  responseTypePrefix="${responseStreaming ? "stream" : ""}"
  responseType="${responseType}">

#### ${name}

</RpcDefinitionHeader>

<RpcDefinitionDescription>

${method.description}

<RpcMethodText type="request" isStream={${requestStreaming}}>
  ${requestType}
</RpcMethodText>

${getMessageString({
  message: requestMessage,
  packageName,
  isLongVersion: false,
  level: 1,
})}

<RpcMethodText type="response" isStream={${responseStreaming}}>${responseType}</RpcMethodText>

${getMessageString({
  message: responseMessage,
  packageName,
  isLongVersion: false,
  level: 1,
})}

</RpcDefinitionDescription>

</RpcDefinition>
  `.trim();
}
