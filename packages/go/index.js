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

const { home } = require('@protosaurus/home');
const which = require('which');
const { join: pathJoin } = require('path');
const BinWrapper = require('bin-wrapper');

const VERSION = process.env.VERSION || '1.17.7';

module.exports = {
  run
};

async function run(args, opts) {
  const binaryPath = await path();
  const { default: binaryVersionCheck } = await import('bin-version-check');
  await binaryVersionCheck(binaryPath, '>=1.17'); // We need 1.17.x for: go install module@version.
  const { execa } = await import('execa');
  await execa(binaryPath, args, { stdio: 'inherit', ...opts });
}

async function path() {
  // We should check the version first here.
  try {
    return await which('go');
  } catch {
    try {
      return await download()
    } catch {
      console.error('failed to find `go`');
    }
  }
}

async function download() {
  const dest = home;
  const base = `https://go.dev/dl`;
  const bin = new BinWrapper()
    .src(`${base}/go${VERSION}.darwin-amd64.tar.gz`, 'darwin')
    .src(`${base}/go${VERSION}.linux-amd64.tar.gz`, 'linux')
    .src(`${base}/go${VERSION}.windows-amd64.tar.gz`, 'win32')
    // TODO(dio): Add more oses and archs.
    .dest(dest)
    .use(pathJoin('bin', process.platform === 'win32' ? 'go.exe' : 'go'))
  await bin.run(["version"])
  return bin.path()
}
