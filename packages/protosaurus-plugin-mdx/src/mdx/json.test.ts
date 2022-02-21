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

import { expect } from 'chai';
import { getMessagesJsonDictionary } from './json';
import { ObjectData } from './types';

describe('getMessagesJsonDictionary', () => {
  const MESSAGES_DATA: ObjectData[] = [
    {
      hash: 'samplemessage',
      name: 'SampleMessage',
      packageName: 'booking.v1',
      // This is unused here.
      body: ''
    },
    {
      hash: 'anothermessage',
      name: 'AnotherMessage',
      packageName: 'booking.v1',
      // This is unused here.
      body: ''
    }
  ];

  test('non-wkt', () => {
    expect(getMessagesJsonDictionary({ messages: MESSAGES_DATA })).eql({
      SampleMessage: '/docs/booking.v1#samplemessage',
      AnotherMessage: '/docs/booking.v1#anothermessage'
    });
  });

  test('wkt', () => {
    expect(
      getMessagesJsonDictionary({ messages: MESSAGES_DATA, isWkt: true })
    ).eql({
      SampleMessage: '/docs/wkt/booking.v1#samplemessage',
      AnotherMessage: '/docs/wkt/booking.v1#anothermessage'
    });
  });
});
