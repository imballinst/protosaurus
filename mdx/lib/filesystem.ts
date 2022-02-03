import { mkdirp, stat } from "fs-extra";

export async function createDirectoryIfNotExist(directory: string) {
  try {
    await stat(directory);
  } catch (err) {
    // Not found.
    await mkdirp(directory);
  }
}
