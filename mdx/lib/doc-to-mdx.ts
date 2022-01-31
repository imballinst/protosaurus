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

export interface ProtoMessage {
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

interface ServiceMethod {
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
}

interface ProtoService {
  name: string;
  longName: string;
  fullName: string;
  description: string;
  methods: ServiceMethod[];
}

export interface MessageData {
  name: string;
  packageName: string;
  hash: string;
  body: string;
}

export interface ServiceData {
  name: string;
  packageName: string;
  body: string;
}

export interface PackageData {
  name: string;
  description: string;
  messagesData: MessageData[];
  servicesData: ServiceData[];
  // Raw proto services.
  rawProtoServices: ProtoService[];
}

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

export async function emitMdx(
  filePath: string,
  pkg: PackageData,
  type: "messagesData" | "servicesData"
) {
  // Separate each message/service with double new lines.
  const body = pkg[type].map((m) => m.body).join("\n\n");

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

${getPackageDescription(pkg)}

${body}\n`.trimStart()
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

  return serviceBody.join("\n\n");
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
}: {
  message: ProtoMessage;
  parentMessage?: string;
  packageName: string;
}) {
  const messageBody = getMessageBody({
    packageName,
    message,
    withDescription: true,
  });
  let heading = "";

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

${messageBody}

</Definition>`;
}

function getMessageBody({
  packageName,
  message,
  withDescription,
}: {
  packageName: string;
  message: ProtoMessage;
  withDescription?: boolean;
}) {
  const fields = message.fields
    .map((field, idx) => getField(field, idx + 1))
    .join("\n");
  let messageBlock = "";
  let description = "";

  if (fields === "") {
    messageBlock = "{}";
  } else {
    messageBlock = `{\n${fields}\n}`;
  }

  if (withDescription) {
    description = `${message.description.replace(/\//g, "\\/")}`;
  }

  return `
${description}

\`\`\`protosaurus--${packageName}.${message.name}
message ${message.name} ${messageBlock}
\`\`\`
  `.trim();
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

### ${name}

</RpcDefinitionHeader>

${method.description}

<RpcMethodText type="request" isStream={${requestStreaming}}>${requestType}</RpcMethodText>

${getMessageString({ message: requestMessage, packageName })}

<RpcMethodText type="response" isStream={${responseStreaming}}>${responseType}</RpcMethodText>

${getMessageString({ message: responseMessage, packageName })}

</RpcDefinition>
  `.trim();
}
