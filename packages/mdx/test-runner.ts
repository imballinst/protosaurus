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

import path from 'path';
import { execa } from 'execa';

import { emitScripts } from './src/code-runner/emitter.js';
import { getAllValidatedCodeBlocks } from './src/code-runner/scanner.js';

const CURRENT_DIR = path.join(new URL(import.meta.url).pathname, '..');
const SCRIPTS_DIR = path.join(
  CURRENT_DIR,
  'src',
  'code-runner',
  'test-scripts'
);

async function main() {
  const record = await getAllValidatedCodeBlocks(
    path.join(CURRENT_DIR, 'src', 'code-runner', 'test-mdx-files')
  );
  await emitScripts(record, SCRIPTS_DIR);

  for (const key in record) {
    const value = record[key];
    const result = await execa('node', [
      `${SCRIPTS_DIR}/${key}.${value.language}`
    ]);

    if (result.stdout === value.output) {
      value.isValid = true;
    }
  }

  console.log(record);
}

main();
