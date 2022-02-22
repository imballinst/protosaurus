export function getIndentation(level: number) {
  let prefixSpaces = '';

  for (let i = 0; i < level; i++) {
    prefixSpaces += '  ';
  }

  return prefixSpaces;
}
