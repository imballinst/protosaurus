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

import { Element } from 'hast-format';
import { LinkMatch, PartialSpecific, TextMatchField } from './types';

export function getHastElementType(
  match: PartialSpecific<TextMatchField, 'position'> | LinkMatch
): Element {
  const { name, href } = match;

  if (isImageMatch(match)) {
    return {
      type: 'element' as const,
      tagName: 'button',
      properties: {
        'data-image-src': href,
        'data-image-alt': name,
        className: 'button-text protosaurus-image-toggle-button'
      },
      children: [
        {
          type: 'text' as const,
          value: name
        },
        getImageSvgIcon()
      ]
    };
  }

  if (href) {
    return {
      type: 'element' as const,
      tagName: 'a',
      properties: {
        href
      },
      children: [
        {
          type: 'text' as const,
          value: name
        }
      ]
    };
  }

  return {
    type: 'element' as const,
    tagName: 'span',
    properties: {
      className: 'type'
    },
    children: [
      {
        type: 'text',
        value: name
      }
    ]
  };
}

// Helper functions.
function isImageMatch(
  match: PartialSpecific<TextMatchField, 'position'> | LinkMatch
): match is LinkMatch {
  return match.type === 'image';
}

function getImageSvgIcon(): Element {
  // Source element: https://react-icons.github.io/react-icons/icons?name=fa (FaImage).
  // <svg
  //   stroke="currentColor"
  //   fill="currentColor"
  //   stroke-width="0"
  //   viewBox="0 0 512 512"
  //   height="1em"
  //   width="1em"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <path d="M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z"></path>
  // </svg>
  return {
    type: 'element',
    tagName: 'svg',
    properties: {
      stroke: 'currentColor',
      fill: 'currentColor',
      strokeWidth: '0',
      viewBox: '0 0 512 512',
      height: '1em',
      width: '1em',
      xmlns: 'http://www.w3.org/2000/svg'
    },
    children: [
      {
        type: 'element',
        tagName: 'path',
        properties: {
          d: 'M464 448H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v288c0 26.51-21.49 48-48 48zM112 120c-30.928 0-56 25.072-56 56s25.072 56 56 56 56-25.072 56-56-25.072-56-56-56zM64 384h384V272l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L208 320l-55.515-55.515c-4.686-4.686-12.284-4.686-16.971 0L64 336v48z'
        },
        children: []
      }
    ]
  };
}
