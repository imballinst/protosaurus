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
  enums: ProtoEnum[];
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

export interface ProtoEnum {
  name: string;
  longName: string;
  fullName: string;
  description: string;
  values: ProtoEnumValue[];
}

export interface ProtoEnumValue {
  name: string;
  number: string;
  description: string;
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

export interface ObjectData {
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

export type InnerObjectsRecord = Record<
  string,
  {
    messageBlock: string;
    rawMessage?: ProtoMessage;
    rawEnum?: ProtoEnum;
  }
>;

export type MessagesRecord = Record<string, ProtoMessage>;
export type EnumsRecord = Record<string, ProtoEnum>;

export interface PackageData {
  name: string;
  descriptionMdx: string;
  enumsData: ObjectData[];
  messagesData: ObjectData[];
  innerObjectsRecord: InnerObjectsRecord;
  servicesData: ServiceData[];
  // Raw proto services.
  rawProtoServices: ProtoService[];
}
