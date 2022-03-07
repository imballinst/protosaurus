import { Element, Text } from 'hast-format';
import { classnames, isText } from '../helpers';
import { getInfoSvgIcon } from './codeblock';

interface CreateAnnotationElementParams {
  title: string;
  className?: string;
}

export function createAnnotationElement({
  title,
  className
}: CreateAnnotationElementParams): Element {
  return {
    type: 'element',
    tagName: 'div',
    properties: {
      className: classnames('protosaurus-annotation-wrapper', className),
      'data-title': title
    },
    children: []
  };
}

// Separate annotation and comment annotation.
// Annotation is for annotations inside a pure line comment, whereas
// comment annotation is for code + comment.
export const COMMENT_ANNOTATION = '// [^';
export const ANNOTATION = '[^';

export interface Annotation {
  footnoteIndex: number;
  title: string;
  divWrapper: Element;
}

export function processAnnotationFooter({
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

export function processAnnotationParagraph({
  child,
  codeblockAnnotations
}: {
  child: Element;
  codeblockAnnotations: Annotation[];
}) {
  for (let j = 0; j < child.children.length; j++) {
    const paragraphChild = child.children[j];

    if (isText(paragraphChild) && paragraphChild.value.startsWith(ANNOTATION)) {
      const line = paragraphChild.value;
      const titleIndexBoundaryStart = line.indexOf(ANNOTATION) + 2;
      const titleIndexBoundaryEnd = line.indexOf(']', titleIndexBoundaryStart);

      const annotationTitle = line.slice(
        titleIndexBoundaryStart,
        titleIndexBoundaryEnd
      );

      // Create the container.
      const divWrapper = createAnnotationElement({
        title: annotationTitle,
        // Add a horizontal margin so it's not too condensed with
        // the characters to the side of it.
        className: 'mx-4'
      });
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