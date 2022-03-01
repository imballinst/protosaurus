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

import { Comment, DocType, Element, Root, Text } from 'hast-format';
import { getLinksFromALine, isLineAComment } from './comments';
import { REPEATED_TEXT } from './constants';
import { getAllDictionaries } from './dictionary';
import { getFieldInformation } from './fields';
import { getHastElementType } from './hast';

export interface RehypePluginCodeblockOptions {
  siteDir: string;
}

const HIGHLIGHT_CLASSNAME = 'docusaurus-highlight-code-line';
const COMMENT_ANNOTATION = '// [^';

interface Annotation {
  footnoteIndex: number;
  title: string;
  divWrapper: Element;
}

// TODO(imballinst): I tried to create a proper typing,
// but it resulted in a mess. The `unified` ecosystem deps are ESM-only,
// whereas @mdx-js/mdx is only CommonJS (and without typing)!
// To save time and work on something more productive, let's set this to `any`... for now.
// Revisit this when Docusaurus has moved to MDX v2.
const docusaurusPlugin: any = (opts: RehypePluginCodeblockOptions) => {
  const { innerMessages, localMessages, wktMessages } =
    getAllDictionaries(opts);

  return (tree: Root) => {
    // During build, we can use `process.env` from `docusaurus.config.js` perhaps
    // to get the directory containing the intermediary JSON.
    // console.log(process.env);
    const codeBlockAnnotations: Annotation[] = [];

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (!isElement(child)) {
        continue;
      }

      if (child.tagName === 'p') {
        // Check the annotations.
        const firstChild = child.children[0];

        if (isText(firstChild) && firstChild.value.startsWith('[^')) {
          const titleIndexBoundaryStart = firstChild.value.indexOf('[^') + 2;
          const titleIndexBoundaryEnd = firstChild.value.indexOf(']');

          if (titleIndexBoundaryEnd > -1) {
            const title = firstChild.value.slice(
              titleIndexBoundaryStart,
              titleIndexBoundaryEnd
            );
            const matching = codeBlockAnnotations.find(
              (annotation) => annotation.title === title
            );

            if (matching) {
              matching.footnoteIndex = i;
              matching.divWrapper.children = [
                {
                  type: 'element',
                  tagName: 'div',
                  properties: {
                    className: 'protosaurus-popper',
                    'data-title': title
                  },
                  // Cut the first child, which contains the "title".
                  children: [
                    {
                      type: 'element',
                      tagName: 'div',
                      properties: {
                        className: 'protosaurus-arrow',
                        'data-popper-arrow': ''
                      },
                      children: []
                    },
                    ...child.children.slice(1)
                  ]
                },
                {
                  type: 'element',
                  tagName: 'button',
                  properties: {
                    className: 'protosaurus-popper-button',
                    'data-title': title
                  },
                  children: [
                    {
                      type: 'text',
                      // TODO(imballinst): change to info icon.
                      value: '!'
                    }
                  ]
                }
              ];
            }
          }
        }

        continue;
      }

      if (child.tagName === 'pre') {
        const pre = child;
        if (!isElement(pre)) {
          continue;
        }

        const code = pre.children[0];
        if (!isElement(code)) {
          continue;
        }

        const codeChild = code.children[0];
        if (!isText(codeChild)) {
          continue;
        }

        const codeArray = codeChild.value.split('\n');
        const matchingLanguage = code.properties?.className?.find((c: string) =>
          // TODO(imballinst): specify a better language code, if this is unfit.
          c.startsWith('language-protosaurus')
        );

        if (!matchingLanguage) {
          continue;
        }

        // For example: the format is `language-protosaurus--booking.v1.Booking`.
        // This has the purpose to "detect" submessages.
        // With the "booking.v1.Booking" namespace information, we can lookup to the
        // `subMessagesDictionary` variable.
        const [, namespace] = matchingLanguage.split('--');
        const children: (Element | Text)[] = [];
        let highlightState:
          | 'highlight-next-line'
          | 'highlight-until'
          | undefined = undefined;

        // Discard the last line from the code block (pure newline).
        for (let i = 0, length = codeArray.length - 1; i < length; i++) {
          const line = codeArray[i];
          // First things first, check if it's a highlight annotation.
          // If so, we skip the rest of the process for this line.
          const trimmed = line.trim();
          if (trimmed === '// highlight-next-line') {
            highlightState = 'highlight-next-line';
            continue;
          } else if (trimmed === '// highlight-start') {
            highlightState = 'highlight-until';
            continue;
          } else if (trimmed === '// highlight-end') {
            highlightState = undefined;
            continue;
          }

          let type = getFieldInformation({
            line,
            namespace,
            innerMessages,
            localMessages,
            wktMessages
          });

          if (type === undefined && trimmed.startsWith('message')) {
            // If undefined, then we find the built-in syntaxes.
            type = {
              match: {
                field: {
                  type: 'text',
                  name: 'message',
                  position: line.indexOf('message')
                }
              }
            };
          } else if (type === undefined && trimmed.startsWith('enum')) {
            // If undefined, then we find the built-in syntaxes.
            type = {
              match: {
                field: {
                  type: 'text',
                  name: 'enum',
                  position: line.indexOf('enum')
                }
              }
            };
          }

          if (type !== undefined) {
            // When found, we split the line into 3 parts.
            // The text before the type, the type, and the text after the type.
            const { match = {}, isRepeated } = type;
            const { field, map } = match;
            let firstSlice = '';
            let secondSlice = '';
            let hastTypeElements: (Element | Text)[] = [];

            const annotationIndex = line.indexOf(COMMENT_ANNOTATION);

            if (map) {
              // Map type.
              const { key, value, mapClosingTagIndex } = map;

              firstSlice = line.slice(0, key.position);
              secondSlice = line.slice(
                mapClosingTagIndex + 1,
                annotationIndex === -1 ? undefined : annotationIndex
              );

              hastTypeElements.push(
                getHastElementType(key),
                {
                  type: 'text' as const,
                  value: ', '
                },
                getHastElementType(value),
                {
                  type: 'text' as const,
                  value: '>'
                }
              );
            } else if (field) {
              const { name, position } = field;
              // Common type.
              let firstSlicePosition = position;

              // Pre-pend the `repeated` text beforehand, if it has "repeated" label.
              if (isRepeated) {
                hastTypeElements.push(
                  getHastElementType({
                    name: REPEATED_TEXT,
                    type: 'text'
                  })
                );
                firstSlicePosition = firstSlicePosition - REPEATED_TEXT.length;
              }

              firstSlice = line.slice(0, firstSlicePosition);
              secondSlice = line.slice(
                position + name.length,
                annotationIndex === -1 ? undefined : annotationIndex
              );

              hastTypeElements.push(getHastElementType(field));
            }

            const divContent: (Element | Comment | Text)[] = [
              {
                type: 'text',
                value: firstSlice
              },
              ...hastTypeElements,
              {
                type: 'text',
                value: secondSlice
              }
            ];

            if (annotationIndex > -1) {
              const startIdx = annotationIndex + COMMENT_ANNOTATION.length;
              const annotationTitle = line.slice(
                startIdx,
                line.indexOf(']', startIdx)
              );

              const divWrapper: Element = {
                type: 'element',
                tagName: 'div',
                properties: {
                  className: 'protosaurus-annotation-wrapper',
                  'data-title': annotationTitle
                },
                children: []
              };

              codeBlockAnnotations.push({
                footnoteIndex: -1,
                title: annotationTitle,
                divWrapper
              });
              divContent.push(divWrapper);
            }

            divContent.push({
              type: 'text',
              value: '\n'
            });

            children.push({
              type: 'element',
              tagName: 'div',
              properties: {
                className: classnames({
                  [HIGHLIGHT_CLASSNAME]: highlightState !== undefined
                })
              },
              children: divContent
            });
          } else {
            // Otherwise, push the line normally.
            const isNotLast = i + 1 < length;
            const isAComment = isLineAComment(line);
            const matches = getLinksFromALine(line);
            // Reference: https://github.com/syntax-tree/hast#element.
            // Store HAST elements in an array and apply some rules:
            //
            // (1) If the line is a comment, we wrap it in a `span` tag
            //     with a class which will give it a comment color. Otherwise,
            //     render it normally.
            const hastElements = [];

            if (matches.length) {
              // Line containing one or more links.
              let previousIndex = 0;

              for (const match of matches) {
                const { position, originalText } = match;
                const nextPreviousIndex = match.position + originalText.length;

                // Push the text before the match. This will always be a non-text.
                // This is because the line will always start with whitespace + double slashes.
                hastElements.push({
                  type: 'text' as const,
                  value: line.slice(previousIndex, position)
                });
                // Push the link.
                hastElements.push(getHastElementType(match));

                previousIndex = nextPreviousIndex;
              }

              // If there is still remaining characters in the line, push the rest of them.
              if (previousIndex + 1 <= line.length) {
                hastElements.push({
                  type: 'text' as const,
                  value: `${line.slice(previousIndex)}\n`
                });
              }
            } else {
              // Line without links.
              let val = line;

              // Add newline if not the last line.
              // This is because previously we are splitting by "\n".
              if (isNotLast) {
                val += '\n';

                // In case of double space, we need to
                // add another (as a result of .split()).
                // We need to add this "zero-width space" otherwise
                // the MDX renderer will remove the second newline.
                if (line === '') {
                  val = '​\n';
                }
              }

              hastElements.push({
                type: 'text' as const,
                value: val
              });
            }

            children.push({
              type: 'element',
              tagName: 'div',
              properties: {
                className: classnames({
                  comment: isAComment,
                  [HIGHLIGHT_CLASSNAME]: highlightState !== undefined
                })
              },
              children: hastElements
            });
          }

          if (highlightState === 'highlight-next-line') {
            highlightState = undefined;
          }
        }

        // Rewrite the `children` field.
        pre.children = children;
        // Rewrite the tag name from `pre` to `precustom` so we could
        // make a difference between normal `pre` and our `pre`.
        pre.tagName = 'precustom';
      }
    }

    // Delete the "dangling paragraphs" at the end.
    const deletedIndexes = codeBlockAnnotations.map(
      (annotation) => annotation.footnoteIndex
    );
    tree.children = tree.children.filter(
      (_, idx) => !deletedIndexes.includes(idx)
    );
  };
};

export default docusaurusPlugin;

// Helper functions.
function isElement(
  child: Element | DocType | Comment | Text
): child is Element {
  return child.type === 'element';
}

function isText(child: Element | DocType | Comment | Text): child is Text {
  return child.type === 'text';
}

function classnames(...args: (string | Record<string, boolean>)[]) {
  const classNames = [];

  for (const arg of args) {
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
