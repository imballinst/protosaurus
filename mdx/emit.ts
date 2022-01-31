import { readdir, rm, stat } from "fs-extra";
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
const PATH_TO_PLUGIN_DICTIONARY_FOLDER = path.join(
  process.env.PWD!,
  "../website/plugins/proto-messages/dictionary"
);

const PRESERVED_DOCS_FILES = ["intro.mdx"];

(async () => {
  // This does 2 things:
  // 1. Delete all files except intro.mdx in `PATH_TO_MDX_FOLDER`.
  // 2. Delete the dictionary folder `PATH_TO_PLUGIN_DICTIONARY_FOLDER`.
  await Promise.all([
    deleteDirectoryEntries(PATH_TO_MDX_FOLDER, PRESERVED_DOCS_FILES),
    deleteDirectoryEntries(PATH_TO_PLUGIN_DICTIONARY_FOLDER),
  ]);

  // Generate MDX and dictionary for local types.
  const localPackages = await recursivelyReadDirectory({
    pathToDirectory: PATH_TO_GENERATED,
    excludedDirectories: [PATH_TO_GENERATED_WKT],
  });
  const promises = [];

  for (const pkg of localPackages) {
    const pathToMdx = `${PATH_TO_MDX_FOLDER}/${pkg.name}`;
    const pathToPlugin = `${PATH_TO_PLUGIN_DICTIONARY_FOLDER}/${pkg.name}`;

    promises.push(emitMdx(pathToMdx, pkg));
    promises.push(
      emitMessagesJson({
        filePath: pathToPlugin,
        messages: pkg.messagesData,
      })
    );
  }

  // Generate MDX and dictionary for well known types (WKT).
  const wktPackages = await recursivelyReadDirectory({
    pathToDirectory: PATH_TO_GENERATED_WKT,
  });
  const allWktMessages: MessageData[] = [];

  for (const pkg of wktPackages) {
    // We want to merge all WKTs in one file so it's not scattered.
    const pathToMdx = `${PATH_TO_MDX_FOLDER}/wkt/${[pkg.name]}`;

    allWktMessages.push(...pkg.messagesData);
    promises.push(emitMdx(pathToMdx, pkg));
  }

  // Render all WKT JSON in one file.
  const pathToWktFile = `${PATH_TO_PLUGIN_DICTIONARY_FOLDER}/wkt`;
  promises.push(
    emitMessagesJson({
      filePath: pathToWktFile,
      messages: allWktMessages,
      isWkt: true,
    })
  );

  await Promise.all(promises);
})();

// Helper functions.
async function recursivelyReadDirectory({
  pathToDirectory,
  excludedDirectories,
}: {
  // Path to the directory to read.
  pathToDirectory: string;
  // Directories to exclude. Mostly this is to stop reading WKT JSONs
  // when we want to just read the non-WKT JSONs.
  excludedDirectories?: string[];
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
      const packages = await convertPackageToMdx(pathToEntry);

      allPackages.push(...packages);
      continue;
    }

    // Otherwise, keep reading recursively.
    const packages = await recursivelyReadDirectory({
      pathToDirectory: pathToEntry,
      excludedDirectories,
    });
    allPackages.push(...packages);
  }

  return allPackages;
}

async function deleteDirectoryEntries(dir: string, exception?: string[]) {
  try {
    // Check for directory existence.
    // If it doesn't exist, this will throw an error.
    await stat(dir);

    // If directory exists, proceed.
    const entries = await readdir(dir, {
      encoding: "utf-8",
      withFileTypes: true,
    });

    // Delete without exception.
    if (exception === undefined) {
      return entries.map((entry) =>
        rm(`${dir}/${entry.name}`, { recursive: true })
      );
    }

    // Delete with exceptions.
    const deletedEntries = entries.filter(
      (entry) => !exception.includes(entry.name)
    );
    return deletedEntries.map((entry) =>
      rm(`${dir}/${entry.name}`, { recursive: true })
    );
  } catch (err) {}
}
