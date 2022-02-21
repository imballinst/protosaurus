import { getIndentation } from './comment';
import { getFieldComment } from './messages';
import { ProtoEnum, ProtoEnumValue } from './types';

export function getEnumProtosaurusBlock({
  packageName,
  enumObj,
  level
}: {
  packageName: string;
  enumObj: ProtoEnum;
  level: number;
}) {
  return `
\`\`\`protosaurus--${packageName}.${enumObj.name}
${getEnumFieldsBlock({
  enumObj,
  level
})}
\`\`\`
  `.trim();
}

export function getEnumFieldsBlock({
  enumObj,
  level
}: {
  enumObj: ProtoEnum;
  level: number;
}) {
  const { values, name } = enumObj;
  const prefixSpaces = getIndentation(level - 1);
  let fieldsBlock = '';

  if (values.length === 0) {
    fieldsBlock = '{}';
  } else {
    const fieldStringArray: string[] = [];

    for (let i = 0; i < values.length; i++) {
      const field = values[i];
      const fieldBlock = getEnumFieldBlock({
        enumValue: field,
        level
      });

      fieldStringArray.push(fieldBlock);
    }

    fieldsBlock = `{\n${fieldStringArray.join('\n')}\n${prefixSpaces}}`;
  }

  return `${prefixSpaces}enumObj ${name} ${fieldsBlock}`;
}

// Helper functions.
function getEnumFieldBlock({
  enumValue,
  level
}: {
  enumValue: ProtoEnumValue;
  level: number;
}) {
  const prefixSpaces = getIndentation(level);

  return (
    getFieldComment(enumValue.description, prefixSpaces) +
    `${prefixSpaces}${enumValue.name} = ${enumValue.number};`
  );
}
