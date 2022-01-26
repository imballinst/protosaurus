import { convertPackageToMdx } from "./doc-to-mdx";
import path from "path";
import assert from "assert";

const ROOT_PATH = path.join(__dirname, "../../");
const BOOKING_DOC_JSON_PATH = path.join(
  ROOT_PATH,
  "website/generated/booking/v1/doc.json"
);

test("convertPackageToMdx", async () => {
  const result = await convertPackageToMdx(BOOKING_DOC_JSON_PATH);
  const expected = `
// Represents the booking status ID.
message BookingStatusID {
  // Unique booking status ID.
  int32 id = 1;
}

// Represents the status of a vehicle booking.
message BookingStatus {
  // Unique booking status ID.
  int32 id = 1;
  // Booking status description. E.g. "Active".
  string description = 2 [(google.api.field_behavior) = REQUIRED, (validate.rules).string.min_len = 1];
}

// Represents the booking of a vehicle.
//
// Vehicles are some cool shit. But drive carefully.
message Booking {
  // ID of booked vehicle.
  int32 vehicle_id = 1;
  // Customer that booked the vehicle.
  int32 customer_id = 2;
  // Status of the booking.
  BookingStatus status = 3;

  // Has booking confirmation been sent.
  bool confirmation_sent = 4;

  // Has payment been received.
  bool payment_received = 5;

  // Color preference of the customer.
  string color_preference = 6 [deprecated = true];
}

// An empty message for testing
message EmptyBookingMessage {}`.trim();
  console.log(result);
  console.log(expected);
  assert.equal(result, expected);
});
