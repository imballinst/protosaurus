import { writeFile } from "fs-extra";
import { MessageData } from "./types";

export async function emitMessagesJson({
  filePath,
  messages,
  isWkt,
}: {
  filePath: string;
  messages: MessageData[];
  isWkt?: boolean;
}) {
  const map = getMessagesJsonDictionary({ messages, isWkt });

  return writeFile(`${filePath}.json`, JSON.stringify(map));
}

export function getMessagesJsonDictionary({
  messages,
  isWkt,
}: {
  messages: MessageData[];
  isWkt?: boolean;
}) {
  const map: Record<string, string> = {};

  for (const message of messages) {
    const { name, packageName, hash } = message;
    // For example:
    // If it's not WKT, then it's /docs/booking.v1#Booking.
    // If it's WKT, then it's /docs/wkt/google.protobuf#Int32.
    map[name] = `/docs/${isWkt ? "wkt/" : ""}${packageName}#${hash}`;
  }

  return map;
}
