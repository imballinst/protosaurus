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

const os = require('os');
const path = require('path');
const pkg = require('./package.json');
const go = require('@protosaurus/go');
const fs = require('fs-extra');
const { bin, cache } = require('@protosaurus/home');
const wkt = require('@protosaurus/wkt');

const bufGenYaml = require('./buf.gen.yaml');
const bufName = 'buf';
const bufPath = path.join(bin, bufName);
const protocGenDocName = 'protoc-gen-doc';
const protocGenDocPath = path.join(bin, protocGenDocName);

const BUF_CACHE_DIR = process.env.BUF_CACHE_DIR || path.join(cache, 'buf');
const PATH = `${bin}:${process.env.PATH}`;

module.exports = {
  generate
};

/**
 * Generate *.json from *.proto.
 *
 * @param {string} workDir working directory
 * @param {string} outPath output path, the final directory path: path.join(workDir, outPath).
 */
async function generate({ workDir, outPath }) {
  // TODO(dio): Proper error handling.
  await installProtocGenDoc();
  await installBuf();

  // Currently we only support executing buf in a directory with "buf.work.yaml" with existing
  // modules in the same directory.
  // TODO(dio): Validate that buf.work.yaml is there and valid.
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'protosaurus_'));
  const templateFile = path.join(dir, "buf.gen.yaml");
  await fs.writeFile(templateFile, bufGenYaml(outPath));

  // Generate *.json.
  const { execa } = await import('execa');
  await execa(bufPath, ['generate', '--template', templateFile], { cwd: workDir, env: { PATH, BUF_CACHE_DIR } });

  // Copy all WKT *.json.
  wkt.copyAll(path.join(workDir, outPath, 'wkt'));
}

async function installProtocGenDoc() {
  const downloaded = await fs.pathExists(protocGenDocPath);
  if (!downloaded) {
    await go.run(['install', pkg.plugins[protocGenDocName]], { env: { GOBIN: bin } });
  }
}

async function installBuf() {
  const downloaded = await fs.pathExists(bufPath);
  if (!downloaded) {
    await go.run(['install', pkg.plugins[bufName]], { env: { GOBIN: bin } });
  }
}
