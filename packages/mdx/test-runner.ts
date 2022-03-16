import path from 'path';
import { execa } from 'execa';

import { emitScripts } from './src/code-runner/emitter.js';
import { getAllValidatedCodeBlocks } from './src/code-runner/scanner.js';

const CURRENT_DIR = path.join(new URL(import.meta.url).pathname, '..');
const SCRIPTS_DIR = path.join(
  CURRENT_DIR,
  'src',
  'code-runner',
  'test-scripts'
);

async function main() {
  const record = await getAllValidatedCodeBlocks(
    path.join(CURRENT_DIR, 'src', 'code-runner', 'test-mdx-files')
  );
  await emitScripts(record, SCRIPTS_DIR);

  for (const key in record) {
    const value = record[key];
    const result = await execa('node', [
      `${SCRIPTS_DIR}/${key}.${value.language}`
    ]);

    if (result.stdout === value.output) {
      value.isValid = true;
    }
  }

  console.log(record);
}

main();
