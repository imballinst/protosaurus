import type { Plugin } from "@docusaurus/types";
import path from "path";

const SRC_THEME_PATH = path.join(__dirname, "../src/theme");
const LIB_PATH = path.join(__dirname);
const LIB_THEME_PATH = path.join(__dirname, "./theme");

export default function protosaurusTheme(): Plugin<void> {
  return {
    name: "protosaurus-theme",
    getThemePath() {
      return LIB_THEME_PATH;
    },
    getTypeScriptThemePath() {
      return SRC_THEME_PATH;
    },
    getClientModules() {
      return [`${LIB_PATH}/custom.css`];
    },
  };
}
