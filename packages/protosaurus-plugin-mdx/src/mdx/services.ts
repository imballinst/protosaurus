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

import { ProtoService, ProtoMessage, ServiceMethod } from "./types";
import { getMessageProtosaurusBlock } from "./messages";

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

${getMessageProtosaurusBlock({
  message: requestMessage,
  packageName,
  level: 1,
})}

<RpcMethodText type="response" isStream={${responseStreaming}}>${responseType}</RpcMethodText>

${getMessageProtosaurusBlock({
  message: responseMessage,
  packageName,
  level: 1,
})}

</RpcDefinitionDescription>

</RpcDefinition>
  `.trim();
}
