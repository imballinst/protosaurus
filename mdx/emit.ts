import { readdir, rm, stat } from "fs-extra";
import path from "path";
import { emitMdx } from "./lib/mdx";
import { convertProtoToRecord } from "./lib/utils/record";
import { PackageData, ProtoMessage } from "./lib/types";
import { emitMessagesJson } from "./lib/json";
import { emitCategoryMetadata } from "./lib/metadata";
import { readPackageData } from "./lib/packages";
import { getServiceString } from "./lib/services";
import { createDirectoryIfNotExist } from "./lib/utils/filesystem";

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
const PATH_TO_WKT_MDX_FOLDER = `${PATH_TO_MDX_FOLDER}/wkt`;

const PRESERVED_DOCS_FILES = ["intro.mdx"];

// Labels for the local types and the well-known types.
const CATEGORY_LABELS = {
  wkt: "Well Known Types",
};

(async () => {
  // This does 2 things:
  // 1. Delete all files except intro.mdx in `PATH_TO_MDX_FOLDER`.
  // 2. Delete the dictionary folder `PATH_TO_PLUGIN_DICTIONARY_FOLDER`.
  await Promise.all([
    ...(await deleteDirectoryEntries(PATH_TO_MDX_FOLDER, PRESERVED_DOCS_FILES)),
    ...(await deleteDirectoryEntries(PATH_TO_PLUGIN_DICTIONARY_FOLDER)),
  ]);

  // Re-create the folders.
  await Promise.all([
    createDirectoryIfNotExist(PATH_TO_PLUGIN_DICTIONARY_FOLDER),
    createDirectoryIfNotExist(PATH_TO_MDX_FOLDER),
    createDirectoryIfNotExist(PATH_TO_WKT_MDX_FOLDER),
  ]);

  // Generate MDX and dictionary for local types.
  const { allPackages: localPackages, allProtoMessages } =
    await recursivelyReadDirectory({
      pathToDirectory: PATH_TO_GENERATED,
      excludedDirectories: [PATH_TO_GENERATED_WKT],
    });
  const { allPackages: wktPackages, allProtoMessages: allWktProtoMessages } =
    await recursivelyReadDirectory({
      pathToDirectory: PATH_TO_GENERATED_WKT,
    });

  const localMessagesDictionary = convertProtoToRecord(allProtoMessages);
  const wktMessagesDictionary = convertProtoToRecord(allWktProtoMessages);
  const promises = [];

  for (const pkg of localPackages) {
    // Since services require the information of all messages, then
    // we can only "render" the service string here, after all messages
    // have been identified.
    pkg.servicesData = pkg.rawProtoServices.map((service) => ({
      name: service.name,
      packageName: pkg.name,
      body: getServiceString({
        service,
        allProtoMessages: localMessagesDictionary,
        allWktMessages: wktMessagesDictionary,
        packageName: pkg.name,
      }),
    }));

    // Emit messages and services.
    const pathToMessagesMdx = `${PATH_TO_MDX_FOLDER}/${pkg.name}`;
    promises.push(emitMdx(pathToMessagesMdx, pkg));

    // Emit JSON dictionary for the plugin.
    const pathToPlugin = `${PATH_TO_PLUGIN_DICTIONARY_FOLDER}/${pkg.name}`;
    promises.push(
      emitMessagesJson({
        filePath: pathToPlugin,
        messages: pkg.messagesData,
      })
    );
  }

  // Generate MDX and dictionary for well known types (WKT).
  const wktPackagesDictionary: Record<string, PackageData> = {};

  for (const pkg of wktPackages) {
    if (wktPackagesDictionary[pkg.name] === undefined) {
      wktPackagesDictionary[pkg.name] = {
        ...pkg,
        messagesData: [],
      };
    }

    wktPackagesDictionary[pkg.name].messagesData.push(...pkg.messagesData);
  }

  // Render MDX one-by-one.
  const allWktPackages = Object.values(wktPackagesDictionary);
  const allMdxPromises = allWktPackages.map((pkg) => {
    const pathToMdx = `${PATH_TO_WKT_MDX_FOLDER}/${pkg.name}`;
    return emitMdx(pathToMdx, pkg);
  });

  promises.push(...allMdxPromises);

  // Render all WKT JSON in one file.
  const pathToWktFile = `${PATH_TO_PLUGIN_DICTIONARY_FOLDER}/wkt`;
  promises.push(
    emitMessagesJson({
      filePath: pathToWktFile,
      messages: allWktPackages.map((pkg) => pkg.messagesData).flat(),
      isWkt: true,
    })
  );

  // Create the metadata file.
  promises.push(
    emitCategoryMetadata(PATH_TO_WKT_MDX_FOLDER, CATEGORY_LABELS.wkt)
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
}): Promise<{
  allPackages: PackageData[];
  allProtoMessages: ProtoMessage[];
}> {
  const allPackages: PackageData[] = [];
  const allProtoMessages: ProtoMessage[] = [];

  if (excludedDirectories && excludedDirectories.includes(pathToDirectory)) {
    return { allPackages, allProtoMessages };
  }

  const entries = await readdir(pathToDirectory, {
    encoding: "utf-8",
    withFileTypes: true,
  });

  for (const entry of entries) {
    const pathToEntry = path.join(pathToDirectory, entry.name);

    // If file, read its contents.
    if (entry.isFile()) {
      const { packageData: packages, rawProtoMessages } = await readPackageData(
        pathToEntry
      );

      allPackages.push(...packages);
      allProtoMessages.push(...rawProtoMessages);
      continue;
    }

    // Otherwise, keep reading recursively.
    const { allPackages: packages, allProtoMessages: rawProtoMessages } =
      await recursivelyReadDirectory({
        pathToDirectory: pathToEntry,
        excludedDirectories,
      });
    allProtoMessages.push(...rawProtoMessages);
    allPackages.push(...packages);
  }

  return { allPackages, allProtoMessages };
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
  } catch (err) {
    return [];
  }
}
