import { convertPackageToMdx, getServiceString } from "./doc-to-mdx";
import path from "path";
import assert from "assert";
import { readFile } from "fs-extra";
import { convertProtoToRecord } from "./record";

const ROOT_PATH = path.join(__dirname, "../../");
const BOOKING_DOC_JSON_PATH = path.join(
  ROOT_PATH,
  "website/generated/booking/v1/doc.json"
);
const BOOKING_MDX_EXPECTED_MESSAGES_RESULT_PATH = path.join(
  __dirname,
  "test-resources/booking-messages.mdx"
);
const BOOKING_MDX_EXPECTED_SERVICES_RESULT_PATH = path.join(
  __dirname,
  "test-resources/booking-services.mdx"
);

test("convertPackageToMdx", async () => {
  const { packageData: packages, rawProtoMessages } = await convertPackageToMdx(
    BOOKING_DOC_JSON_PATH
  );
  const localProtoMessagesDictionary = convertProtoToRecord(rawProtoMessages);

  const allMessages: string[] = [];
  const allServices: string[] = [];

  for (const pkg of packages) {
    for (const msgData of pkg.messagesData) {
      allMessages.push(msgData.body);
    }

    const array = pkg.rawProtoServices.map((service) =>
      getServiceString({
        service,
        allProtoMessages: localProtoMessagesDictionary,
        allWktMessages: {},
        packageName: pkg.name,
      })
    );

    allServices.push(...array);
  }

  // Messages.
  const msgResult = allMessages.join("\n\n");
  const expectedMsg = await readFile(
    BOOKING_MDX_EXPECTED_MESSAGES_RESULT_PATH,
    "utf-8"
  );

  // Slice the last trailing CRLF from the `expectedMsg` variable.
  // This is because each file is expectedMsg to have a trailing new line.
  assert.equal(msgResult.trim(), expectedMsg.trim());

  // Services.
  const svcResult = allServices.join("\n\n");
  const expectedSvc = await readFile(
    BOOKING_MDX_EXPECTED_SERVICES_RESULT_PATH,
    "utf-8"
  );

  // Slice the last trailing CRLF from the `expectedSvc` variable.
  // This is because each file is expectedSvc to have a trailing new line.
  assert.equal(svcResult.trim(), expectedSvc.trim());
});
