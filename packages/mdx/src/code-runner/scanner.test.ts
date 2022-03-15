import { expect } from 'chai';
import path from 'path';
import { getAllValidatedCodeBlocks } from './scanner';

const CURRENT_DIR = path.join(new URL(import.meta.url).pathname, '..');

test('getAllValidatedCodeBlocks', async () => {
  const record = await getAllValidatedCodeBlocks(
    path.join(CURRENT_DIR, 'test-mdx-files')
  );

  expect(record['js-log']).to.eql({
    content: "console.log('Hello from js-log');\n",
    output: 'Hello from js-log\n',
    language: 'js',
    isValid: false
  });

  expect(record['js-log-2']).to.eql({
    content: "console.log('Hello from js-log-2');\n",
    output: 'Hello from js-log-2\n',
    language: 'js',
    isValid: false
  });

  expect(record['js-log-3']).to.eql({
    content: "console.log('Hello from js-log-3');\n",
    output: 'Hello from js-log-3\n',
    language: 'js',
    isValid: false
  });

  expect(record['js-log-4']).to.eql({
    content: "console.log('Hello from js-log-4');\n",
    output: 'Hello from js-log-3\n',
    language: 'js',
    isValid: false
  });
});
