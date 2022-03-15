/**
 * Copyright 2022 Protosaurus Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import fs from 'fs-extra';
import path from 'path';

import { emitMdx } from './mdx/mdx';
import { convertProtoArrayToRecord } from './mdx/record';
import { PackageData, ProtoEnum, ProtoMessage } from './mdx/types';
import { emitMessagesJson } from './mdx/json';
import { emitCategoryMetadata } from './mdx/metadata';
import { readPackageData } from './mdx/packages';
import { getServiceString } from './mdx/services';

// Labels for the local types and the well-known types.
const CATEGORY_LABELS = {
  wkt: 'Well Known Types'
};

export async function emitJsonAndMdx(siteDir: string) {
  const {
    pathToGenerated,
    pathToGeneratedWkt,
    pathToMdx,
    pathToMdxWkt,
    pathToPluginDictionary
  } = getPaths(siteDir);
  const deletedFilesAndFolders = await getDeletedFilesAndFolderNames(
    pathToPluginDictionary,
    pathToMdx
  );

  // Delete all generated MDX files.
  // Use `allSettled` so that if the file doesn't exist, it won't throw
  // an error.
  await Promise.allSettled(
    deletedFilesAndFolders.map((entry) => fs.rm(entry, { recursive: true }))
  );

  // Re-create the folders.
  await Promise.all([
    fs.mkdirp(pathToPluginDictionary),
    fs.mkdirp(pathToMdx),
    fs.mkdirp(pathToMdxWkt)
  ]);

  // Generate MDX and dictionary for local types.
  const {
    allPackages: localPackages,
    allProtoMessages,
    allProtoEnums
  } = await recursivelyReadDirectory({
    pathToDirectory: pathToGenerated,
    excludedDirectories: [pathToGeneratedWkt]
  });
  const { allPackages: wktPackages, allProtoMessages: allWktProtoMessages } =
    await recursivelyReadDirectory({
      pathToDirectory: pathToGeneratedWkt
    });

  const localMessagesDictionary = convertProtoArrayToRecord(allProtoMessages);
  const wktMessagesDictionary = convertProtoArrayToRecord(allWktProtoMessages);
  const enumsDictionary = convertProtoArrayToRecord(allProtoEnums);

  for (const pkg of localPackages) {
    // Since services require the information of all messages, then
    // we can only "render" the service string here, after all messages
    // have been identified.
    pkg.servicesData = pkg.rawProtoServices.map((service) => ({
      name: service.name,
      packageName: pkg.name,
      body: getServiceString({
        service,
        messagesRecord: localMessagesDictionary,
        enumsRecord: enumsDictionary,
        wktMessagesRecord: wktMessagesDictionary,
        packageName: pkg.name,
        innerObjectsRecord: pkg.innerObjectsRecord
      })
    }));

    // Emit messages and services.
    const pathToMessagesMdx = `${pathToMdx}/${pkg.name}`;
    await emitMdx(pathToMessagesMdx, pkg);

    // Emit JSON dictionary for the plugin.
    const pathToPlugin = `${pathToPluginDictionary}/${pkg.name}`;
    await emitMessagesJson({
      filePath: pathToPlugin,
      messages: pkg.messagesData.concat(pkg.enumsData).concat(
        // Concat with this array because we'll need the inner messages
        // in the dictionary for syntax coloring.
        //
        // Each array element is in this form, for example:
        //
        // {
        //   name: "Location";
        //   packageName: "location.v1";
        //   hash: "location";
        //   body: `
        //    <Definition>
        //
        //    <DefinitionHeader name="message">
        //
        //    ### Booking
        //
        //    </DefinitionHeader>
        //
        //    Represents the booking of a vehicle.
        //
        //    Vehicles are some cool shit. But drive carefully.
        //
        //    ```protosaurus--booking.v1.Booking
        //    message Booking {
        //      // ID of booked vehicle.
        //      int32 vehicle_id = 1;
        //      // Customer that booked the vehicle.
        //      int32 customer_id = 2;
        //      // Status of the booking.
        //      BookingStatus status = 3;
        //      // Has booking confirmation been sent.
        //      bool confirmation_sent = 4;
        //      // Has payment been received.
        //      bool payment_received = 5;
        //      // Color preference of the customer.
        //      string color_preference = 6;
        //      // Pick-up location.
        //      // This is a coordinate.
        //      Location pickup_location = 7;
        //      // Destination location.
        //      // This is a coordinate.
        //      Location destination_location = 8;
        //      // Intermediate locations.
        //      repeated Location intermediate_locations = 9;
        //    }
        //    ```
        //
        //    </Definition>
        //   `;
        // }
        Object.values(pkg.innerObjectsRecord).map((message) => {
          // We can set the body as empty here because this function emits JSON,
          // not emitting MDX, and hence, not used.
          if (message.rawMessage) {
            return {
              body: '',
              name: message.rawMessage.longName,
              packageName: pkg.name,
              hash: message.rawMessage.longName.toLowerCase()
            };
          }

          return {
            body: '',
            name: message.rawEnum!.longName,
            packageName: pkg.name,
            hash: message.rawEnum!.longName.toLowerCase()
          };
        })
      )
    });
  }

  // Generate MDX and dictionary for well known types (WKT).
  const wktPackagesDictionary: Record<string, PackageData> = {};

  for (const pkg of wktPackages) {
    if (wktPackagesDictionary[pkg.name] === undefined) {
      wktPackagesDictionary[pkg.name] = {
        ...pkg,
        messagesData: []
      };
    }

    wktPackagesDictionary[pkg.name].messagesData.push(...pkg.messagesData);
  }

  // Render MDX one-by-one.
  const allWktPackages = Object.values(wktPackagesDictionary);

  await Promise.all(
    allWktPackages.map((pkg) => {
      const pathToMdx = `${pathToMdxWkt}/${pkg.name}`;
      return emitMdx(pathToMdx, pkg);
    })
  );

  // Render all WKT JSON in one file.
  const pathToWktFile = `${pathToPluginDictionary}/wkt`;
  await emitMessagesJson({
    filePath: pathToWktFile,
    messages: allWktPackages.map((pkg) => pkg.messagesData).flat(),
    isWkt: true
  });

  // Create the metadata file.
  await emitCategoryMetadata(pathToMdxWkt, CATEGORY_LABELS.wkt);
}

// Helper functions.
async function recursivelyReadDirectory({
  pathToDirectory,
  excludedDirectories
}: {
  // Path to the directory to read.
  pathToDirectory: string;
  // Directories to exclude. Mostly this is to stop reading WKT JSONs
  // when we want to just read the non-WKT JSONs.
  excludedDirectories?: string[];
}): Promise<{
  allPackages: PackageData[];
  allProtoMessages: ProtoMessage[];
  allProtoEnums: ProtoEnum[];
}> {
  const allPackages: PackageData[] = [];
  const allProtoMessages: ProtoMessage[] = [];
  const allProtoEnums: ProtoEnum[] = [];

  if (excludedDirectories && excludedDirectories.includes(pathToDirectory)) {
    return { allPackages, allProtoMessages, allProtoEnums };
  }

  const entries = await fs.readdir(pathToDirectory, {
    encoding: 'utf-8',
    withFileTypes: true
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
    const {
      allPackages: packages,
      allProtoMessages: rawProtoMessages,
      allProtoEnums: rawProtoEnums
    } = await recursivelyReadDirectory({
      pathToDirectory: pathToEntry,
      excludedDirectories
    });
    allProtoMessages.push(...rawProtoMessages);
    allProtoEnums.push(...rawProtoEnums);
    allPackages.push(...packages);
  }

  return { allPackages, allProtoMessages, allProtoEnums };
}

function getPaths(siteDir: string) {
  const pathToGenerated = path.join(siteDir, '.protosaurus/generated');
  const pathToGeneratedWkt = path.join(siteDir, '.protosaurus/generated/wkt');
  const pathToMdx = path.join(siteDir, 'docs');
  const pathToMdxWkt = `${pathToMdx}/wkt`;
  const pathToPluginDictionary = path.join(
    siteDir,
    '.protosaurus/plugin-resources/rehype-plugin-codeblock/dictionary'
  );

  return {
    pathToGenerated,
    pathToGeneratedWkt,
    pathToMdx,
    pathToMdxWkt,
    pathToPluginDictionary
  };
}

async function getDeletedFilesAndFolderNames(
  pluginDictionaryDir: string,
  pathToMdx: string
) {
  try {
    const entries = await fs.readdir(pluginDictionaryDir, {
      withFileTypes: true
    });
    const filesAndFolderNames: string[] = [];

    for (const entry of entries) {
      const basename = path.basename(entry.name, '.json');
      filesAndFolderNames.push(
        path.join(pathToMdx, basename === 'wkt' ? basename : `${basename}.mdx`)
      );
    }

    return filesAndFolderNames;
  } catch (err) {
    return [];
  }
}
