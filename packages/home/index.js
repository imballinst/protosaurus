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

const path = require('path');
// TODO(dio): Improve this package by implementing some features from:
// https://github.com/mitchellh/go-homedir/blob/af06845cf3004701891bf4fdb884bfe4920b3727/homedir.go#L101-L143.
const homeDir = require('homedir');
const fs = require('fs-extra');

const protosaurusHome =
  process.env.PROTOSAURUS_HOME || path.join(homeDir(), '.protosaurus');
const protosaurusBin = path.join(protosaurusHome, path.join('tools', 'go'));
const protosaurusCache = path.join(protosaurusHome, 'buf');
fs.mkdirpSync(protosaurusHome);
fs.mkdirpSync(protosaurusBin);
fs.mkdirpSync(protosaurusCache);
module.exports = {
  home: protosaurusHome,
  bin: protosaurusBin,
  cache: protosaurusCache
};
