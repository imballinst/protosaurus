import { expect } from "chai";
import { getFieldComment } from "./messages";

describe("getFieldComment", () => {
  test("without link", () => {
    const sampleText = `
Hello world! This is a comment without link.
As a bonus, I give you a multi-line example.
    `.trim();

    expect(getFieldComment(sampleText, "").trim()).to.equal(
      `
// Hello world! This is a comment without link.
// As a bonus, I give you a multi-line example.
    `.trim()
    );
  });

  test("link", () => {
    const sampleText = `
Hello world! This is a comment [with link](https://example.com).
As a bonus, I give you a multi-line example.
    `.trim();

    expect(getFieldComment(sampleText, "").trim()).to.equal(
      `
// Hello world! This is a comment [with link](https://example.com).
// As a bonus, I give you a multi-line example.
    `.trim()
    );
  });

  test("link and new line", () => {
    const sampleText = `
Hello world! This is a comment with [link separated
by a newline](https://example.com).
As a bonus, I give you a multi-line example.
      `.trim();

    expect(getFieldComment(sampleText, "").trim()).to.equal(
      `
// Hello world! This is a comment with [link separated by a newline](https://example.com).
// As a bonus, I give you a multi-line example.
      `.trim()
    );
  });

  test("link and new line in the middle of a sentence", () => {
    const sampleText = `
Hello world! This is a comment with [link separated
by a newline](https://example.com) in the middle of a sentence.
As a bonus, I give you a multi-line example.
  `.trim();

    expect(getFieldComment(sampleText, "").trim()).to.equal(
      `
// Hello world! This is a comment with [link separated by a newline](https://example.com)
// in the middle of a sentence.
// As a bonus, I give you a multi-line example.
  `.trim()
    );
  });

  test("a lot of links with new line in the middle of a sentence", () => {
    const sampleText = `
Hello world! This is a comment with [link separated
by a newline](https://example.com) in the middle of a sentence.
Hello world! This is a comment with [link separated
by a newline](https://example.com) in the middle of a sentence.
As a bonus, I give you a multi-line example.
  `.trim();

    expect(getFieldComment(sampleText, "").trim()).to.equal(
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
