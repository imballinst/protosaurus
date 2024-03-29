/**
 * Copyright 2022 Protosaurus Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { getIndentation } from './comment.js';
import {
  MessagesRecord,
  Field,
  InnerObjectsRecord,
  ProtoMessage,
  EnumsRecord
} from './types.js';

export function getMessageDefinition({
  header,
  body
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
  innerObjectsRecord,
  messagesRecord,
  enumsRecord,
  level
}: {
  packageName: string;
  message: ProtoMessage;
  innerObjectsRecord: InnerObjectsRecord;
  messagesRecord: MessagesRecord;
  enumsRecord: EnumsRecord;
  level: number;
}) {
  return `
\`\`\`protosaurus--${packageName}.${message.name}
${getMessageFieldsBlock({
  message,
  innerObjectsRecord,
  messagesRecord,
  enumsRecord,
  level
})}
\`\`\`
  `.trim();
}

export function getMessageFieldsBlock({
  message,
  innerObjectsRecord,
  messagesRecord,
  enumsRecord,
  level
}: {
  message: ProtoMessage;
  // An optional parameter so that the inner message can be rendered
  // before the field declaration.
  innerObjectsRecord: InnerObjectsRecord;
  messagesRecord: MessagesRecord;
  enumsRecord: EnumsRecord;
  level: number;
}) {
  const { fields, name } = message;
  const prefixSpaces = getIndentation(level - 1);
  const innerObjectDefinitionFlag: Record<string, boolean> = {};
  let fieldsBlock = '';

  if (fields.length === 0) {
    fieldsBlock = '{}';
  } else {
    const fieldStringArray: string[] = [];

    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];
      const fieldBlock = getFieldBlock({
        field,
        num: i + 1,
        level,
        messagesRecord,
        enumsRecord,
        innerObjectsRecord
      });
      let innerMessageBlock = '';

      if (
        innerObjectsRecord &&
        innerObjectsRecord[field.longType] !== undefined
      ) {
        // Ignore messages generated by map.
        if (
          !field.ismap &&
          innerObjectDefinitionFlag[field.longType] === undefined
        ) {
          // Add one newline before and two after the inner message.
          innerMessageBlock = `${
            innerObjectsRecord[field.longType].messageBlock
          }\n\n`;

          // Clear inner message so that it won't be used by the next fields.
          innerObjectDefinitionFlag[field.longType] = true;
        }
      }

      fieldStringArray.push(innerMessageBlock + fieldBlock);
    }

    fieldsBlock = `{\n${fieldStringArray.join('\n\n')}\n${prefixSpaces}}`;
  }

  return `${prefixSpaces}message ${name} ${fieldsBlock}`;
}

export function getFieldComment(comment: string, linePrefix: string) {
  if (comment === '') {
    return '';
  }

  const parsed = processCommentForLinksAndImages(comment);
  const lines = parsed.split('\n');
  const length = lines.length;

  for (let i = 0; i < length; i++) {
    lines[i] = `${linePrefix}// ${lines[i]}`;
  }

  return `${lines.join('\n')}\n`;
}

// Helper functions.
function getFieldBlock({
  field,
  num,
  level,
  innerObjectsRecord,
  messagesRecord,
  enumsRecord
}: {
  field: Field;
  num: number;
  level: number;
  innerObjectsRecord: InnerObjectsRecord;
  messagesRecord: MessagesRecord;
  enumsRecord: EnumsRecord;
}) {
  const prefixSpaces = getIndentation(level);
  const fieldType = getFieldType({
    field,
    innerObjectsRecord,
    messagesRecord,
    enumsRecord
  });

  return (
    getFieldComment(field.description, prefixSpaces) +
    `${prefixSpaces}${fieldType} ${field.name} = ${num};`
  );
}

function getFieldType({
  field,
  innerObjectsRecord,
  messagesRecord,
  enumsRecord
}: {
  field: Field;
  innerObjectsRecord: InnerObjectsRecord;
  messagesRecord: MessagesRecord;
  enumsRecord: EnumsRecord;
}) {
  const mapType = innerObjectsRecord?.[field.longType]?.rawMessage;

  if (field.ismap && mapType) {
    const [keyField, valueField] = mapType.fields;

    const keyType =
      innerObjectsRecord?.[keyField.longType]?.rawMessage?.name ||
      innerObjectsRecord?.[keyField.longType]?.rawEnum?.name ||
      messagesRecord?.[keyField.longType]?.name ||
      enumsRecord?.[keyField.longType]?.name ||
      keyField?.type;
    const valueType =
      innerObjectsRecord?.[valueField.longType]?.rawMessage?.name ||
      innerObjectsRecord?.[valueField.longType]?.rawEnum?.name ||
      messagesRecord?.[valueField.longType]?.name ||
      enumsRecord?.[valueField.longType]?.name ||
      valueField?.type;

    return `map<${keyType}, ${valueType}>`;
  }

  return `${field.label === 'repeated' ? 'repeated ' : ''}${field.type}`;
}

// Let's define the rules.
// A link CANNOT contain a space.
// The hyperlinked text can contain anything, except double newlines.
function processCommentForLinksAndImages(line: string) {
  const length = line.length;
  let result = '';
  let i = 0;

  while (i < length) {
    // Since we can "jump" through the line (it's not always +1),
    // then we need to declare it as a variable.
    // For example, the [text](link) means we will skip 12 characters.
    let nextIndex = i + 1;
    let textToAdd = line.charAt(i);

    if (textToAdd === '[') {
      // The "[" is the biggest indicator of a link.
      const bracketParenthesisIndex = line.indexOf('](', i);
      let text = '';
      let link = '';

      if (bracketParenthesisIndex > -1) {
        // Bracket and parenthesis exist.
        // We then check for the closing parenthesis.
        const closingParenthesisIndex = line.indexOf(')', i);

        if (
          i < bracketParenthesisIndex &&
          bracketParenthesisIndex < closingParenthesisIndex
        ) {
          // The bracket and parenthesis should be positioned in the middle.
          // Slice the text.
          text = line.slice(i + 1, bracketParenthesisIndex);
          link = line.slice(
            bracketParenthesisIndex + 2,
            closingParenthesisIndex
          );

          const isTextValid = !isCharacterRepeatedNTimesInARow({
            text,
            character: '\n',
            maxTimesInARow: 2
          });
          const isLinkValid = !isCharacterRepeatedNTimesInARow({
            text: link,
            character: ' ',
            maxTimesInARow: 1
          });

          if (isTextValid && isLinkValid) {
            // In text: 1 newline is still OK, but 2 is not.
            // In link: spaces are not allowed.
            textToAdd = `[${text}](${link})`;
            nextIndex = closingParenthesisIndex + 1;

            if (textToAdd.includes('\n')) {
              textToAdd = textToAdd.replace('\n', ' ');

              // Replace the next whitespace to a newline to offset the newline we removed.
              const match = /\s/.exec(line.slice(nextIndex));

              if (match) {
                const offset = match.index;
                // Append with the text until the next whitespace.
                textToAdd += line.slice(nextIndex, nextIndex + offset);
                // Append the newline.
                textToAdd += '\n';
                // Increase the next index by offset + 1 so that the whitespace
                // won't be included in the next iteration.
                nextIndex += offset + 1;
              }
            }
          }
        }
      }
    }

    result += textToAdd;
    i = nextIndex;
  }

  return result;
}

function isCharacterRepeatedNTimesInARow({
  text,
  character,
  maxTimesInARow
}: {
  text: string;
  character: string;
  maxTimesInARow: number;
}) {
  let count = 0;
  let previousCharacter = '';
  let i = 0;

  while (i < text.length) {
    const currentChar = text.charAt(i);
    if (
      character === currentChar &&
      (previousCharacter === '' || previousCharacter === currentChar)
    ) {
      count++;

      if (maxTimesInARow === count) {
        // Early exit if exceeds.
        break;
      }
    }

    previousCharacter = currentChar;
    i++;
  }

  return count === maxTimesInARow;
}
