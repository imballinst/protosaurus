import { readFile } from "fs-extra";
import { Protofile, PackageData, ProtoMessage, MessageData } from "./types";
import {
  getMessageFieldsBlock,
  getMessageDescription,
  getMessageDefinition,
  getMessageHeader,
  getMessageProtosaurusBlock,
} from "./utils/messages";

export async function readPackageData(packagePath: string) {
  const content = await readFile(packagePath, "utf-8");
  const json: {
    files: Protofile[];
  } = JSON.parse(content);
  const packageData: PackageData[] = [];
  const rawProtoMessages: ProtoMessage[] = [];

  for (const file of json.files) {
    if (!file.messages) {
      continue;
    }

    const messagesData: MessageData[] = [];

    // Store inner messages.
    const innerMessagesRecord: Record<string, string> = {};
    const messagesRecord: Record<string, ProtoMessage> = {};

    for (const message of file.messages) {
      const messageNameArray = message.longName.split(".");
      const isInnerMessage = messageNameArray.length > 1;

      if (isInnerMessage) {
        // We will use this later to "patch" `messagesRecord`.
        innerMessagesRecord[message.longName] = getMessageFieldsBlock({
          message,
          level: 2,
        });
      } else {
        // Store non-inner messages.
        // We need to "patch" it with `innerMessagesRecord` later.
        messagesRecord[message.longName] = message;
      }
    }

    // Process actual messages for real.
    for (const key in messagesRecord) {
      const message = messagesRecord[key];
      const description = getMessageDescription(message) + "\n\n";

      messagesData.push({
        name: message.longName,
        packageName: file.package,
        hash: message.longName.toLowerCase(),
        body: getMessageDefinition({
          header: getMessageHeader(message.name),
          body:
            description +
            getMessageProtosaurusBlock({
              packageName: file.package,
              level: 1,
              message,
              innerMessagesRecord,
            }),
        }),
      });
    }

    packageData.push({
      name: file.package,
      descriptionMdx: getPackageDescription(file.description),
      messagesData,
      innerMessagesRecord,
      servicesData: [],
      rawProtoServices: file.services,
    });
    rawProtoMessages.push(...file.messages);
  }

  return { packageData, rawProtoMessages };
}

// Helper functions.
function getPackageDescription(description: string) {
  if (description === "") {
    return "";
  }

  return `
<Description>

${description}

</Description>
  `.trim();
}