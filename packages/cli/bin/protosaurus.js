#!/usr/bin/env node

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

// The binary is usually located locally, e.g. in `website/node_modules/.bin`.
const WORK_DIR = path.join(__dirname, '../..');

// TODO(imballinst): we should make this a proper CLI binary, with something like
// meow or commander. commander still is a bit behind meow, unless this issue
// https://github.com/sindresorhus/meow/issues/69 is fixed (regarding subcommands).
//
// Clean cache:
// $ protosaurus clean
//
// Generate resources:
// $ protosaurus generate

(async () => {
  const [_bin, command] = process.argv;
  if (command !== 'clean' && command !== 'generate') {
    throw new Error(
      'Invalid command. Currently available ones are `clean` and `generate`.'
    );
  }

  const fs = await import('fs-extra');

  switch (command) {
    case 'clean': {
      fs.rmdir(path.join(WORK_DIR, '.protosaurus'));
    }
    case 'generate': {
      await generator.generate({
        workDir: WORK_DIR,
        // This should be inside the workDir, hence the actual path of the generated directory:
        //   path.join(workDir, outPath).
        outPath: '.protosaurus/generated'
      });
      await generator.generateCacheFile({
        workDir: WORK_DIR,
        outPath: '.protosaurus/plugin-resources/.cache'
      });
    }
  }
})();
