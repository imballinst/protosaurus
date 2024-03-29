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

import fs from 'fs-extra';

export { emitJsonAndMdx } from './emit.js';
export function getPathsToCache(siteDir: string) {
  return {
    pathToCache: `${siteDir}/.protosaurus/plugin-resources/.cache/buf-ls-files.txt`
  };
}

export async function isCacheInvalid({
  pathToCache,
  currentListOfFiles
}: {
  pathToCache: string;
  currentListOfFiles: string;
}) {
  try {
    const bufLsFileCache = await fs.readFile(pathToCache, 'utf-8');

    // Should emit only if the compared files aren't the same.
    return bufLsFileCache !== currentListOfFiles;
  } catch (err) {
    // Cache file doesn't exist.
    return true;
  }
}
