import { readdir } from "fs-extra";
import path from "path";
import {
  convertPackageToMdx,
  emitMdx,
  emitMessagesJson,
  MessageData,
  PackageData,
} from "./lib/doc-to-mdx";

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
  const localPackages = await recursivelyReadDirectory({
    pathToDirectory: PATH_TO_GENERATED,
    excludedDirectories: [PATH_TO_GENERATED_WKT],
  });
  const promises = [];

  for (const pkg of localPackages) {
    const pathToMdx = `${PATH_TO_MDX_FOLDER}/${pkg.name}`;
    const pathToPlugin = `${PATH_TO_PLUGIN_FOLDER}/${pkg.name}`;

    promises.push(emitMdx(pathToMdx, pkg.messagesData));
    promises.push(
      emitMessagesJson({
        filePath: pathToPlugin,
        packageName: pkg.name,
        messages: pkg.messagesData,
      })
    );
  }

  // Generate MDX and dictionary for well known types (WKT).
  const packages = await recursivelyReadDirectory({
    pathToDirectory: PATH_TO_GENERATED_WKT,
    prefixToStrip: "wkt.",
  });
  const allWktMessageData: {
    [index: string]: MessageData[];
  } = {};

  for (const pkg of packages) {
    if (allWktMessageData[pkg.name] === undefined) {
      allWktMessageData[pkg.name] = [];
    }

    allWktMessageData[pkg.name].push(...pkg.messagesData);
  }

  // Render MDX one-by-one.
  // While doing so, we also merge all well known types in an array.
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
  // Path to the directory to read.
  pathToDirectory: string;
  // Directories to exclude. Mostly this is to stop reading WKT JSONs
  // when we want to just read the non-WKT JSONs.
  excludedDirectories?: string[];
  // Since we are transforming dire
  prefixToStrip?: string;
}): Promise<PackageData[]> {
  const allPackages: PackageData[] = [];

  if (excludedDirectories && excludedDirectories.includes(pathToDirectory)) {
    return allPackages;
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

      allPackages.push(...packageMessages);
      continue;
    }

    // Otherwise, keep reading recursively.
    const packageMessages = await recursivelyReadDirectory({
      pathToDirectory: pathToEntry,
      excludedDirectories,
      prefixToStrip,
    });
    allPackages.push(...packageMessages);
  }

  return allPackages;
}
