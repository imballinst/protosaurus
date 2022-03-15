import path from 'path';
import { execa } from 'execa';
import { emitScripts } from './src/code-runner/emitter.js';
import { getAllValidatedCodeBlocks } from './src/code-runner/scanner.js';

const CURRENT_DIR = path.join(new URL(import.meta.url).pathname, '..');

async function main() {
  const record = await getAllValidatedCodeBlocks(
    path.join(CURRENT_DIR, 'src', 'code-runner', 'test-mdx-files')
  );
  await emitScripts(
    record,
    path.join(CURRENT_DIR, 'src', 'code-runner', 'test-scripts')
  );

  // await execa('echo "hello"');
}

main();
