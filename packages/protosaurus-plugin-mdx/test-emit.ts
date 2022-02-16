import { emitJsonAndMdx } from "./src/emit";
import path from "path";

(() => {
  emitJsonAndMdx(path.join(__dirname, "../../website"));
})();
