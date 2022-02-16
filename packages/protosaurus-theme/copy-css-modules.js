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

const path = require("path");
const fs = require("fs/promises");

const SRC_PATH = path.join(__dirname, "src");
const LIB_PATH = path.join(__dirname, "lib");

const SRC_THEME_PATH = path.join(SRC_PATH, "theme");
const LIB_THEME_PATH = path.join(LIB_PATH, "theme");

(async () => {
  const allThemeFiles = await fs.readdir(`${SRC_THEME_PATH}`, {
    encoding: "utf-8",
    withFileTypes: true,
  });
  const allCssModules = allThemeFiles.filter((file) =>
    file.name.endsWith(".module.css")
  );

  await Promise.all([
    ...allCssModules.map((file) =>
      fs.copyFile(
        `${SRC_THEME_PATH}/${file.name}`,
        `${LIB_THEME_PATH}/${file.name}`
      )
    ),
    fs.copyFile(`${SRC_PATH}/custom.css`, `${LIB_PATH}/custom.css`),
  ]);
})();
