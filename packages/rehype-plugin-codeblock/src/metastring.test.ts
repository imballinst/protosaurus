import { expect } from 'chai';
import { parseMetastring } from './metastring';

describe('metastring', () => {
  test('none', () => {
    expect(parseMetastring('', '')).to.eql({
      title: '',
      isCollapsible: false
    });
  });

  test('title only', () => {
    expect(parseMetastring('title="Hello world"', '')).to.eql({
      title: 'Hello world',
      isCollapsible: false
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

  test('title and collapsible', () => {
    expect(parseMetastring('title="Hello world" collapsible', '')).to.eql({
      title: 'Hello world',
      isCollapsible: true
    });

    // Swap the positions.
    expect(parseMetastring('collapsible title="Hello world"', '')).to.eql({
      title: 'Hello world',
      isCollapsible: true
    });
  });
});
