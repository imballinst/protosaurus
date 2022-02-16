/**
 * Copyright 2022 Protosaurus Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { readFile } from "fs-extra";
import {
  Protofile,
  PackageData,
  ProtoMessage,
  MessageData,
  MessagesRecord,
  InnerMessagesRecord,
} from "./types";
import {
  getMessageFieldsBlock,
  getMessageDescription,
  getMessageDefinition,
  getMessageHeader,
  getMessageProtosaurusBlock,
} from "./messages";

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
    const innerMessagesRecord: InnerMessagesRecord = {};
    const messagesRecord: MessagesRecord = {};

    for (const message of file.messages) {
      const messageNameArray = message.longName.split(".");
      const isInnerMessage = messageNameArray.length > 1;

      if (isInnerMessage) {
        // We will use this later to "patch" `messagesRecord`.
        innerMessagesRecord[message.longName] = {
          rawMessage: message,
          messageBlock: getMessageFieldsBlock({
            message,
            level: 2,
          }),
        };
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
              messagesRecord,
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
