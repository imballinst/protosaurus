import { readdir } from "fs-extra";
import path from "path";
import {
  convertPackageToMdx,
  emitMdx,
  emitMessagesJson,
  MessageData,
} from "./lib/doc-to-mdx";

interface PackageData {
  name: string;
  messages: MessageData[];
}

// These are meant only to be ran from the Makefile to take effect of the PWD environment variable.
// This is because, after being compiled to `.js` files, they go into a deeper nested directories,
// which causes `__dirname` to not work properly.
const PATH_TO_GENERATED = path.join(process.env.PWD!, "../website/generated");
const PATH_TO_MDX_FOLDER = path.join(process.env.PWD!, "../website/docs");
const PATH_TO_PLUGIN_FOLDER = path.join(
  process.env.PWD!,
  "../website/plugins/proto-messages"
);

(async () => {
  const packageMessages = await recursivelyReadDirectory(PATH_TO_GENERATED);
  const promises = [];

  for (const p of packageMessages) {
    const pathToMdx = `${PATH_TO_MDX_FOLDER}/${p.name}`;
    const pathToPlugin = `${PATH_TO_PLUGIN_FOLDER}/${p.name}`;

    promises.push(emitMdx(pathToMdx, p.messages));
    promises.push(emitMessagesJson(pathToPlugin, p.messages));
  }

  await Promise.all(promises);
})();

async function recursivelyReadDirectory(
  pathToDir: string
): Promise<PackageData[]> {
  const entries = await readdir(pathToDir, {
    encoding: "utf-8",
    withFileTypes: true,
  });
  const allMessages: PackageData[] = [];

  for (const entry of entries) {
    const pathToEntry = path.join(pathToDir, entry.name);

    // If file, read its contents.
    if (entry.isFile()) {
      const packageMessages = await convertPackageToMdx(pathToEntry);
      const packageName = pathToEntry.slice(PATH_TO_GENERATED.length);

      allMessages.push({
        name: `${path.dirname(packageName).slice(1).replace(/\//g, ".")}`,
        messages: packageMessages,
      });
      continue;
    }

    // Otherwise, keep reading recursively.
    const packageMessages = await recursivelyReadDirectory(pathToEntry);
    allMessages.push(...packageMessages);
  }

  return allMessages;
}
