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
const { spawn } = require('child_process');

// The process is based on the `package.json` that calls this.
const WORK_DIR = process.cwd();

// TODO(imballinst): we should make this a proper CLI binary, with something like
// meow or commander. commander still is a bit behind meow, unless this issue
// https://github.com/sindresorhus/meow/issues/69 is fixed (regarding subcommands).
const AVAILABLE_COMMANDS = ['start', 'build', 'clean', 'generate'];

(async () => {
  const [_node, _protosaurus, command, relativePathArgs] = process.argv;
  if (!AVAILABLE_COMMANDS.includes(command)) {
    const commandsString = AVAILABLE_COMMANDS.map((cmd) => `\`${cmd}\``).join(
      ', '
    );

    throw new Error(
      `Invalid command ${command}. Currently available ones are ${commandsString}.`
    );
  }

  const fs = await import('fs-extra');
  const relativePathToBufGenYaml = relativePathArgs || '../';
  const pathToBufGenYaml = path.join(WORK_DIR, relativePathToBufGenYaml);

  switch (command) {
    case 'clean': {
      fs.rmdir(path.join(WORK_DIR, '.protosaurus'));
      break;
    }
    case 'generate': {
      await generate(pathToBufGenYaml);
      break;
    }
    case 'start':
    case 'build': {
      if (relativePathArgs === undefined) {
        console.warn(
          "No relative path argument to buf.gen.yaml directory given. It will default to '../'."
        );
      }

      // When starting the dev server or building, generate the
      // files first.
      await generate(pathToBufGenYaml);
      // After that, run docusaurus.
      spawn('yarn', ['docusaurus', command], {
        cwd: WORK_DIR,
        stdio: 'inherit'
      });
    }
  }
})();

async function generate(pathToBufGenYaml) {
  // TODO(imballinst): identify cache by content.
  const currentListOfFiles = await generator.getListOfProtoFiles({
    workDir: pathToBufGenYaml
  });

  const { pathToCache } = mdx.getPathsToCache(WORK_DIR);
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
      outPath: `${WORK_DIR}/.protosaurus/generated`
    });
    // Generate MDX and JSON dictionary from the generated JSON above.
    await mdx.emitJsonAndMdx(WORK_DIR);
  }

  await generator.generateCacheFile({
    outPath: `${WORK_DIR}/.protosaurus/plugin-resources/.cache`,
    newList: currentListOfFiles
  });
}
