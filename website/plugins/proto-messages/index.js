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

// TODO(imballinst): convert to TypeScript.
// If Docusaurus can't support TypeScript plugin files, then we need
// to convert to JavaScript files first in the `prebuild` hook.
const fs = require("fs");
const path = require("path");

const PATH_TO_DICTIONARY_FOLDER = path.join(__dirname, "dictionary");

// This contains all "local" messages.
const dictionary = {};
// This contains all submessages. Submessages are messages inside a message.
// This object is a key-value of `packageName`-`dictionary`.
const subMessagesDictionary = {};
let wkt = {};

const entries = fs.readdirSync(PATH_TO_DICTIONARY_FOLDER, {
  encoding: "utf-8",
  withFileTypes: true,
});

for (const entry of entries) {
  const ext = path.extname(entry.name);
  const basename = path.basename(entry.name, ext);

  if (ext === ".json") {
    const file = fs.readFileSync(
      path.join(PATH_TO_DICTIONARY_FOLDER, entry.name)
    );
    const json = JSON.parse(file);

    if (basename === "wkt") {
      // For well known types, we assume that they will never intersect (perhaps).
      // TODO(imballinst): consider if there is a possibility of intersecting well-known types.
      wkt = json;
    } else {
      // Whereas, for local types, there are chances that "local" messages inside a message
      // can be a conflict to another. Hence, we need to group them by
      for (const key in json) {
        if (key.indexOf(".") > -1) {
          const [parentMessage, name] = key.split(".");
          const subMessagesDictionaryKey = `${basename}.${parentMessage}`;

          // Sub message.
          if (subMessagesDictionary[subMessagesDictionaryKey] === undefined) {
            subMessagesDictionary[subMessagesDictionaryKey] = {};
          }

          subMessagesDictionary[subMessagesDictionaryKey][name] = json[key];
        } else {
          // Local message.
          dictionary[key] = json[key];
        }
      }
    }
  }
}

const REPEATED_TEXT = "repeated ";

// TODO(imballinst): refactor this so that it's more "breakdownable".
module.exports = () => {
  return (tree) => {
    // During build, we can use `process.env` from `docusaurus.config.js` perhaps
    // to get the directory containing the intermediary JSON.
    // console.log(process.env);

    for (const child of tree.children) {
      if (child.tagName === "pre") {
        const pre = child;
        const code = pre.children[0];
        const codeArray = code.children[0].value.split("\n");

        const matchingLanguage = code.properties?.className?.find((c) =>
          // TODO(imballinst): specify a better language code, if this is unfit.
          c.startsWith("language-protosaurus")
        );

        if (!matchingLanguage) {
          continue;
        }

        // For example: the format is `language-protosaurus--booking.v1.Booking`.
        // This has the purpose to "detect" submessages.
        // With the "booking.v1.Booking" namespace information, we can lookup to the
        // `subMessagesDictionary` variable.
        const [, namespace] = matchingLanguage.split("--");
        const children = [];

        // Discard the last line from the code block (pure newline).
        for (let i = 0, length = codeArray.length - 1; i < length; i++) {
          const line = codeArray[i];
          let type = getFieldTypeFromLine(line, namespace);

          if (type === undefined && line.trim().startsWith("message")) {
            // If undefined, then we find the built-in syntaxes.
            type = {
              match: { name: "message", position: line.indexOf("message") },
            };
          }

          if (type !== undefined) {
            // When found, we split the line into 3 parts.
            // The text before the type, the type, and the text after the type.
            const { match = {}, repeated } = type;
            const { position, name, map } = match;
            let firstSlice;
            let secondSlice;
            let hastTypeElements = [];

            if (map) {
              // Map type.
              const { key, value, mapCloseTagIndex } = map;

              firstSlice = line.slice(0, key.position);
              secondSlice = line.slice(mapCloseTagIndex + 1);

              hastTypeElements.push(
                getHastElementType(key),
                {
                  type: "text",
                  value: ", ",
                },
                getHastElementType(value),
                {
                  type: "text",
                  value: ">",
                }
              );
            } else {
              // Common type.
              let firstSlicePosition = position;

              // Pre-pend the `repeated` text beforehand, if it has "repeated" label.
              if (repeated) {
                hastTypeElements.push(
                  getHastElementType({
                    name: REPEATED_TEXT,
                  })
                );
                firstSlicePosition = firstSlicePosition - REPEATED_TEXT.length;
              }

              firstSlice = line.slice(0, firstSlicePosition);
              secondSlice = line.slice(position + name.length);

              hastTypeElements.push(getHastElementType(match));
            }

            children.push(
              {
                type: "text",
                value: firstSlice,
              },
              ...hastTypeElements,
              {
                type: "text",
                value: `${secondSlice}\n`,
              }
            );
          } else {
            // Otherwise, push the line normally.
            const isNotLast = i + 1 < length;
            const isAComment = isLineAComment(line);
            const matches = getLinksFromALine(line);
            // Reference: https://github.com/syntax-tree/hast#element.
            // Store HAST elements in an array and apply some rules:
            //
            // (1) If the line is a comment, we wrap it in a `span` tag
            //     with a class which will give it a comment color. Otherwise,
            //     render it normally.
            const hastElements = [];

            if (matches.length) {
              // Line containing one or more links.
              let previousIndex = 0;

              for (const match of matches) {
                const { position, originalText } = match;
                const nextPreviousIndex = match.position + originalText.length;

                // Push the text before the match. This will always be a non-text.
                // This is because the line will always start with whitespace + double slashes.
                hastElements.push({
                  type: "text",
                  value: line.slice(previousIndex, position),
                });
                // Push the link.
                hastElements.push(getHastElementType(match));

                previousIndex = nextPreviousIndex;
              }

              // If there is still remaining characters in the line, push the rest of them.
              if (previousIndex + 1 <= line.length) {
                hastElements.push({
                  type: "text",
                  value: `${line.slice(previousIndex)}\n`,
                });
              }
            } else {
              // Line without links.
              let val = line;

              // Add newline if not the last line.
              // This is because previously we are splitting by "\n".
              if (isNotLast) {
                val += "\n";

                // In case of double space, we need to
                // add another (as a result of .split()).
                // We need to add this "zero-width space" otherwise
                // the MDX renderer will remove the second newline.
                if (line === "") {
                  val = "​\n";
                }
              }

              hastElements.push({
                type: "text",
                value: val,
              });
            }

            if (isAComment) {
              children.push({
                type: "element",
                tagName: "span",
                properties: {
                  className: "comment",
                },
                children: hastElements,
              });
            } else {
              children.push(...hastElements);
            }
          }
        }

        // Rewrite the `children` field.
        pre.children = children;
        // Rewrite the tag name from `pre` to `precustom` so we could
        // make a difference between normal `pre` and our `pre`.
        pre.tagName = "precustom";
      }
    }
  };
};

// Helper functions.
function getHastElementType(match) {
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

function getFieldTypeFromLine(line, namespace, whitespaces) {
  const trimmed = line.trim();
  const segments = trimmed.split(" ");
  // For example:
  //
  // repeated string test_string = 1; --> [repeated, string, test_string, =, 1].
  // string test_another = 2; --> [string, test_another, =, 2].
  //
  // In the above example, then the first one `repeated = true`, and
  // for the second `repeated = false`.
  const repeated = segments[0] === "repeated";
  let match = findTypeInDictionaries(line, namespace, whitespaces, repeated);

  // If `match` is undefined (not found in dictionary), then it's most likely a built-in type.
  if (match === undefined) {
    match = getBuiltInFieldType(line, namespace);
  }

  return match !== undefined ? { match, repeated } : undefined;
}

function findTypeInDictionaries(line, namespace, whitespaces, repeated) {
  // Find the matching type.
  // First of all, we search by the submessage.
  let match = getMatchingDictionaryTypeFromLine({
    sourceDictionary: subMessagesDictionary[namespace],
    line,
    whitespaces,
    repeated,
    isInnerMessage: true,
  });

  // If no submessage found, test against dictionary.
  if (match === undefined) {
    match = getMatchingDictionaryTypeFromLine({
      sourceDictionary: dictionary,
      line,
      whitespaces,
      repeated,
    });
  }

  // If still undefined, then match against wkt.
  if (match === undefined) {
    match = getMatchingDictionaryTypeFromLine({
      sourceDictionary: wkt,
      line,
      whitespaces,
      repeated,
    });
  }

  return match;
}

const BUILTIN_TYPES = [
  // Source: https://developers.google.com/protocol-buffers/docs/proto.
  "bool",
  "bytes",
  "double",
  "fixed32",
  "sfixed32",
  "fixed64",
  "sfixed64",
  "float",
  "int32",
  "sint32",
  "uint32",
  "int64",
  "sint64",
  "uint64",
  "string",
];

function getBuiltInFieldType(line, namespace) {
  const segments = line.trim().split(" ");
  let match;

  if (BUILTIN_TYPES.includes(segments[0])) {
    match = {
      name: segments[0],
      position: line.indexOf(segments[0]),
    };
  } else {
    // Test map.
    match = getMapFieldTypes(line, namespace);
  }

  return match;
}

// TODO(imballinst): use these later.
// We also haven't covered `option` inside `enum` yet.
// const BUILTIN_SYNTAXES = ["message", "enum"];
// const BUILTIN_SYNTAXES_WITHOUT_COLORS = ["oneof", "reserved"];

// For example, "string, string".
// Not sure if "string,string" is possible, but 0-N seems safer.
const MAP_KEY_VALUE_REGEX = /,\s*/;

function getMapFieldTypes(line, namespace) {
  let match;

  if (line.trim().startsWith("map<")) {
    const mapOpenTagIndex = line.indexOf("<");
    // Get first index of the closing `>`.
    // This should be safe because the value can't be another map.
    // Map also cannot be repeated.
    // Reference: https://developers.google.com/protocol-buffers/docs/proto3#maps.
    const mapCloseTagIndex = line.indexOf(">");
    const sliced = line.slice(mapOpenTagIndex + 1, mapCloseTagIndex);

    const [keyType, valueType] = sliced.split(MAP_KEY_VALUE_REGEX);
    const keyMatch = findTypeInDictionaries(keyType, namespace, "");
    const valueMatch = findTypeInDictionaries(valueType, namespace, "");

    match = {
      map: {
        key: keyMatch || {
          name: keyType,
          href: undefined,
          position: line.indexOf(keyType),
        },
        value: valueMatch || {
          name: valueType,
          href: undefined,
          position: line.indexOf(valueType),
        },
        mapCloseTagIndex: line.indexOf(">"),
      },
    };
  }

  return match;
}

function getMatchingDictionaryTypeFromLine({
  sourceDictionary,
  line,
  whitespaces = "\\s+",
  repeated,
  isInnerMessage,
}) {
  // "Shift" the line when it contains "repeated" label.
  // Otherwise, it won't parse the linked types properly.
  const restOfLine = repeated ? line.replace(REPEATED_TEXT, "") : line;
  let match;

  for (const type in sourceDictionary) {
    // Since fields in a message usually indented,
    // so we want to find lines that start with whitespace, then the full type name.
    // the "\b" here marks the "word boundary". So, for example, "Booking" won't
    // match for "BookingStatus".
    const regex = new RegExp(`^${whitespaces}\\b${type}\\b`);
    const isIncluded = regex.test(restOfLine);

    if (isIncluded) {
      // When found, we get the index of the type word in the line,
      // and store the type name as well.
      match = {
        position: line.indexOf(type),
        href: !isInnerMessage ? sourceDictionary[type] : undefined,
        name: type,
      };
      break;
    }
  }

  return match;
}

const TLD = "(\\.\\w+)+";
const LINK_ONLY = `https?\:\/\/.+${TLD}`;
const LINK_WITH_TEXT = `\\[.+\\]\\(${LINK_ONLY}\\)`;

const LINK_WITH_TEXT_SEPARATOR = "](";
const LINE_REGEX = new RegExp(`${LINK_ONLY}|${LINK_WITH_TEXT}`, "g");

function getLinksFromALine(line) {
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

function isLineAComment(line) {
  return line.trim().startsWith("//");
}
