import mdx from "@mdx-js/mdx";
import fs from "fs";

const md = fs.readFileSync("./file.md", "utf-8");

main();

async function main() {
  // MDX v1, reference: https://github.com/mdx-js/mdx/blob/v1/docs/advanced/plugins.mdx.
  console.error(mdx.sync(md));
}
