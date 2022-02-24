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

import {
  ProtoService,
  ProtoMessage,
  ServiceMethod,
  ProtoEnum,
  InnerObjectsRecord,
  EnumsRecord,
  MessagesRecord
} from './types';
import { getMessageProtosaurusBlock } from './messages';
import { getEnumProtosaurusBlock } from './enum';

export function getServiceString({
  service,
  packageName,
  messagesRecord,
  enumsRecord,
  wktMessagesRecord,
  innerObjectsRecord
}: {
  service: ProtoService;
  packageName: string;
  messagesRecord: Record<string, ProtoMessage>;
  enumsRecord: Record<string, ProtoEnum>;
  wktMessagesRecord: Record<string, ProtoMessage>;
  innerObjectsRecord: InnerObjectsRecord;
}) {
  const serviceBody: string[] = [];

  for (const method of service.methods) {
    serviceBody.push(
      getServiceMethodString({
        method,
        packageName,
        messagesRecord,
        enumsRecord,
        wktMessagesRecord,
        innerObjectsRecord
      })
    );
  }

  return `<Definition>

<DefinitionHeader name="service">

### ${service.name}

</DefinitionHeader>

${service.description}

${serviceBody.join('\n\n')}

</Definition>`;
}

// Services.
function getServiceMethodString({
  method,
  packageName,
  messagesRecord,
  enumsRecord,
  wktMessagesRecord,
  innerObjectsRecord
}: {
  packageName: string;
  method: ServiceMethod;
  messagesRecord: MessagesRecord;
  enumsRecord: EnumsRecord;
  wktMessagesRecord: MessagesRecord;
  innerObjectsRecord: InnerObjectsRecord;
}) {
  const {
    requestType,
    responseType,
    requestStreaming,
    responseStreaming,
    name
  } = method;
  let requestMessage = '';
  let responseMessage = '';

  // Set request message.
  const requestMessageType =
    messagesRecord?.[requestType] || wktMessagesRecord[requestType];

  if (requestMessageType) {
    // Local message or WKT.
    requestMessage = getMessageProtosaurusBlock({
      message: requestMessageType,
      packageName,
      enumsRecord,
      messagesRecord,
      innerObjectsRecord,
      level: 1
    });
  } else if (enumsRecord?.[requestType]) {
    // Enum.
    requestMessage = getEnumProtosaurusBlock({
      enumObj: enumsRecord?.[requestType],
      packageName,
      level: 1
    });
  }

  // Set response message.
  const responseMessageType =
    messagesRecord?.[responseType] || wktMessagesRecord[responseType];

  if (responseMessageType) {
    // Local message or WKT.
    responseMessage = getMessageProtosaurusBlock({
      message: responseMessageType,
      packageName,
      enumsRecord,
      messagesRecord,
      innerObjectsRecord,
      level: 1
    });
  } else if (enumsRecord?.[responseType]) {
    // Enum.
    responseMessage = getEnumProtosaurusBlock({
      enumObj: enumsRecord?.[responseType],
      packageName,
      level: 1
    });
  }

  return `
<RpcDefinition>

<RpcDefinitionHeader
  requestTypePrefix="${requestStreaming ? 'stream' : ''}"
  requestType="${requestType}"
  responseTypePrefix="${responseStreaming ? 'stream' : ''}"
  responseType="${responseType}">

#### ${name}

</RpcDefinitionHeader>

<RpcDefinitionDescription>

${method.description}

<RpcMethodText type="request" isStream={${requestStreaming}}>
  ${requestType}
</RpcMethodText>

${requestMessage}

<RpcMethodText type="response" isStream={${responseStreaming}}>
  ${responseType}
</RpcMethodText>

${responseMessage}

</RpcDefinitionDescription>

</RpcDefinition>
  `.trim();
}
