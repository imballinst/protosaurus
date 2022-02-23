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
const mdx = require('@protosaurus/mdx');
const path = require('path');

// The process is based on the `package.json` that calls this.
const DOCUSAURUS_DIR = process.cwd();

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
  const [_node, _protosaurus, command, relativePathToBufGenYaml] = process.argv;
  if (command !== 'clean' && command !== 'generate') {
    throw new Error(
      `Invalid command ${command}. Currently available ones are \`clean\` and \`generate\`.`
    );
  }

  const fs = await import('fs-extra');

  switch (command) {
    case 'clean': {
      fs.rmdir(path.join(DOCUSAURUS_DIR, '.protosaurus'));
    }
    case 'generate': {
      const pathToBufGenYaml = path.join(
        DOCUSAURUS_DIR,
        relativePathToBufGenYaml
      );

      // Generate JSON.
      await generator.generate({
        workDir: pathToBufGenYaml,
        outPath: `${DOCUSAURUS_DIR}/.protosaurus/generated`
      });
      await generator.generateCacheFile({
        workDir: pathToBufGenYaml,
        outPath: `${DOCUSAURUS_DIR}/.protosaurus/plugin-resources/.cache`
      });

      // Check cache status, then determine whether MDX/JSON dictionary need to be
      // emitted or not.
      const paths = mdx.getPathsToCache(DOCUSAURUS_DIR);
      const isCacheInvalid = mdx.isCacheInvalid(paths);

      if (isCacheInvalid) {
        await mdx.emitJsonAndMdx(DOCUSAURUS_DIR);
      }

      await mdx.writeBuildCache(paths);
    }
  }
})();
