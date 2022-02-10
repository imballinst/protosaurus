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

import { LinkMatch } from "./types";

// Here, we are at HAST stage.
// All things considered, like multi-line text links were already handled by the `mdx` module
// in the project root. We want to consider 2 cases here so that a word satisfies a "link":
//
// 1. A pure hyperlink text. http://example.com, https://example.com, even something like ftp://example.com.
//    The format is {protocol}://{domain}{optional_directory}.
// 2. A text with hyperlink. [hello](https://world), or [hello](world), or [hello](./world), or [hello](/world).
//    Or, the absolute links, [hello]({protocol}://{domain}{optional_directory}).
export function getLinksFromALine(line: string) {
  const length = line.length;
  const links: LinkMatch[] = [];
  let i = 0;

  while (i < length) {
    // Since we can "jump" through the line (it's not always +1),
    // then we need to declare it as a variable.
    // For example, the [text](link) means we will skip 12 characters.
    let nextIndex = i + 1;
    let textToAdd = line.charAt(i);

    if (textToAdd === "[") {
      // The "[" is the biggest indicator of a link.
      const bracketParenthesisIndex = line.indexOf("](", i);

      if (bracketParenthesisIndex > -1) {
        // Bracket and parenthesis exist.
        // We then check for the closing parenthesis.
        const closingParenthesisIndex = line.indexOf(")", i);

        if (
          i < bracketParenthesisIndex &&
          bracketParenthesisIndex < closingParenthesisIndex
        ) {
          // The bracket and parenthesis should be positioned in the middle.
          // Slice the text.
          const text = line.slice(i + 1, bracketParenthesisIndex);
          const link = line.slice(
            bracketParenthesisIndex + 2,
            closingParenthesisIndex
          );
          const type = line.charAt(i - 1) === "!" ? "image" : "link";

          textToAdd = `[${text}](${link})`;
          nextIndex = closingParenthesisIndex + 1;

          links.push({
            name: text,
            href: link,
            position: type === "link" ? i : i - 1,
            originalText: textToAdd,
            type,
          });
        }
      }
    } else if (textToAdd === ":") {
      // Look ahead and see if it's a "://".
      // Not sure what's it called, it's not a scheme... it's not the protocol either.
      // So, let's just call it "separator".
      const isProtocolAndDomainSeparator = line.slice(i, i + 3) === "://";

      if (isProtocolAndDomainSeparator) {
        const firstWordCharacterIndex = findPreviousWordBoundary(line, i);
        const nextWhitespaceIndex = findNextWhitespace(line, i);

        // Slice the link and "jump".
        const lineText = line.slice(
          firstWordCharacterIndex,
          nextWhitespaceIndex
        );
        links.push({
          name: lineText,
          position: firstWordCharacterIndex,
          href: lineText,
          originalText: lineText,
          type: "link",
        });

        nextIndex = i + lineText.length;
      }
    }

    i = nextIndex;
  }

  return links;
}

export function isLineAComment(line: string) {
  return line.trim().startsWith("//");
}

// Helper functions.
function findPreviousWordBoundary(line: string, startIndex: number) {
  let firstWordCharacterIndex = startIndex - 1;
  let character = line.charAt(firstWordCharacterIndex);

  while (/\w/.test(character)) {
    firstWordCharacterIndex--;
    character = line.charAt(firstWordCharacterIndex);
  }

  // Increment by 1, because the last iteration decremented it by 1.
  return firstWordCharacterIndex + 1;
}

function findNextWhitespace(line: string, startIndex: number) {
  // Look ahead and find the next whitespace.
  // It's +3 because we want to skip the "://" part.
  let nextWhitespaceIndex = startIndex + 3;
  let character = line.charAt(nextWhitespaceIndex);

  while (/\S/.test(character)) {
    nextWhitespaceIndex++;
    character = line.charAt(nextWhitespaceIndex);
  }

  return nextWhitespaceIndex - 1;
}
