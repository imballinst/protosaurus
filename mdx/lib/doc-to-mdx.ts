import fs from "fs-extra";

export async function convertPackageToMdx(packagePath: string) {
  const content = await fs.readFile(packagePath, "utf-8");
  const json = JSON.parse(content);

  return json;
}
