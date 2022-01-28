import { convertPackageToMdx } from "./doc-to-mdx";
import path from "path";
import assert from "assert";
import { readFile } from "fs-extra";

const ROOT_PATH = path.join(__dirname, "../../");
const BOOKING_DOC_JSON_PATH = path.join(
  ROOT_PATH,
  "website/generated/booking/v1/doc.json"
);
const BOOKING_MDX_EXPECTED_RESULT_PATH = path.join(
  __dirname,
  "test-resources/booking.mdx"
);

test("convertPackageToMdx", async () => {
  const result = (await convertPackageToMdx(BOOKING_DOC_JSON_PATH))
    .map((r) => r.messageStrings)
    .join("\n\n");
  const expected = await readFile(BOOKING_MDX_EXPECTED_RESULT_PATH, "utf-8");

  // Slice the last trailing CRLF from the `expected` variable.
  // This is because each file is expected to have a trailing new line.
  assert.equal(result, expected.slice(0, -1));
});
