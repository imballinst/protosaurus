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

const generator = require('@protosaurus/generator');
const path = require('path');

const WORK_DIR = process.env.WORK_DIR || path.resolve(path.join(__dirname, '..', '..')); // Paranoid on resolving.

(async() => {
  await generator.generate({
    workDir: WORK_DIR,
    // This should be inside the workDir, hence the actual path of the generated directory:
    //   path.join(workDir, outPath).
    outPath: 'website/generated'
  });
  await generator.generateCacheFile({
    workDir: WORK_DIR,
    outPath: 'website/plugin-resources/.cache'
  });
})();