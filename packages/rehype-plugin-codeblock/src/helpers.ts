import { Comment, DocType, Element, Text } from 'hast-format';

export function classnames(
  ...args: (string | Record<string, boolean> | undefined)[]
) {
  const classNames = [];

  for (const arg of args) {
    if (arg === undefined) {
      continue;
    }

    if (typeof arg === 'string') {
      classNames.push(arg);
    } else {
      // Object.
      for (const key in arg) {
        if (arg[key]) {
          classNames.push(key);
        }
      }
    }
  }

  return classNames.length ? classNames.join(' ') : undefined;
}

export function isElement(
  child: Element | DocType | Comment | Text
): child is Element {
  return child.type === 'element';
}

export function isText(
  child: Element | DocType | Comment | Text
): child is Text {
  return child.type === 'text';
}
