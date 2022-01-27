// Copyright 2022 Protosaurus Authors
// Licensed under the Apache License, Version 2.0 (the "License")

const mdx = require("@mdx-js/mdx");
const fs = require("fs");
const path = require("path");
const rehypeProtoPlugin = require("./proto-messages");

const md = fs.readFileSync(path.join(__dirname, "./file.mdx"), "utf-8");

main();

async function main() {
  // MDX v1, reference: https://github.com/mdx-js/mdx/blob/v1/docs/advanced/plugins.mdx.
  // mdx.sync(md, {
  //   rehypePlugins: [rehypeProtoPlugin],
  // });
  console.log(
    mdx.sync(md, {
      rehypePlugins: [rehypeProtoPlugin],
    })
  );
}
