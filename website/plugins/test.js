// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

const mdx = require("@mdx-js/mdx");
const fs = require("fs");
const remarkProtoMessagePlugin = require("./proto-messages");

const md = fs.readFileSync("./file.md", "utf-8");

main();

async function main() {
  // MDX v1, reference: https://github.com/mdx-js/mdx/blob/v1/docs/advanced/plugins.mdx.
  // mdx.sync(md, {
  //   rehypePlugins: [remarkProtoMessagePlugin],
  // });
  console.log(
    mdx.sync(md, {
      rehypePlugins: [remarkProtoMessagePlugin],
    })
  );
}
