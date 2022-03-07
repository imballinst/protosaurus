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
import {
  getHastElementType,
  getInfoSvgIcon,
  wrapWithMetastringElements
} from './hast/hast';
import {
  parseMetastring,
  stripTitleFromElementProperties
} from './hast/parser';

export interface RehypePluginCodeblockOptions {
  siteDir: string;
}

const HIGHLIGHT_CLASSNAME = 'docusaurus-highlight-code-line';
// Separate annotation and comment annotation.
// Annotation is for annotations inside a pure line comment, whereas
// comment annotation is for code + comment.
const COMMENT_ANNOTATION = '// [^';
const ANNOTATION = '[^';

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
    // Currently, this is only limited for code blocks only.
    const codeblockAnnotations: Annotation[] = [];

    for (let i = 0; i < tree.children.length; i++) {
      const child = tree.children[i];

      if (!isElement(child)) {
        continue;
      }

      if (child.tagName === 'p') {
        // Check the annotations.
        // We use the footnote annotation, e.g. `[^1]: hello world`.
        // By the time we read a footnote, it's almost always we have traversed
        // the previous lines above it.
        const firstChild = child.children[0];

        if (isText(firstChild) && firstChild.value.startsWith('[^')) {
          processFootnote({
            child,
            text: firstChild,
            codeblockAnnotations,
            index: i
          });
        } else {
          // Normal lines, but it can still have annotations, so we still have to check it.
          for (let j = 0; j < child.children.length; j++) {
            const paragraphChild = child.children[j];

            if (
              isText(paragraphChild) &&
              paragraphChild.value.startsWith(ANNOTATION)
            ) {
              const line = paragraphChild.value;
              const titleIndexBoundaryStart = line.indexOf(ANNOTATION) + 2;
              const titleIndexBoundaryEnd = line.indexOf(
                ']',
                titleIndexBoundaryStart
              );

              const annotationTitle = line.slice(
                titleIndexBoundaryStart,
                titleIndexBoundaryEnd
              );

              // Create the container.
              const divWrapper: Element = {
                type: 'element',
                tagName: 'div',
                properties: {
                  className: 'protosaurus-annotation-wrapper mx-4',
                  'data-title': annotationTitle
                },
                children: []
              };
              // Push the footnote annotation for later use.
              // Currently, this is only limited for code blocks only.
              codeblockAnnotations.push({
                footnoteIndex: -1,
                title: annotationTitle,
                divWrapper
              });

              // Override the child with the container.
              child.children[j] = divWrapper;

              // For the previous and after elements, if they are text,
              // trim their whitespaces.
              const previousChild = child.children[j - 1];
              const nextChild = child.children[j + 1];

              if (previousChild && isText(previousChild)) {
                previousChild.value = previousChild.value.trimEnd();
              }

              if (nextChild && isText(nextChild)) {
                nextChild.value = nextChild.value.trimStart();
              }
            }
          }
        }

        // Skip the rest of the steps.
        continue;
      }

      if (child.tagName === 'pre') {
        // Read code block.
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
          c.startsWith('language-protosaurus')
        );

        const metastringInfo = parseMetastring(
          code?.properties?.metastring || '',
          codeChild.value
        );

        if (!matchingLanguage) {
          // Languages other than protosaurus.
          pre.children = wrapWithMetastringElements(metastringInfo, { ...pre });
          pre.properties = {
            className: 'protosaurus-code-container'
          };
          pre.tagName = 'div';
          // Strip the title from the metastring, so that Prism.js will not
          // duplicate the code title.
          code.properties = stripTitleFromElementProperties(code.properties);
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
          | 'highlight-current-line'
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
          } else if (metastringInfo.highlightedLines.includes(i)) {
            highlightState = 'highlight-current-line';
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

          let pushedChild: Element;

          if (type !== undefined) {
            // When found, we split the line into 3 parts.
            // The text before the type, the type, and the text after the type.
            const { match = {}, isRepeated } = type;
            const { field, map } = match;
            let firstSlice = '';
            let secondSlice = '';
            let hastTypeElements: (Element | Text)[] = [];

            const commentAnnotationIdx = line.indexOf(COMMENT_ANNOTATION);

            if (map) {
              // Map type.
              const { key, value, mapClosingTagIndex } = map;

              firstSlice = line.slice(0, key.position);
              secondSlice = line.slice(
                mapClosingTagIndex + 1,
                commentAnnotationIdx === -1 ? undefined : commentAnnotationIdx
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
                commentAnnotationIdx === -1 ? undefined : commentAnnotationIdx
              );

              hastTypeElements.push(getHastElementType(field));
            }

            const divContent: (Element | Comment | Text)[] = [
              {
                type: 'element',
                // We need to wrap this with "span" because if it's whitespace,
                // then it will not be "recognized" as whitespace when the "display" style
                // is not "block".
                tagName: 'span',
                children: [
                  {
                    type: 'text',
                    value: firstSlice
                  }
                ]
              },
              ...hastTypeElements,
              {
                type: 'text',
                value: secondSlice
              }
            ];

            if (commentAnnotationIdx > -1) {
              const startIdx = commentAnnotationIdx + COMMENT_ANNOTATION.length;
              // TODO(imballinst): this is 2-3x duplicated in this file.
              // Refactor this later.
              const annotationTitle = line.slice(
                startIdx,
                line.indexOf(']', startIdx)
              );

              // Create the container.
              const divWrapper: Element = {
                type: 'element',
                tagName: 'div',
                properties: {
                  className: 'protosaurus-annotation-wrapper',
                  'data-title': annotationTitle
                },
                children: []
              };

              // Push the footnote annotation for later use.
              // Currently, this is only limited for code blocks only.
              codeblockAnnotations.push({
                footnoteIndex: -1,
                title: annotationTitle,
                divWrapper
              });
              // Push the wrapper as well to the "line".
              divContent.push(divWrapper);
            }

            // End the line.
            // We do this always last because otherwise some elements, e.g. popper toggle button
            // will be pushed to the next line instead.
            divContent.push({
              type: 'text',
              value: '\n'
            });

            pushedChild = {
              type: 'element',
              tagName: 'div',
              properties: {
                className: classnames({
                  [HIGHLIGHT_CLASSNAME]: highlightState !== undefined
                })
              },
              children: divContent
            };
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

            const annotationIdx = line.indexOf(ANNOTATION);

            if (matches.length) {
              // Line containing one or more links.
              let previousIndex = 0;

              for (const match of matches) {
                const { position, originalText } = match;
                const nextPreviousIndex = position + originalText.length;

                // Push the text before the link.
                if (annotationIdx > -1 && annotationIdx <= position) {
                  const titleIndexBoundaryStart =
                    annotationIdx + ANNOTATION.length;
                  const titleIndexBoundaryEnd = line.indexOf(
                    ']',
                    previousIndex
                  );
                  const annotationTitle = line.slice(
                    titleIndexBoundaryStart,
                    titleIndexBoundaryEnd
                  );

                  // Create the container.
                  const divWrapper: Element = {
                    type: 'element',
                    tagName: 'div',
                    properties: {
                      className: 'protosaurus-annotation-wrapper',
                      'data-title': annotationTitle
                    },
                    children: []
                  };

                  // If there is an annotation in between, then we need to
                  // split the pushed elements into two.
                  hastElements.push(
                    {
                      type: 'text' as const,
                      value: line.slice(previousIndex, annotationIdx)
                    },
                    divWrapper,
                    {
                      type: 'text' as const,
                      value: line.slice(titleIndexBoundaryEnd + 1, position)
                    }
                  );
                  // Push the footnote annotation for later use.
                  // Currently, this is only limited for code blocks only.
                  codeblockAnnotations.push({
                    footnoteIndex: -1,
                    title: annotationTitle,
                    divWrapper
                  });
                } else {
                  // Otherwise, just push it normally.
                  hastElements.push({
                    type: 'text' as const,
                    value: line.slice(previousIndex, position)
                  });
                }

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

              if (annotationIdx > -1) {
                // Push text + annotations.
                const titleIndexBoundaryStart =
                  annotationIdx + ANNOTATION.length;
                const titleIndexBoundaryEnd = line.indexOf(']', annotationIdx);
                const annotationTitle = line.slice(
                  titleIndexBoundaryStart,
                  titleIndexBoundaryEnd
                );

                // Create the container.
                const divWrapper: Element = {
                  type: 'element',
                  tagName: 'div',
                  properties: {
                    // Add a horizontal margin so it's not too condensed with
                    // the characters to the side of it.
                    className: 'protosaurus-annotation-wrapper mx-4',
                    'data-title': annotationTitle
                  },
                  children: []
                };

                // If there is an annotation in between, then we need to
                // split the pushed elements into two.
                hastElements.push(
                  {
                    type: 'text' as const,
                    value: line.slice(0, annotationIdx).trimEnd()
                  },
                  divWrapper,
                  {
                    type: 'text' as const,
                    value: line.slice(titleIndexBoundaryEnd + 1).trimStart()
                  }
                );
                // Push the footnote annotation for later use.
                // Currently, this is only limited for code blocks only.
                codeblockAnnotations.push({
                  footnoteIndex: -1,
                  title: annotationTitle,
                  divWrapper
                });
              } else {
                // Push pure text.
                hastElements.push({
                  type: 'text' as const,
                  value: val
                });
              }
            }

            pushedChild = {
              type: 'element',
              tagName: 'div',
              properties: {
                className: classnames({
                  comment: isAComment,
                  [HIGHLIGHT_CLASSNAME]: highlightState !== undefined
                })
              },
              children: hastElements
            };
          }

          if (
            highlightState === 'highlight-next-line' ||
            highlightState === 'highlight-current-line'
          ) {
            highlightState = undefined;
          }

          children.push(pushedChild);
        }

        // Rewrite the `children` field.
        pre.children = wrapWithMetastringElements(metastringInfo, {
          type: 'element',
          tagName: 'precustom',
          children
        });
        // Rewrite the tag name from `pre` to `precustom` so we could
        // make a difference between normal `pre` and our `pre`.
        pre.properties = {
          className: 'protosaurus-code-container'
        };
        pre.tagName = 'div';
      }
    }

    // Delete the "dangling paragraphs" at the end.
    // Currently, this is only limited for code blocks only.
    const deletedIndexes = codeblockAnnotations.map(
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

function processFootnote({
  child,
  text,
  codeblockAnnotations,
  index
}: {
  child: Element;
  text: Text;
  codeblockAnnotations: Annotation[];
  index: number;
}) {
  // Get the footnote title (identified by number).
  const titleIndexBoundaryStart = text.value.indexOf('[^') + 2;
  const titleIndexBoundaryEnd = text.value.indexOf(']');

  if (titleIndexBoundaryEnd > -1) {
    const title = text.value.slice(
      titleIndexBoundaryStart,
      titleIndexBoundaryEnd
    );
    // Find the matching footnote that we have identified above.
    // Currently, this is only limited for code blocks only.
    const matching = codeblockAnnotations.find(
      (annotation) => annotation.title === title
    );

    if (matching) {
      // Store the footnote index. We will remove it from the HAST.
      matching.footnoteIndex = index;
      // Add these 2 children to the container.
      // One is for the popper, so that the position absolute is relative
      // to the container, and the other one is the button toggler.
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
          children: [getInfoSvgIcon()]
        }
      ];
    }
  }
}
