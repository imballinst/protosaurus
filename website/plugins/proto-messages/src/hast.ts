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
import { LinkMatch, PartialSpecific, TextMatchField } from "./types";

export function getHastElementType(
  match: PartialSpecific<TextMatchField, "position"> | LinkMatch
): Element {
  const { name, href } = match;

  if (isImageMatch(match)) {
    return {
      type: "element" as const,
      tagName: "button",
      properties: {
        "data-image-src": href,
        "data-image-alt": name,
        className: "button-text __button-protosaurus-image-toggle__",
      },
      children: [
        {
          type: "text" as const,
          value: name,
        },
      ],
    };
  }

  if (href) {
    return {
      type: "element" as const,
      tagName: "a",
      properties: {
        href,
      },
      children: [
        {
          type: "text" as const,
          value: name,
        },
      ],
    };
  }

  return {
    type: "element" as const,
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

function isImageMatch(
  match: PartialSpecific<TextMatchField, "position"> | LinkMatch
): match is LinkMatch {
  return match.type === "image";
}
