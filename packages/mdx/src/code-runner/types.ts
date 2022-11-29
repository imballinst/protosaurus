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

export interface StoredValue {
  language: string;
  content: string;
  output: string;
  isValid: boolean;
}

// The first key is the path to file.
// The second key is the code block validation ID.
// The value is the code block contents.
// For example:
//
// {
//   "path/to/file": {
//     "hello-world": "echo \"Hello world!\""
//   }
// }
export type PathAndCodeBlocksRecord = Record<string, StoredValue>;
