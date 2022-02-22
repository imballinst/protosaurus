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

// We use `require` because this MDX v1 doesn't have typings
// and hence will cause error during TypeScript compilation.
const mdx = require('@mdx-js/mdx');
import fs from 'fs';
import path from 'path';
import rehypeProtoPlugin from './src';

const md = fs.readFileSync(
  process.env.WORK_DIR
    ? `${process.env.WORK_DIR}/packages/docusaurus-plugin-mdx/src/mdx/test-resources/booking-messages.mdx`
    : path.join(
        __dirname,
        '../docusaurus-plugin-mdx/src/mdx/test-resources/booking-messages.mdx'
      ),
  'utf-8'
);

main();

async function main() {
  // MDX v1, reference: https://github.com/mdx-js/mdx/blob/v1/docs/advanced/plugins.mdx.
  const result = mdx.sync(md, {
    rehypePlugins: [
      [
        rehypeProtoPlugin,
        {
          siteDir: process.env.WORK_DIR
            ? `${process.env.WORK_DIR}/website`
            : path.join(__dirname, '../../website')
        }
      ]
    ]
  });
  // Hide this as needed.
  // console.log(result);
}
