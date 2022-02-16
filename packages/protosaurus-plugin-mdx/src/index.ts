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

import type { LoadContext, Plugin } from "@docusaurus/types";
import { readFile, writeFile } from "fs-extra";
import { emitJsonAndMdx } from "./emit";

export default async function protosaurusPluginMdx(
  context: LoadContext
): Promise<Plugin> {
  return {
    name: "docusaurus-plugin-protosaurus-mdx",
    async loadContent() {
      const pathToCache = `${context.siteDir}/plugin-resources/.cache/buf-ls-files.txt`;
      const pathToBuildCache = `${context.siteDir}/plugin-resources/.cache/previous-build-buf-ls-files.txt`;

      const shouldEmit = await shouldEmitJsonAndMdx(
        pathToCache,
        pathToBuildCache
      );

      if (shouldEmit) {
        // It's safer to delete after content is loaded.
        // Maybe.
        emitJsonAndMdx(context.siteDir);
      }

      // Re-create the previous build file (which will be used for next build).
      const file = await readFile(pathToCache, "utf-8");
      await writeFile(pathToBuildCache, file);
    },
  };
}

// Helper functions.
async function shouldEmitJsonAndMdx(cacheFile: string, buildCacheFile: string) {
  try {
    const [bufLsFileCache, previousBuildCache] = await Promise.all([
      readFile(cacheFile, "utf-8"),
      readFile(buildCacheFile, "utf-8"),
    ]);

    // Should emit only if the compared files aren't the same.
    return bufLsFileCache !== previousBuildCache;
  } catch (err) {
    // Cache file doesn't exist.
    return true;
  }
}
