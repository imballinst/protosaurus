// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

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
          let match = undefined;

          // Find the matching type.
          for (const type in DICTIONARY) {
            const idx = line.indexOf(type);

            if (idx > -1 && line.startsWith(" ")) {
              // When found, we get the index of the type word in the line,
              // and store the type name as well.
              match = {
                position: idx,
                name: type,
              };
              break;
            }
          }

          if (match !== undefined) {
            // When found, we split the line into 3 parts.
            // The text before the type, the type, and the text after the type.
            const { position, name } = match;

            const firstSlice = line.slice(0, position);
            const secondSlice = line.slice(position + key.length);

            children.push(
              {
                type: "text",
                value: firstSlice,
              },
              {
                type: "element",
                tagName: "a",
                properties: {
                  href: DICTIONARY[name],
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
