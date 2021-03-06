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

import type { Plugin } from '@docusaurus/types';
import path from 'path';

const SRC_THEME_PATH = path.join(__dirname, '../src/theme');
const LIB_PATH = path.join(__dirname);
const LIB_THEME_PATH = path.join(__dirname, './theme');
const ASSETS_PATH = path.join(__dirname, '../assets');

export default function protosaurusTheme(): Plugin<void> {
  return {
    name: 'docusaurus-theme',
    getThemePath() {
      return LIB_THEME_PATH;
    },
    getTypeScriptThemePath() {
      return SRC_THEME_PATH;
    },
    getClientModules() {
      return [`${ASSETS_PATH}/custom.css`];
    },
    getPathsToWatch() {
      return [`${ASSETS_PATH}/custom.css`, `${LIB_PATH}/theme`];
    }
  };
}
