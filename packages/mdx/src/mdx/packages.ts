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

import fs from 'fs-extra';
import {
  Protofile,
  PackageData,
  ProtoMessage,
  ObjectData,
  InnerObjectsRecord,
  MessagesRecord,
  EnumsRecord,
  ProtoEnum
} from './types.js';
import {
  getMessageFieldsBlock,
  getMessageDescription,
  getMessageDefinition,
  getMessageHeader,
  getMessageProtosaurusBlock
} from './messages.js';
import { getEnumFieldsBlock, getEnumProtosaurusBlock } from './enum.js';

export async function readPackageData(packagePath: string) {
  const content = await fs.readFile(packagePath, 'utf-8');
  const json: {
    files: Protofile[];
  } = JSON.parse(content);
  const packageData: PackageData[] = [];
  const rawProtoMessages: ProtoMessage[] = [];
  const rawProtoEnums: ProtoEnum[] = [];

  for (const file of json.files) {
    if (!file.messages) {
      continue;
    }

    const messagesData: ObjectData[] = [];
    const enumsData: ObjectData[] = [];

    // Store inner messages.
    const innerObjectsRecord: InnerObjectsRecord = {};
    const messagesRecord: MessagesRecord = {};
    const enumsRecord: EnumsRecord = {};

    for (const message of file.messages) {
      const messageNameArray = message.longName.split('.');
      const isInnerMessage = messageNameArray.length > 1;

      if (isInnerMessage) {
        innerObjectsRecord[message.longName] = {
          rawMessage: message,
          messageBlock: getMessageFieldsBlock({
            message,
            enumsRecord: {},
            innerObjectsRecord: {},
            messagesRecord: {},
            level: 2
          })
        };
      } else {
        // Store non-inner messages.
        messagesRecord[message.longName] = message;
      }
    }

    // Store enums.
    for (const enumObj of file.enums) {
      const messageNameArray = enumObj.longName.split('.');
      const isInnerMessage = messageNameArray.length > 1;

      if (isInnerMessage) {
        innerObjectsRecord[enumObj.longName] = {
          rawEnum: enumObj,
          messageBlock: getEnumFieldsBlock({
            enumObj,
            level: 2
          })
        };
      } else {
        // Store non-inner enums.
        enumsRecord[enumObj.longName] = enumObj;
      }
    }

    // Process actual messages for real.
    for (const key in messagesRecord) {
      const rawMessage = messagesRecord[key];
      const description = getMessageDescription(rawMessage) + '\n\n';

      messagesData.push({
        name: rawMessage.longName,
        packageName: file.package,
        hash: rawMessage.longName.toLowerCase(),
        body: getMessageDefinition({
          header: getMessageHeader(rawMessage.name),
          body:
            description +
            getMessageProtosaurusBlock({
              packageName: file.package,
              level: 1,
              message: rawMessage,
              innerObjectsRecord,
              enumsRecord,
              messagesRecord
            })
        })
      });
    }

    // Process actual enums for real.
    for (const key in enumsRecord) {
      const rawEnum = enumsRecord[key];
      const description = rawEnum.description + '\n\n';

      enumsData.push({
        name: rawEnum.longName,
        packageName: file.package,
        hash: rawEnum.longName.toLowerCase(),
        body: getMessageDefinition({
          header: getMessageHeader(rawEnum.name),
          body:
            description +
            getEnumProtosaurusBlock({
              packageName: file.package,
              level: 1,
              enumObj: rawEnum
            })
        })
      });
    }

    packageData.push({
      name: file.package,
      descriptionMdx: getPackageDescription(file.description),
      enumsData,
      messagesData,
      innerObjectsRecord,
      servicesData: [],
      rawProtoServices: file.services
    });
    rawProtoMessages.push(...file.messages);
    rawProtoEnums.push(...file.enums);
  }

  return { packageData, rawProtoMessages, rawProtoEnums };
}

// Helper functions.
function getPackageDescription(description: string) {
  if (description === '') {
    return '';
  }

  return `
<Description>

${description}

</Description>
  `.trim();
}
