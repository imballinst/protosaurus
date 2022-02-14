import { expect } from "chai";
import { getMessagesJsonDictionary } from "./json";
import { MessageData } from "./types";

describe("getMessagesJsonDictionary", () => {
  const MESSAGES_DATA: MessageData[] = [
    {
      hash: "samplemessage",
      name: "SampleMessage",
      packageName: "booking.v1",
      // This is unused here.
      body: "",
    },
    {
      hash: "anothermessage",
      name: "AnotherMessage",
      packageName: "booking.v1",
      // This is unused here.
      body: "",
    },
  ];

  test("non-wkt", () => {
    expect(getMessagesJsonDictionary({ messages: MESSAGES_DATA })).eql({
      SampleMessage: "/docs/booking.v1#samplemessage",
      AnotherMessage: "/docs/booking.v1#anothermessage",
    });
  });

  test("wkt", () => {
    expect(
      getMessagesJsonDictionary({ messages: MESSAGES_DATA, isWkt: true })
    ).eql({
      SampleMessage: "/docs/wkt/booking.v1#samplemessage",
      AnotherMessage: "/docs/wkt/booking.v1#anothermessage",
    });
  });
});
