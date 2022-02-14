import { writeFile } from "fs-extra";

export async function emitCategoryMetadata(directory: string, label: string) {
  const metadata = `
label: ${label}
  `.trim();

  return writeFile(`${directory}/_category_.yml`, metadata);
}
