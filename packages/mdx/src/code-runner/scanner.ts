import { readdir, readFile } from 'fs-extra';
import { MetastringInfo, parseMetastring } from './parser';

interface StoredValue {
  content: string;
  output: string;
}

// The first key is the path to file.
// The second key is the code block validation ID.
// The value is the code block contents.
// For example:
//
// {
//   "path/to/file": {
//     "hello-world": "echo \"Hello world!\""
//   }
// }
export type PathAndCodeBlocksRecord = Record<string, StoredValue>;

const COMMENT_LINE_PREFIX: Record<string, string> = {
  js: '//'
};

export async function getAllValidatedCodeBlocks(
  directory: string
): Promise<PathAndCodeBlocksRecord> {
  const record: PathAndCodeBlocksRecord = {};
  const entries = await readdir(directory, {
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
      const file = await readFile(name, 'utf-8');
      const lineArray = file.split('\n');
      let currentBlockValue: StoredValue = {
        content: '',
        output: ''
      };
      let language = '';
      let currentLine = 0;
      let currentMetastringInfo: MetastringInfo | undefined;

      for (const line of lineArray) {
        if (line.startsWith('```')) {
          if (currentMetastringInfo?.validationId) {
            // Store into the record.
            record[currentMetastringInfo.validationId] = currentBlockValue;
            currentMetastringInfo = undefined;
            currentBlockValue = { content: '', output: '' };
          } else {
            currentLine = 0;
            currentMetastringInfo = parseMetastring(line, '');

            const array = line.split(' ');
            language = array[0].replace(/\`/g, '');
          }

          continue;
        }

        if (currentMetastringInfo?.validationId) {
          if (currentMetastringInfo.outputLines.includes(currentLine)) {
            const trimmed = line
              .replace(COMMENT_LINE_PREFIX[language], '')
              .trim();
            currentBlockValue.output += `${trimmed}\n`;
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
