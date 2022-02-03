import { Field, ProtoMessage } from "./types";

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
  level,
}: {
  packageName: string;
  message: ProtoMessage;
  innerMessagesRecord?: Record<string, string>;
  level: number;
}) {
  return `
\`\`\`protosaurus--${packageName}.${message.name}
${getMessageFieldsBlock({ message, innerMessagesRecord, level })}
\`\`\`
  `.trim();
}

export function getMessageFieldsBlock({
  message,
  innerMessagesRecord,
  level,
}: {
  message: ProtoMessage;
  // An optional parameter so that the inner message can be rendered
  // before the field declaration.
  innerMessagesRecord?: Record<string, string>;
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
      const fieldBlock = getFieldBlock(field, i + 1, level);
      let innerMessageBlock = "";

      if (innerMessagesRecord && innerMessagesRecord[field.longType]) {
        // Add one newline before and two after the inner message.
        innerMessageBlock = `\n${innerMessagesRecord[field.longType]}\n\n`;

        // Clear inner message so that it won't be used by the next fields.
        innerMessagesRecord[field.longType] = "";
      }

      fieldStringArray.push(innerMessageBlock + fieldBlock);
    }

    fieldsBlock = `{\n${fieldStringArray.join("\n")}\n${prefixSpaces}}`;
  }

  return `${prefixSpaces}message ${name} ${fieldsBlock}`;
}

// Helper functions.
function getFieldBlock(field: Field, num: number, level: number) {
  const prefixSpaces = getIndentation(level);

  return (
    getCommentString(field.description, prefixSpaces) +
    `${prefixSpaces}${field.type} ${field.name} = ${num};`
  );
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
