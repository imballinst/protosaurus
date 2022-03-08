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
import { parseMetastring, stripTitleFromElementProperties } from './parser';

describe('parseMetastring', () => {
  test('none', () => {
    expect(parseMetastring('', '')).to.eql({
      title: '',
      isCollapsible: false,
      highlightedLines: []
    });
  });

  test('title only', () => {
    expect(parseMetastring('title="Hello world"', '')).to.eql({
      title: 'Hello world',
      isCollapsible: false,
      highlightedLines: []
    });
  });

  test('collapsible only: should throw an error', () => {
    const codeContent = `
message Booking {
  int id = 1;
}
    `.trim();

    expect(() => parseMetastring('collapsible', codeContent)).to.throw(
      `When collapsible meta is set on code block, title should also be set. Error happens near: ${codeContent}`
    );
  });

  test('line highlights only', () => {
    expect(parseMetastring('{1}', '')).to.eql({
      title: '',
      isCollapsible: false,
      highlightedLines: [0]
    });
    expect(parseMetastring('{1-3}', '')).to.eql({
      title: '',
      isCollapsible: false,
      highlightedLines: [0, 1, 2]
    });
    expect(parseMetastring('{1-3, 4}', '')).to.eql({
      title: '',
      isCollapsible: false,
      highlightedLines: [0, 1, 2, 3]
    });
  });

  test('title and collapsible', () => {
    expect(parseMetastring('title="Hello world" collapsible', '')).to.eql({
      title: 'Hello world',
      isCollapsible: true,
      highlightedLines: []
    });

    // Swap the positions.
    expect(parseMetastring('collapsible title="Hello world"', '')).to.eql({
      title: 'Hello world',
      isCollapsible: true,
      highlightedLines: []
    });
  });

  test('title and line highlights', () => {
    expect(parseMetastring('title="Hello world" {1}', '')).to.eql({
      title: 'Hello world',
      isCollapsible: false,
      highlightedLines: [0]
    });
    expect(parseMetastring('title="Hello world" {1-3}', '')).to.eql({
      title: 'Hello world',
      isCollapsible: false,
      highlightedLines: [0, 1, 2]
    });
    expect(parseMetastring('title="Hello world" {1-3,4}', '')).to.eql({
      title: 'Hello world',
      isCollapsible: false,
      highlightedLines: [0, 1, 2, 3]
    });

    // Swap the positions.
    expect(parseMetastring('{1} title="Hello world"', '')).to.eql({
      title: 'Hello world',
      isCollapsible: false,
      highlightedLines: [0]
    });
    expect(parseMetastring('{1-3} title="Hello world"', '')).to.eql({
      title: 'Hello world',
      isCollapsible: false,
      highlightedLines: [0, 1, 2]
    });
    expect(parseMetastring('{1-3,4} title="Hello world"', '')).to.eql({
      title: 'Hello world',
      isCollapsible: false,
      highlightedLines: [0, 1, 2, 3]
    });
  });

  test('title, line highlights, and collapsible', () => {
    expect(parseMetastring('title="Hello world" collapsible {1}', '')).to.eql({
      title: 'Hello world',
      isCollapsible: true,
      highlightedLines: [0]
    });
    expect(parseMetastring('title="Hello world" collapsible {1-3}', '')).to.eql(
      {
        title: 'Hello world',
        isCollapsible: true,
        highlightedLines: [0, 1, 2]
      }
    );
    expect(
      parseMetastring('title="Hello world" collapsible {1-3,4}', '')
    ).to.eql({
      title: 'Hello world',
      isCollapsible: true,
      highlightedLines: [0, 1, 2, 3]
    });

    // Swap the positions.
    expect(parseMetastring('{1} title="Hello world" collapsible', '')).to.eql({
      title: 'Hello world',
      isCollapsible: true,
      highlightedLines: [0]
    });
    expect(parseMetastring('{1-3} title="Hello world" collapsible', '')).to.eql(
      {
        title: 'Hello world',
        isCollapsible: true,
        highlightedLines: [0, 1, 2]
      }
    );
    expect(
      parseMetastring('{1-3,4} title="Hello world" collapsible', '')
    ).to.eql({
      title: 'Hello world',
      isCollapsible: true,
      highlightedLines: [0, 1, 2, 3]
    });
  });
});

describe('stripTitleFromElementProperties', () => {
  test('none', () => {
    expect(stripTitleFromElementProperties({})).to.eql({});
    expect(stripTitleFromElementProperties(undefined)).to.eql(undefined);
  });

  test('title only', () => {
    expect(
      stripTitleFromElementProperties({ title: '"Hello', 'World"': true })
    ).to.eql({});
  });

  test('collapsible only', () => {
    expect(stripTitleFromElementProperties({ collapsible: true })).to.eql({
      collapsible: true
    });
  });

  test('title and collapsible', () => {
    expect(
      stripTitleFromElementProperties({
        title: '"Hello',
        'World"': true,
        collapsible: true
      })
    ).to.eql({ collapsible: true });

    // Swap the positions.
    expect(
      stripTitleFromElementProperties({
        collapsible: true,
        title: '"Hello',
        'World"': true
      })
    ).to.eql({ collapsible: true });
  });
});
