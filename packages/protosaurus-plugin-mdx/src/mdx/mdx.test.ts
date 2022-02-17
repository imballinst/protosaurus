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

import path from 'path';
import { expect } from 'chai';
import { readFile } from 'fs-extra';

import { convertProtoToRecord } from './record';
import { readPackageData } from './packages';
import { getServiceString } from './services';

const ROOT_PATH = process.env.WORK_DIR || path.join(__dirname, '../../../..');

describe('readPackageData', () => {
  // Test messages.
  const BOOKING_DOC_JSON_PATH = path.join(
    ROOT_PATH,
    'website/generated/booking/v1/doc.json'
  );
  const BOOKING_MDX_EXPECTED_MESSAGES_PATH = path.join(
    __dirname,
    'test-resources/booking-messages.mdx'
  );

  test('messages', async () => {
    const { packageData: packages } = await readPackageData(
      BOOKING_DOC_JSON_PATH
    );
    const allMessages: string[] = [];

    for (const pkg of packages) {
      for (const msgData of pkg.messagesData) {
        allMessages.push(msgData.body);
      }
    }

    const msgResult = allMessages.join('\n\n');
    const expectedMsg = await readFile(
      BOOKING_MDX_EXPECTED_MESSAGES_PATH,
      'utf-8'
    );

    expect(msgResult.trim()).equal(expectedMsg.trim());
  });

  // Test inner messages.
  const LOCATION_DOC_JSON_PATH = path.join(
    ROOT_PATH,
    'website/generated/location/v1/doc.json'
  );
  const LOCATION_MDX_EXPECTED_MESSAGES_PATH = path.join(
    __dirname,
    'test-resources/location-messages.mdx'
  );

  test('inner messages', async () => {
    const { packageData: packages } = await readPackageData(
      LOCATION_DOC_JSON_PATH
    );
    const allMessages: string[] = [];

    for (const pkg of packages) {
      for (const msgData of pkg.messagesData) {
        allMessages.push(msgData.body);
      }
    }

    const msgResult = allMessages.join('\n\n');
    const expectedMsg = await readFile(
      LOCATION_MDX_EXPECTED_MESSAGES_PATH,
      'utf-8'
    );

    expect(msgResult.trim()).equal(expectedMsg.trim());
  });

  // Test services.
  const BOOKING_MDX_EXPECTED_SERVICES_PATH = path.join(
    __dirname,
    'test-resources/booking-services.mdx'
  );

  test('services', async () => {
    const { packageData: packages, rawProtoMessages } = await readPackageData(
      BOOKING_DOC_JSON_PATH
    );
    const localProtoMessagesDictionary = convertProtoToRecord(rawProtoMessages);
    const allServices: string[] = [];

    for (const pkg of packages) {
      const array = pkg.rawProtoServices.map((service) =>
        getServiceString({
          service,
          allProtoMessages: localProtoMessagesDictionary,
          allWktMessages: {},
          packageName: pkg.name
        })
      );

      allServices.push(...array);
    }

    // Services.
    const svcResult = allServices.join('\n\n');
    const expectedSvc = await readFile(
      BOOKING_MDX_EXPECTED_SERVICES_PATH,
      'utf-8'
    );

    // Slice the last trailing CRLF from the `expectedSvc` variable.
    // This is because each file is expectedSvc to have a trailing new line.
    expect(svcResult.trim()).equal(expectedSvc.trim());
  });
});
