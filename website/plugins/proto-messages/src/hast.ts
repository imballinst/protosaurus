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

import { Element } from "hast-format";
import { TextMatchField } from "./types";

export function getHastElementType(match: TextMatchField): Element {
  const { name, href } = match;

  if (href) {
    return {
      type: "element",
      tagName: "a",
      properties: {
        href,
      },
      children: [
        {
          type: "text",
          value: name,
        },
      ],
    };
  }

  return {
    type: "element",
    tagName: "span",
    properties: {
      className: "type",
    },
    children: [
      {
        type: "text",
        value: name,
      },
    ],
  };
}
