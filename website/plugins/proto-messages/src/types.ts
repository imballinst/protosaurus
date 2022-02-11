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

export interface TextMatchField {
  name: string;
  // When the `href` is undefined, then we don't render a link.
  href?: string;
  // Starting index of the text in a given line.
  position: number;
}

export interface LinkMatch extends TextMatchField {
  originalText: string;
}

export interface TextMatch {
  field?: TextMatchField;
  map?: {
    key: TextMatchField;
    value: TextMatchField;
    mapClosingTagIndex: number;
  };
}

export interface FieldType {
  match: TextMatch;
  isRepeated?: boolean;
}

export type PartialSpecific<TBaseType, TUnion extends keyof TBaseType> = Omit<
  TBaseType,
  TUnion
> &
  Partial<Pick<TBaseType, TUnion>>;
