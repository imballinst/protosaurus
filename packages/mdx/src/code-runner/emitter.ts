import path from 'path';
import fs from 'fs-extra';
import { PathAndCodeBlocksRecord } from './types';

export async function emitScripts(
  record: PathAndCodeBlocksRecord,
  targetDirectory: string
) {
  const keys = Object.keys(record);

  return Promise.all(
    keys.map((validationId) =>
      fs.writeFile(
        path.join(
          targetDirectory,
          `${validationId}.${record[validationId].language}`
        ),
        record[validationId].content
      )
    )
  );
}
