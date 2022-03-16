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
import { MetastringInfo, parseMetastring } from './parser.js';
import { PathAndCodeBlocksRecord, StoredValue } from './types';

const COMMENT_LINE_PREFIX: Record<string, string> = {
  js: '//'
};
const DEFAULT_STORED_VALUE = {
  isValid: false,
  language: '',
  content: '',
  output: ''
};

export async function getAllValidatedCodeBlocks(
  directory: string
): Promise<PathAndCodeBlocksRecord> {
  const record: PathAndCodeBlocksRecord = {};
  const entries = await fs.readdir(directory, {
    encoding: 'utf-8',
    withFileTypes: true
  });

  for (const entry of entries) {
    const name = `${directory}/${entry.name}`;

    if (entry.isDirectory()) {
      const filesRecord = await getAllValidatedCodeBlocks(name);

      for (const key in filesRecord) {
        record[key] = filesRecord[key];
      }
    } else {
      const file = await fs.readFile(name, 'utf-8');
      const lineArray = file.split('\n');
      let currentBlockValue: StoredValue = { ...DEFAULT_STORED_VALUE };
      let currentLine = 0;
      let currentMetastringInfo: MetastringInfo | undefined;

      for (const line of lineArray) {
        if (line.startsWith('```')) {
          if (currentMetastringInfo?.validationId) {
            // Store into the record.
            record[currentMetastringInfo.validationId] = currentBlockValue;
            currentMetastringInfo = undefined;
            currentBlockValue = { ...DEFAULT_STORED_VALUE };
          } else {
            currentLine = 0;
            currentMetastringInfo = parseMetastring(line, '');

            const array = line.split(' ');
            currentBlockValue.language = array[0].replace(/\`/g, '');
          }

          continue;
        }

        if (currentMetastringInfo?.validationId) {
          if (currentMetastringInfo.outputLines.includes(currentLine)) {
            const trimmed = line
              .replace(COMMENT_LINE_PREFIX[currentBlockValue.language], '')
              .trim();
            currentBlockValue.output += trimmed;
          } else {
            currentBlockValue.content += `${line}\n`;
          }
        }

        currentLine++;
      }
    }
  }

  return record;
}
