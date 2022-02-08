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

import { BUILTIN_TYPES } from "./constants";
import {
  findMessageInDictionaries,
  HashRecord,
  NamespaceHashRecord,
} from "./dictionary";
import { TextMatch } from "./types";

interface GetFieldInformationParameter {
  line: string;
  namespace: string;
  whitespaces?: string;
  localMessages: HashRecord;
  innerMessages: NamespaceHashRecord;
  wktMessages: HashRecord;
}

export function getFieldInformation({
  line,
  namespace,
  whitespaces,
  localMessages,
  innerMessages,
  wktMessages,
}: GetFieldInformationParameter) {
  const trimmed = line.trim();
  const segments = trimmed.split(" ");
  // For example:
  //
  // repeated string test_string = 1; --> [repeated, string, test_string, =, 1].
  // string test_another = 2; --> [string, test_another, =, 2].
  //
  // In the above example, then the first one `repeated = true`, and
  // for the second `repeated = false`.
  const isRepeated = segments[0] === "repeated";
  let match = findMessageInDictionaries({
    line,
    whitespaces,
    isRepeated,
    innerMessages: innerMessages[namespace],
    localMessages,
    wktMessages,
  });

  // If `match` is undefined (not found in dictionary), then it's most likely a built-in type.
  if (match === undefined) {
    match = getBuiltInType({
      line,
      namespace,
      innerMessages,
      localMessages,
      wktMessages,
    });
  }

  return match !== undefined ? { match, isRepeated } : undefined;
}

// Helper functions.
function getBuiltInType({
  line,
  namespace,
  localMessages,
  innerMessages,
  wktMessages,
}: GetFieldInformationParameter) {
  const segments = line.trim().split(" ");
  let textMatch: TextMatch | undefined;

  if (BUILTIN_TYPES.includes(segments[0])) {
    textMatch = {
      field: {
        name: segments[0],
        position: line.indexOf(segments[0]),
      },
    };
  } else {
    // Test map.
    const result = getMapFieldTypes({
      line,
      namespace,
      localMessages,
      innerMessages,
      wktMessages,
    });

    if (result) {
      textMatch = { map: result };
    }
  }

  return textMatch;
}

// TODO(imballinst): use these later.
// We also haven't covered `option` inside `enum` yet.
// const BUILTIN_SYNTAXES = ["message", "enum"];
// const BUILTIN_SYNTAXES_WITHOUT_COLORS = ["oneof", "reserved"];

// For example, "string, string".
// Not sure if "string,string" is possible, but 0-N seems safer.
const MAP_KEY_VALUE_REGEX = /,\s*/;

function getMapFieldTypes({
  line,
  namespace,
  localMessages,
  innerMessages,
  wktMessages,
}: Omit<GetFieldInformationParameter, "whitespaces">) {
  let match: TextMatch["map"];

  if (line.trim().startsWith("map<")) {
    const mapOpenTagIndex = line.indexOf("<");
    // Get first index of the closing `>`.
    // This should be safe because the value can't be another map.
    // Map also cannot be repeated.
    // Reference: https://developers.google.com/protocol-buffers/docs/proto3#maps.
    const mapCloseTagIndex = line.indexOf(">");
    const sliced = line.slice(mapOpenTagIndex + 1, mapCloseTagIndex);

    const [keyType, valueType] = sliced.split(MAP_KEY_VALUE_REGEX);
    const keyMatch = findMessageInDictionaries({
      line: keyType,
      whitespaces: "",
      innerMessages: innerMessages[namespace],
      localMessages,
      wktMessages,
    });
    const valueMatch = findMessageInDictionaries({
      line: valueType,
      whitespaces: "",
      innerMessages: innerMessages[namespace],
      localMessages,
      wktMessages,
    });

    match = {
      key: keyMatch?.field || {
        name: keyType,
        href: undefined,
        position: line.indexOf(keyType),
      },
      value: valueMatch?.field || {
        name: valueType,
        href: undefined,
        position: line.indexOf(valueType),
      },
      mapClosingTagIndex: line.indexOf(">"),
    };
  }

  return match;
}
