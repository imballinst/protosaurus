const visit = require("unist-util-visit");

const DICTIONARY = {
  Person: "https://google.com",
};

module.exports = () => {
  return (tree) => {
    // During build, we can use `process.env` from `docusaurus.config.js` perhaps
    // to get the directory containing the intermediary JSON.
    // console.log(process.env);

    console.log(JSON.stringify(tree, null, 2));

    for (const child of tree.children) {
      if (child.tagName === "pre") {
        const pre = child;
        const code = pre.children[0].children[0].value.split("\n");

        const children = [];
        for (const line of code) {
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
                  value: secondSlice,
                }
              );
            } else {
              // Not found.
              children.push({
                type: "text",
                value: line,
              });
            }
          }
        }
        console.log(JSON.stringify(children, null, 2));
        pre.children[0].children = children;
      }
    }
    // visit(tree, "pre", (node) => {
    //   console.log(node);
    //   // if (node.type === "code" && node.lang === "proto-spc") {
    //   //   // Original node value:
    //   //   // {
    //   //   //   type: 'code',
    //   //   //   lang: 'proto-spc',
    //   //   //   meta: null,
    //   //   //   value: 'message CheckResponse {\n' +
    //   //   //     '\t// Status `OK` allows the request. Any other status indicates the request should be denied.\n' +
    //   //   //     '\tgoogle.rpc.Status status = 1;\n' +
    //   //   //     '\toneof http_response {\n' +
    //   //   //     '\t\t// Supplies http attributes for a denied response.\n' +
    //   //   //     '\t\tDeniedHttpResponse denied_response = 2;\n' +
    //   //   //     '\t\t// Supplies http attributes for an ok response.\n' +
    //   //   //     '\t\tOkHttpResponse ok_response = 3;\n' +
    //   //   //     '\t}\n' +
    //   //   //     '}',
    //   //   //   position: [Position]
    //   //   // }
    //   //   const array = node.value.split("\n");

    //   //   node.type = "html";
    //   //   node.value = array
    //   //     .map((line) => {
    //   //       return `<p>${line}</p>`;
    //   //     })
    //   //     .join("");
    //   // }
    // });
  };
};
