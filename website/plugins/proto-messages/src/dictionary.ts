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

import fs from "fs";
import path from "path";
import { REPEATED_TEXT } from "./constants";
import { TextMatch, TextMatchField } from "./types";

const PATH_TO_DICTIONARY_FOLDER = path.join(__dirname, "../dictionary");

export type HashRecord = Record<string, string>;
export type NamespaceHashRecord = Record<string, HashRecord>;

export function getAllDictionaries() {
  // This contains all "local" messages.
  const localMessages: HashRecord = {};
  // This contains all submessages. Submessages are messages inside a message.
  // This object is a key-value of `packageName`-`dictionary`.
  const innerMessages: NamespaceHashRecord = {};
  let wktMessages: HashRecord = {};

  const entries = fs.readdirSync(PATH_TO_DICTIONARY_FOLDER, {
    encoding: "utf-8",
    withFileTypes: true,
  });

  for (const entry of entries) {
    const ext = path.extname(entry.name);
    const basename = path.basename(entry.name, ext);

    if (ext === ".json") {
      const file = fs.readFileSync(
        path.join(PATH_TO_DICTIONARY_FOLDER, entry.name),
        "utf-8"
      );
      const json = JSON.parse(file);

      if (basename === "wkt") {
        // For well known types, we assume that they will never intersect (perhaps).
        wktMessages = json;
      } else {
        // Whereas, for local types, there are chances that "local" messages inside a message
        // can be a conflict to another. Hence, we need to group them by
        for (const key in json) {
          if (key.indexOf(".") > -1) {
            const [parentMessage, name] = key.split(".");
            const innerMessageKey = `${basename}.${parentMessage}`;

            // Sub message.
            if (innerMessages[innerMessageKey] === undefined) {
              innerMessages[innerMessageKey] = {};
            }

            innerMessages[innerMessageKey][name] = json[key];
          } else {
            // Local message.
            localMessages[key] = json[key];
          }
        }
      }
    }
  }

  return {
    localMessages,
    innerMessages,
    wktMessages,
  };
}

export function findMessageInDictionaries({
  line,
  whitespaces,
  isRepeated,
  localMessages,
  innerMessages,
  wktMessages,
}: {
  line: string;
  whitespaces?: string;
  isRepeated?: boolean;
  localMessages: HashRecord;
  innerMessages: HashRecord;
  wktMessages: HashRecord;
}): TextMatch | undefined {
  // Find the matching type.
  // First of all, we search by the submessage.
  let match = findMatchingMessageInDictionary({
    source: innerMessages,
    line,
    whitespaces,
    isRepeated,
    isInnerMessage: true,
  });

  // If no submessage found, test against dictionary.
  if (match === undefined) {
    match = findMatchingMessageInDictionary({
      source: localMessages,
      line,
      whitespaces,
      isRepeated,
    });
  }

  // If still undefined, then match against wkt.
  if (match === undefined) {
    match = findMatchingMessageInDictionary({
      source: wktMessages,
      line,
      whitespaces,
      isRepeated,
    });
  }

  return match;
}

// Helper functions.
function findMatchingMessageInDictionary({
  source,
  line,
  whitespaces = "\\s+",
  isRepeated,
  isInnerMessage,
}: {
  source: HashRecord;
  line: string;
  whitespaces?: string;
  isRepeated?: boolean;
  isInnerMessage?: boolean;
}): TextMatch | undefined {
  // "Shift" the line when it contains "repeated" label.
  // Otherwise, it won't parse the linked types properly.
  const restOfLine = isRepeated ? line.replace(REPEATED_TEXT, "") : line;
  let fieldMatch: TextMatchField | undefined;

  for (const type in source) {
    // Since fields in a message usually indented,
    // so we want to find lines that start with whitespace, then the full type name.
    // the "\b" here marks the "word boundary". So, for example, "Booking" won't
    // match for "BookingStatus".
    const regex = new RegExp(`^${whitespaces}\\b${type}\\b`);
    const isIncluded = regex.test(restOfLine);

    if (isIncluded) {
      // When found, we get the index of the type word in the line,
      // and store the type name as well.
      fieldMatch = {
        position: line.indexOf(type),
        href: !isInnerMessage ? source[type] : undefined,
        name: type,
      };
      break;
    }
  }

  return fieldMatch ? { field: fieldMatch } : undefined;
}
