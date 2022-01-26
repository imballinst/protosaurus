import { convertPackageToMdx } from "./doc-to-mdx";
import path from "path";

const ROOT_PATH = path.join(__dirname, "../../");
const BOOKING_DOC_JSON_PATH = path.join(
  ROOT_PATH,
  "website/generated/booking/v1/doc.json"
);

test("convertPackageToMdx", async () => {
  const result = await convertPackageToMdx(BOOKING_DOC_JSON_PATH);
  console.log(result);
});
