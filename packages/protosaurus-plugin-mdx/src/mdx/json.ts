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

import { writeFileSync } from "fs-extra";
import { MessageData } from "./types";

export function emitMessagesJson({
  filePath,
  messages,
  isWkt,
}: {
  filePath: string;
  messages: MessageData[];
  isWkt?: boolean;
}) {
  const map = getMessagesJsonDictionary({ messages, isWkt });

  return writeFileSync(`${filePath}.json`, JSON.stringify(map));
}

export function getMessagesJsonDictionary({
  messages,
  isWkt,
}: {
  messages: MessageData[];
  isWkt?: boolean;
}) {
  const map: Record<string, string> = {};

  for (const message of messages) {
    const { name, packageName, hash } = message;
    // For example:
    // If it's not WKT, then it's /docs/booking.v1#Booking.
    // If it's WKT, then it's /docs/wkt/google.protobuf#Int32.
    map[name] = `/docs/${isWkt ? "wkt/" : ""}${packageName}#${hash}`;
  }

  return map;
}
