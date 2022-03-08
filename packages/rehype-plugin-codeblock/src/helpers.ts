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
