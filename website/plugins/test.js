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
