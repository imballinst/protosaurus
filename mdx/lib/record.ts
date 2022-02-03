import { ProtoMessage } from "./types";

export function convertProtoToRecord(
  messages: ProtoMessage[]
): Record<string, ProtoMessage> {
  const record: Record<string, ProtoMessage> = {};

  for (const message of messages) {
    record[message.name] = message;
  }

  return record;
}
