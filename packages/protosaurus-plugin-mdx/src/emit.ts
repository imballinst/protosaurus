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

import { readdirSync, rmSync, statSync } from "fs-extra";
import path from "path";

import { emitMdx } from "./mdx/mdx";
import { convertProtoToRecord } from "./mdx/record";
import { PackageData, ProtoMessage } from "./mdx/types";
import { emitMessagesJson } from "./mdx/json";
import { emitCategoryMetadata } from "./mdx/metadata";
import { readPackageData } from "./mdx/packages";
import { getServiceString } from "./mdx/services";
import { createDirectoryIfNotExist } from "./mdx/filesystem";

const PRESERVED_DOCS_FILES = ["intro.mdx"];

// Labels for the local types and the well-known types.
const CATEGORY_LABELS = {
  wkt: "Well Known Types",
};

export function emitJsonAndMdx(siteDir: string) {
  const {
    pathToGenerated,
    pathToGeneratedWkt,
    pathToMdx,
    pathToMdxWkt,
    pathToPluginDictionary,
  } = getPaths(siteDir);

  // TODO(imballinst): cache.
  // This does 2 things:
  // 1. Delete all files except intro.mdx in `pathToMdx`.
  // 2. Delete the dictionary folder `pathToPluginDictionary`.
  deleteDirectoryEntries(pathToMdx, PRESERVED_DOCS_FILES);
  deleteDirectoryEntries(pathToPluginDictionary);

  // Re-create the folders.
  createDirectoryIfNotExist(pathToPluginDictionary);
  createDirectoryIfNotExist(pathToMdx);
  createDirectoryIfNotExist(pathToMdxWkt);

  // Generate MDX and dictionary for local types.
  const { allPackages: localPackages, allProtoMessages } =
    recursivelyReadDirectory({
      pathToDirectory: pathToGenerated,
      excludedDirectories: [pathToGeneratedWkt],
    });
  const { allPackages: wktPackages, allProtoMessages: allWktProtoMessages } =
    recursivelyReadDirectory({
      pathToDirectory: pathToGeneratedWkt,
    });

  const localMessagesDictionary = convertProtoToRecord(allProtoMessages);
  const wktMessagesDictionary = convertProtoToRecord(allWktProtoMessages);

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
    const pathToMessagesMdx = `${pathToMdx}/${pkg.name}`;
    emitMdx(pathToMessagesMdx, pkg);

    // Emit JSON dictionary for the plugin.
    const pathToPlugin = `${pathToPluginDictionary}/${pkg.name}`;
    emitMessagesJson({
      filePath: pathToPlugin,
      messages: pkg.messagesData.concat(
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
        Object.values(pkg.innerMessagesRecord).map((message) => ({
          // We can set the body as empty here because this function emits JSON,
          // not emitting MDX, and hence, not used.
          body: "",
          name: message.rawMessage.longName,
          packageName: pkg.name,
          hash: message.rawMessage.longName.toLowerCase(),
        }))
      ),
    });
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

  for (const pkg of allWktPackages) {
    const pathToMdx = `${pathToMdxWkt}/${pkg.name}`;
    emitMdx(pathToMdx, pkg);
  }

  // Render all WKT JSON in one file.
  const pathToWktFile = `${pathToPluginDictionary}/wkt`;
  emitMessagesJson({
    filePath: pathToWktFile,
    messages: allWktPackages.map((pkg) => pkg.messagesData).flat(),
    isWkt: true,
  });

  // Create the metadata file.
  emitCategoryMetadata(pathToMdxWkt, CATEGORY_LABELS.wkt);
}

// Helper functions.
function recursivelyReadDirectory({
  pathToDirectory,
  excludedDirectories,
}: {
  // Path to the directory to read.
  pathToDirectory: string;
  // Directories to exclude. Mostly this is to stop reading WKT JSONs
  // when we want to just read the non-WKT JSONs.
  excludedDirectories?: string[];
}): {
  allPackages: PackageData[];
  allProtoMessages: ProtoMessage[];
} {
  const allPackages: PackageData[] = [];
  const allProtoMessages: ProtoMessage[] = [];

  if (excludedDirectories && excludedDirectories.includes(pathToDirectory)) {
    return { allPackages, allProtoMessages };
  }

  const entries = readdirSync(pathToDirectory, {
    encoding: "utf-8",
    withFileTypes: true,
  });

  for (const entry of entries) {
    const pathToEntry = path.join(pathToDirectory, entry.name);

    // If file, read its contents.
    if (entry.isFile()) {
      const { packageData: packages, rawProtoMessages } =
        readPackageData(pathToEntry);

      allPackages.push(...packages);
      allProtoMessages.push(...rawProtoMessages);
      continue;
    }

    // Otherwise, keep reading recursively.
    const { allPackages: packages, allProtoMessages: rawProtoMessages } =
      recursivelyReadDirectory({
        pathToDirectory: pathToEntry,
        excludedDirectories,
      });
    allProtoMessages.push(...rawProtoMessages);
    allPackages.push(...packages);
  }

  return { allPackages, allProtoMessages };
}

function deleteDirectoryEntries(dir: string, exception?: string[]) {
  try {
    // Check for directory existence.
    // If it doesn't exist, this will throw an error.
    statSync(dir);

    // If directory exists, proceed.
    const entries = readdirSync(dir, {
      encoding: "utf-8",
      withFileTypes: true,
    });

    // Delete without exception.
    if (exception === undefined) {
      return entries.map((entry) =>
        rmSync(`${dir}/${entry.name}`, { recursive: true })
      );
    }

    // Delete with exceptions.
    const deletedEntries = entries.filter(
      (entry) => !exception.includes(entry.name)
    );
    return deletedEntries.map((entry) =>
      rmSync(`${dir}/${entry.name}`, { recursive: true })
    );
  } catch (err) {
    return [];
  }
}

function getPaths(siteDir: string) {
  const pathToGenerated = path.join(siteDir, "generated");
  const pathToGeneratedWkt = path.join(siteDir, "generated/wkt");
  const pathToMdx = path.join(siteDir, "docs");
  const pathToMdxWkt = `${pathToMdx}/wkt`;
  const pathToPluginDictionary = path.join(
    siteDir,
    "plugin-resources/protosaurus-plugin-codeblock/dictionary"
  );

  return {
    pathToGenerated,
    pathToGeneratedWkt,
    pathToMdx,
    pathToMdxWkt,
    pathToPluginDictionary,
  };
}
