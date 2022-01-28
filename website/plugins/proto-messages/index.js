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

const fs = require("fs");
const path = require("path");

const PATH_TO_DICTIONARY_FOLDER = path.join(__dirname, "dictionary");

// TODO(imballinst): convert to TypeScript.
// If Docusaurus can't support TypeScript plugin files, then we need
// to convert to JavaScript files first in the `prebuild` hook.
const dictionary = {};
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
      wkt = json;
    } else {
      for (const key in json) {
        dictionary[key] = json[key];
      }
    }
  }
}

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

        // TODO(imballinst): specify a better language code.
        if (!code.properties?.className?.includes("language-protosaurus")) {
          continue;
        }

        const children = [];
        // Discard the last line from the code block (pure newline).
        for (let i = 0, length = codeArray.length - 1; i < length; i++) {
          const line = codeArray[i];

          // Find the matching type.
          // Test against dictionary.
          let match = getMatchingType(dictionary, line);

          // If still undefined, then match against wkt.
          if (match === undefined) {
            match = getMatchingType(wkt, line);
          }

          if (match !== undefined) {
            // When found, we split the line into 3 parts.
            // The text before the type, the type, and the text after the type.
            const { position, href, name } = match;

            const firstSlice = line.slice(0, position);
            const secondSlice = line.slice(position + name.length);

            children.push(
              {
                type: "text",
                value: firstSlice,
              },
              {
                type: "element",
                tagName: "a",
                properties: {
                  href: href,
                },
                children: [
                  {
                    type: "text",
                    value: name,
                  },
                ],
              },
              {
                type: "text",
                value: `${secondSlice}\n`,
              }
            );
          } else {
            // Otherwise, push the line normally.
            const isNotLast = i + 1 < length;
            let val = `${line}`;

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

            // Not found.
            children.push({
              type: "text",
              value: val,
            });
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
function getMatchingType(sourceDictionary, line) {
  let match;

  for (const type in sourceDictionary) {
    // Since fields in a message usually indented,
    // so we want to find lines that start with whitespace, then the full type name.
    // the "\b" here marks the "word boundary". So, for example, "Booking" won't
    // match for "BookingStatus".
    const regex = new RegExp(`^\\s+\\b${type}\\b`);
    const isIncluded = regex.test(line);

    if (isIncluded) {
      // When found, we get the index of the type word in the line,
      // and store the type name as well.
      match = {
        position: line.indexOf(type),
        href: sourceDictionary[type],
        name: type,
      };
      break;
    }
  }

  return match;
}
