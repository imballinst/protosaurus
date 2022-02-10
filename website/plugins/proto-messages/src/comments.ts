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

const TLD = "(\\.\\w+)+";
const LINK_ONLY = `https?\:\/\/.+${TLD}`;
const LINK_WITH_TEXT = `\\[.+\\]\\(${LINK_ONLY}\\)`;

const LINK_WITH_TEXT_SEPARATOR = "](";
const LINE_REGEX = new RegExp(`${LINK_ONLY}|${LINK_WITH_TEXT}`, "g");

// TODO(imballinst): we can't parse link from only a line.
// We need to take the comments from a field as a whole.
export function getLinksFromALine(line: string) {
  // Matches [text](url) or protocol://domain.
  const matches = [];
  let match = LINE_REGEX.exec(line);

  while (match) {
    // The first index `0` will always be present here, since
    // `match` is not `null`.
    const textMatch = match[0];
    const separatorIndex = textMatch.indexOf(LINK_WITH_TEXT_SEPARATOR);
    // The text that represent the link.
    // Sometimes, the text is equal as the link, but if we are using the
    // [text](link) format, then `text` and `href` needs to be differentiated.
    let name = textMatch;
    let href = textMatch;

    // This part is only applicable for something like [link inside comment](https://github.com).
    // In so doing, we get the text and link separately.
    if (separatorIndex > -1) {
      // Get the text.
      name = name.slice(1, separatorIndex);
      // Get the href.
      href = href.slice(separatorIndex + LINK_WITH_TEXT_SEPARATOR.length, -1);
    }

    // Push it to the array.
    matches.push({
      name,
      position: match.index,
      href,
      originalText: textMatch,
    });
    // Get the next match.
    match = LINE_REGEX.exec(line);
  }

  return matches;
}

export function isLineAComment(line: string) {
  return line.trim().startsWith("//");
}
