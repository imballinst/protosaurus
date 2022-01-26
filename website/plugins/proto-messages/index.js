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
const DICTIONARY = {
  Person: "#person",
};

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
        for (let i = 0, length = codeArray.length - 1; i < length; i++) {
          const line = codeArray[i];

          for (const key in DICTIONARY) {
            const idx = line.indexOf(key);

            if (idx > -1 && line.startsWith(" ")) {
              // Found.
              const firstSlice = line.slice(0, idx);
              const secondSlice = line.slice(idx + key.length);

              children.push(
                {
                  type: "text",
                  value: firstSlice,
                },
                {
                  type: "element",
                  tagName: "a",
                  properties: {
                    href: DICTIONARY[key],
                  },
                  children: [
                    {
                      type: "text",
                      value: key,
                    },
                  ],
                },
                {
                  type: "text",
                  value: `${secondSlice}\n`,
                }
              );
            } else {
              const isNotLast = i + 1 < length;
              let val = `${line}`;

              // Add newline if not the last line.
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
        }

        pre.children = children;
        pre.tagName = "precustom";
      }
    }
  };
};
