import { expect } from 'chai';
import path from 'path';
import { getAllValidatedCodeBlocks } from './scanner';

test('getAllValidatedCodeBlocks', async () => {
  const record = await getAllValidatedCodeBlocks(
    path.join(__dirname, 'test-mdx-files')
  );

  expect(record['js-log'].content).to.eql(
    "console.log('Hello from js-log');\n"
  );
  expect(record['js-log'].output).to.eql('Hello from js-log\n');

  expect(record['js-log-2'].content).to.eql(
    "console.log('Hello from js-log-2');\n"
  );
  expect(record['js-log-2'].output).to.eql('Hello from js-log-2\n');

  expect(record['js-log-3'].content).to.eql(
    "console.log('Hello from js-log-3');\n"
  );
  expect(record['js-log-3'].output).to.eql('Hello from js-log-3\n');

  expect(record['js-log-4'].content).to.eql(
    "console.log('Hello from js-log-4');\n"
  );
  expect(record['js-log-4'].output).to.eql('Hello from js-log-3\n');
});
