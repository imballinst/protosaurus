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
import { getFieldComment } from './messages';

describe('getFieldComment', () => {
  test('without link', () => {
    const sampleText = `
Hello world! This is a comment without link.
As a bonus, I give you a multi-line example.
    `.trim();

    expect(getFieldComment(sampleText, '').trim()).to.equal(
      `
// Hello world! This is a comment without link.
// As a bonus, I give you a multi-line example.
    `.trim()
    );
  });

  test('link', () => {
    const sampleText = `
Hello world! This is a comment [with link](https://example.com).
As a bonus, I give you a multi-line example.
    `.trim();

    expect(getFieldComment(sampleText, '').trim()).to.equal(
      `
// Hello world! This is a comment [with link](https://example.com).
// As a bonus, I give you a multi-line example.
    `.trim()
    );
  });

  test('link and new line', () => {
    const sampleText = `
Hello world! This is a comment with [link separated
by a newline](https://example.com).
As a bonus, I give you a multi-line example.
      `.trim();

    expect(getFieldComment(sampleText, '').trim()).to.equal(
      `
// Hello world! This is a comment with [link separated by a newline](https://example.com).
// As a bonus, I give you a multi-line example.
      `.trim()
    );
  });

  test('link and new line in the middle of a sentence', () => {
    const sampleText = `
Hello world! This is a comment with [link separated
by a newline](https://example.com) in the middle of a sentence.
As a bonus, I give you a multi-line example.
  `.trim();

    expect(getFieldComment(sampleText, '').trim()).to.equal(
      `
// Hello world! This is a comment with [link separated by a newline](https://example.com)
// in the middle of a sentence.
// As a bonus, I give you a multi-line example.
  `.trim()
    );
  });

  test('a lot of links with new line in the middle of a sentence', () => {
    const sampleText = `
Hello world! This is a comment with [link separated
by a newline](https://example.com) in the middle of a sentence.
Hello world! This is a comment with [link separated
by a newline](https://example.com) in the middle of a sentence.
As a bonus, I give you a multi-line example.
  `.trim();

    expect(getFieldComment(sampleText, '').trim()).to.equal(
      `
// Hello world! This is a comment with [link separated by a newline](https://example.com)
// in the middle of a sentence.
// Hello world! This is a comment with [link separated by a newline](https://example.com)
// in the middle of a sentence.
// As a bonus, I give you a multi-line example.
  `.trim()
    );
  });
});
