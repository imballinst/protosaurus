import type { Plugin } from "@docusaurus/types";
import path from "path";
import fs from "fs";

const SRC_PATH = path.join(__dirname, "../src/theme");

export default function protosaurusTheme(): Plugin<void> {
  return {
    name: "protosaurus-theme",
    getThemePath() {
      return path.join(__dirname, "./theme");
    },
    getTypeScriptThemePath() {
      return SRC_PATH;
    },
    getClientModules() {
      const allThemeFiles = fs.readdirSync(`${SRC_PATH}/theme`, {
        encoding: "utf-8",
        withFileTypes: true,
      });
      const allCssModules = allThemeFiles.filter((file) =>
        file.name.endsWith(".module.css")
      );

      return [
        ...allCssModules.map((file) => `${SRC_PATH}/theme/${file.name}`),
        `${SRC_PATH}/custom.css`,
      ];
    },
  };
}
