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
