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

import { readFile, writeFile } from 'fs-extra';

export { emitJsonAndMdx } from './emit';
export function getPathsToCache(siteDir: string) {
  return {
    pathToCache: `${siteDir}/.protosaurus/plugin-resources/.cache/buf-ls-files.txt`,
    pathToBuildCache: `${siteDir}/.protosaurus/plugin-resources/.cache/previous-build-buf-ls-files.txt`
  };
}

export async function writeBuildCache({
  pathToCache,
  pathToBuildCache
}: {
  pathToCache: string;
  pathToBuildCache: string;
}) {
  // Re-create the previous build file (which will be used for next build).
  const file = await readFile(pathToCache, 'utf-8');
  await writeFile(pathToBuildCache, file);
}

export async function isCacheInvalid({
  pathToCache,
  pathToBuildCache
}: {
  pathToCache: string;
  pathToBuildCache: string;
}) {
  try {
    const bufLsFileCache = await readFile(pathToCache, 'utf-8');
    const previousBuildCache = await readFile(pathToBuildCache, 'utf-8');

    // Should emit only if the compared files aren't the same.
    return bufLsFileCache !== previousBuildCache;
  } catch (err) {
    // Cache file doesn't exist.
    return true;
  }
}
