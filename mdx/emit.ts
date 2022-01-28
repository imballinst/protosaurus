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
const PATH_TO_GENERATED_WKT = path.join(
  process.env.PWD!,
  "../website/generated/wkt"
);
const PATH_TO_MDX_FOLDER = path.join(process.env.PWD!, "../website/docs");
const PATH_TO_PLUGIN_FOLDER = path.join(
  process.env.PWD!,
  "../website/plugins/proto-messages/dictionary"
);

(async () => {
  // Generate MDX and dictionary for local types.
  const packageMessages = await recursivelyReadDirectory({
    pathToDirectory: PATH_TO_GENERATED,
    excludedDirectories: [PATH_TO_GENERATED_WKT],
  });
  const promises = [];

  for (const p of packageMessages) {
    const pathToMdx = `${PATH_TO_MDX_FOLDER}/${p.name}`;
    const pathToPlugin = `${PATH_TO_PLUGIN_FOLDER}/${p.name}`;

    promises.push(emitMdx(pathToMdx, p.messages));
    promises.push(
      emitMessagesJson({
        filePath: pathToPlugin,
        messages: p.messages,
      })
    );
  }

  // Generate MDX and dictionary for well known types (WKT).
  const wktMessages = await recursivelyReadDirectory({
    pathToDirectory: PATH_TO_GENERATED_WKT,
    prefixToStrip: "wkt.",
  });
  const allWktMessageData: {
    [index: string]: MessageData[];
  } = {};

  for (const p of wktMessages) {
    if (allWktMessageData[p.name] === undefined) {
      allWktMessageData[p.name] = [];
    }

    allWktMessageData[p.name].push(...p.messages);
  }

  // Render MDX one-by-one.
  const allWktMessages: MessageData[] = [];

  for (const key in allWktMessageData) {
    // We want to merge all WKTs in one file so it's not scattered.
    const pathToMdx = `${PATH_TO_MDX_FOLDER}/wkt/${key}`;

    allWktMessages.push(...allWktMessageData[key]);
    promises.push(emitMdx(pathToMdx, allWktMessageData[key]));
  }

  // Render all WKT JSON in one file.
  const pathToWktFile = `${PATH_TO_PLUGIN_FOLDER}/wkt`;
  promises.push(
    emitMessagesJson({
      filePath: pathToWktFile,
      messages: allWktMessages,
      isWkt: true,
    })
  );

  await Promise.all(promises);
})();

async function recursivelyReadDirectory({
  pathToDirectory,
  excludedDirectories,
  prefixToStrip,
}: {
  pathToDirectory: string;
  excludedDirectories?: string[];
  prefixToStrip?: string;
}): Promise<PackageData[]> {
  const allMessages: PackageData[] = [];

  if (excludedDirectories && excludedDirectories.includes(pathToDirectory)) {
    return allMessages;
  }

  const entries = await readdir(pathToDirectory, {
    encoding: "utf-8",
    withFileTypes: true,
  });

  for (const entry of entries) {
    const pathToEntry = path.join(pathToDirectory, entry.name);

    // If file, read its contents.
    if (entry.isFile()) {
      const packageMessages = await convertPackageToMdx(pathToEntry);
      const packageName = pathToEntry.slice(PATH_TO_GENERATED.length);

      let name = `${path.dirname(packageName).slice(1).replace(/\//g, ".")}`;
      if (prefixToStrip) {
        name = name.slice(prefixToStrip.length);
      }

      allMessages.push({
        name,
        messages: packageMessages,
      });
      continue;
    }

    // Otherwise, keep reading recursively.
    const packageMessages = await recursivelyReadDirectory({
      pathToDirectory: pathToEntry,
      excludedDirectories,
      prefixToStrip,
    });
    allMessages.push(...packageMessages);
  }

  return allMessages;
}
