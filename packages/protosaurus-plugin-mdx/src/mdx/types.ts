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

export interface Protofile {
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

export interface Field {
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

export interface ServiceMethod {
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

export interface ProtoService {
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

export type InnerMessagesRecord = Record<
  string,
  {
    messageBlock: string;
    rawMessage: ProtoMessage;
  }
>;
export type MessagesRecord = Record<string, ProtoMessage>;

export interface PackageData {
  name: string;
  descriptionMdx: string;
  messagesData: MessageData[];
  innerMessagesRecord: InnerMessagesRecord;
  servicesData: ServiceData[];
  // Raw proto services.
  rawProtoServices: ProtoService[];
}
