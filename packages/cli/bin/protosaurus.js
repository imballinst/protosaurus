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

      // First and foremost, generate cache file.
      // This is because, `buf ls-files` can identify the new packages/files.
      // TODO(imballinst): identify cache by content.
      const currentListOfFiles = await generator.getListOfProtoFiles({
        workDir: relativePathToBufGenYaml
      });

      const { pathToCache } = mdx.getPathsToCache(DOCUSAURUS_DIR);
      const isCacheInvalid = await mdx.isCacheInvalid({
        pathToCache,
        currentListOfFiles
      });

      // Check cache status, then determine whether MDX/JSON dictionary need to be
      // emitted or not.
      if (isCacheInvalid) {
        console.info(
          'There were one or more `.proto` files changed since last build, regenerating...'
        );
        // Generate protoc JSON.
        await generator.generate({
          workDir: pathToBufGenYaml,
          outPath: `${DOCUSAURUS_DIR}/.protosaurus/generated`
        });
        // Generate MDX and JSON dictionary from the generated JSON above.
        await mdx.emitJsonAndMdx(DOCUSAURUS_DIR);
      }

      await generator.generateCacheFile({
        outPath: `${DOCUSAURUS_DIR}/.protosaurus/plugin-resources/.cache`,
        newList: currentListOfFiles
      });
    }
  }
})();
