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

import { expect } from 'chai';
import path from 'path';
import { getAllValidatedCodeBlocks } from './scanner';

const CURRENT_DIR = path.join(new URL(import.meta.url).pathname, '..');

test('getAllValidatedCodeBlocks', async () => {
  const record = await getAllValidatedCodeBlocks(
    path.join(CURRENT_DIR, 'test-mdx-files')
  );

  expect(record['js-log']).to.eql({
    content: "console.log('Hello from js-log');\n",
    output: 'Hello from js-log\n',
    language: 'js',
    isValid: false
  });

  expect(record['js-log-2']).to.eql({
    content: "console.log('Hello from js-log-2');\n",
    output: 'Hello from js-log-2\n',
    language: 'js',
    isValid: false
  });

  expect(record['js-log-3']).to.eql({
    content: "console.log('Hello from js-log-3');\n",
    output: 'Hello from js-log-3\n',
    language: 'js',
    isValid: false
  });

  expect(record['js-log-4']).to.eql({
    content: "console.log('Hello from js-log-4');\n",
    output: 'Hello from js-log-3\n',
    language: 'js',
    isValid: false
  });
});
