import {
  Field,
  InnerMessagesRecord,
  MessagesRecord,
  ProtoMessage,
} from "./types";

export function getMessageDefinition({
  header,
  body,
}: {
  header: string;
  body: string;
}) {
  return `<Definition>

${header}

${body}

</Definition>`;
}

export function getMessageHeader(name: string) {
  return `
<DefinitionHeader name="message">

### ${name}

</DefinitionHeader>
  `.trim();
}

export function getMessageDescription(message: ProtoMessage) {
  return message.description;
}

export function getMessageProtosaurusBlock({
  packageName,
  message,
  innerMessagesRecord,
  messagesRecord,
  level,
}: {
  packageName: string;
  message: ProtoMessage;
  innerMessagesRecord?: InnerMessagesRecord;
  messagesRecord?: MessagesRecord;
  level: number;
}) {
  return `
\`\`\`protosaurus--${packageName}.${message.name}
${getMessageFieldsBlock({
  message,
  innerMessagesRecord,
  messagesRecord,
  level,
})}
\`\`\`
  `.trim();
}

export function getMessageFieldsBlock({
  message,
  innerMessagesRecord,
  messagesRecord,
  level,
}: {
  message: ProtoMessage;
  // An optional parameter so that the inner message can be rendered
  // before the field declaration.
  innerMessagesRecord?: InnerMessagesRecord;
  messagesRecord?: MessagesRecord;
  level: number;
}) {
  const { fields, name } = message;
  const prefixSpaces = getIndentation(level - 1);
  let fieldsBlock = "";

  if (fields.length === 0) {
    fieldsBlock = "{}";
  } else {
    const fieldStringArray: string[] = [];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const fieldBlock = getFieldBlock({
        field,
        num: i + 1,
        level,
        messagesRecord,
        innerMessagesRecord,
      });
      let innerMessageBlock = "";

      if (
        innerMessagesRecord &&
        innerMessagesRecord[field.longType] !== undefined
      ) {
        // Ignore messages generated by map.
        if (!field.ismap && innerMessagesRecord[field.longType].messageBlock) {
          // Add one newline before and two after the inner message.
          innerMessageBlock = `\n${
            innerMessagesRecord[field.longType].messageBlock
          }\n\n`;

          // Clear inner message so that it won't be used by the next fields.
          innerMessagesRecord[field.longType].messageBlock = "";
        }
      }

      fieldStringArray.push(innerMessageBlock + fieldBlock);
    }

    fieldsBlock = `{\n${fieldStringArray.join("\n")}\n${prefixSpaces}}`;
  }

  return `${prefixSpaces}message ${name} ${fieldsBlock}`;
}

// Helper functions.
function getFieldBlock({
  field,
  num,
  level,
  innerMessagesRecord,
  messagesRecord,
}: {
  field: Field;
  num: number;
  level: number;
  innerMessagesRecord?: InnerMessagesRecord;
  messagesRecord?: MessagesRecord;
}) {
  const prefixSpaces = getIndentation(level);
  const fieldType = getFieldType({
    field,
    innerMessagesRecord,
    messagesRecord,
  });

  return (
    getCommentString(field.description, prefixSpaces) +
    `${prefixSpaces}${fieldType} ${field.name} = ${num};`
  );
}

function getFieldType({
  field,
  innerMessagesRecord,
  messagesRecord,
}: {
  field: Field;
  innerMessagesRecord?: InnerMessagesRecord;
  messagesRecord?: MessagesRecord;
}) {
  if (field.ismap) {
    const mapType = innerMessagesRecord![field.longType].rawMessage;
    const [keyField, valueField] = mapType.fields;

    const keyType =
      innerMessagesRecord?.[keyField.longType]?.rawMessage?.name ||
      messagesRecord?.[keyField.longType]?.name ||
      keyField?.type;
    const valueType =
      innerMessagesRecord?.[valueField.longType]?.rawMessage?.name ||
      messagesRecord?.[valueField.longType]?.name ||
      valueField?.type;

    return `map<${keyType}, ${valueType}>`;
  }

  return `${field.label === "repeated" ? "repeated " : ""}${field.type}`;
}

function getIndentation(level: number) {
  let prefixSpaces = "";

  for (let i = 0; i < level; i++) {
    prefixSpaces += "  ";
  }

  return prefixSpaces;
}

function getCommentString(comment: string, linePrefix: string) {
  if (comment === "") {
    return "";
  }

  const lines = comment.split("\n");
  for (let i = 0; i < lines.length; i++) {
    lines[i] = `${linePrefix}// ${lines[i]}`;
  }

  return `${lines.join("\n")}\n`;
}
