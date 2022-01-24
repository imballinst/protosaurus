import mdx from "@mdx-js/mdx";

const md = `Hello world!

> Test`;

main();

async function main() {
  // MDX v1, reference: https://github.com/mdx-js/mdx/blob/v1/docs/advanced/plugins.mdx.
  console.error(mdx.sync(md));
}
