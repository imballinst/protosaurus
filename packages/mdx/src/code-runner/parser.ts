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

// TODO(imballinst): this is copy-pasted from packages/rehype-plugin-codeblock/src/hast/parser.ts.
// Next, we need to create a common package that can be referenced via TypeScript tsconfig.json.

const TITLE_TOKEN = 'title="';
const COLLAPSIBLE_TOKEN = 'collapsible';
const VALIDATION_ID_TOKEN = 'validationId="';
const OUTPUT_LINES_TOKEN = 'outputLines={';

export interface MetastringInfo {
  title: string;
  validationId: string;
  outputLines: number[];
  isCollapsible: boolean;
  highlightedLines: number[];
}

// The reason this function is made is because,
// Protosaurus language isn't identified in Prismjs, and the metadata
// parsing is mostly done in Prismjs (e.g. code title).
//
// Available metas:
// --> collapsible (for wrapping the snippet with <details> and <summary>)
// --> title (for code title)
// --> {num,num,num} (for highlighting)
export function parseMetastring(
  metastringParam: string,
  codeContent: string
): MetastringInfo {
  let metastring = metastringParam;
  // Parse title, if any.
  const titleIndices = getTitleIndicesFromMetastring(metastring);
  let title = '';

  if (titleIndices.start > -1) {
    title = metastring.slice(titleIndices.startWithToken, titleIndices.end);
    metastring = removeStringMarkedByIndices(
      metastring,
      titleIndices.start,
      titleIndices.end
    );
  }

  // Parse validation ID.
  const validationIdStartIndex = metastring.indexOf(VALIDATION_ID_TOKEN);
  let validationId = '';

  if (validationIdStartIndex > -1) {
    // For example: we want to extract the `validationId` value from:
    // ```protosaurus--booking.v1.Booking title="Hello world" validationId="hello-world"
    // Hence, we need to take the index after `validationId="`.
    const idStartIdx = validationIdStartIndex + VALIDATION_ID_TOKEN.length;
    const idEndIdx = metastring.indexOf('"', idStartIdx);
    validationId = metastring.slice(idStartIdx, idEndIdx);

    metastring = removeStringMarkedByIndices(metastring, idStartIdx, idEndIdx);
  }

  // Parse output lines.
  const outputLines: number[] = [];
  const lineOutputStartIndex = metastring.indexOf(OUTPUT_LINES_TOKEN);

  if (lineOutputStartIndex > -1) {
    const lineOutputEndIndex = metastring.indexOf('}', lineOutputStartIndex);
    const segments = metastring
      .slice(
        lineOutputStartIndex + OUTPUT_LINES_TOKEN.length,
        lineOutputEndIndex
      )
      .split(',');

    for (const segment of segments) {
      outputLines.push(...getEffectiveLineNumbers(segment));
    }

    metastring = removeStringMarkedByIndices(
      metastring,
      lineOutputStartIndex,
      lineOutputEndIndex
    );
  }

  // Parse collapsible.
  let isCollapsible = false;

  const collapsibleIdx = metastring.indexOf(COLLAPSIBLE_TOKEN);
  if (collapsibleIdx > -1) {
    isCollapsible = true;
    metastring = removeStringMarkedByIndices(
      metastring,
      collapsibleIdx,
      collapsibleIdx + COLLAPSIBLE_TOKEN.length
    );
  }

  // If it is collapsible but does not have title, then throw an error.
  // This is because, we need a title for the <summary> tag.
  if (isCollapsible && title === '') {
    throw new Error(
      `When collapsible meta is set on code block, title should also be set. Error happens near: ${codeContent}`
    );
  }

  // Parse highlight lines.
  // The format is as the following:
  //
  // {1}, or {1,3}, or {1,3,5-9}
  //
  // For the segments with the dash, it means range.
  // Hence, 5-9 means 5,6,7,8,9.
  const highlightedLines: number[] = [];
  const lineHighlightStartIndex = metastring.indexOf('{');

  if (lineHighlightStartIndex > -1) {
    const lineHighlightEndIndex = metastring.indexOf(
      '}',
      lineHighlightStartIndex
    );
    const segments = metastring
      .slice(lineHighlightStartIndex + 1, lineHighlightEndIndex)
      .split(',');

    for (const segment of segments) {
      highlightedLines.push(...getEffectiveLineNumbers(segment));
    }
  }

  return {
    title,
    validationId,
    outputLines,
    isCollapsible,
    highlightedLines
  };
}

// Helper functions.
function getTitleIndicesFromMetastring(metastring: string) {
  // Parse title, if any.
  const start = metastring.indexOf(TITLE_TOKEN);
  const startWithToken = start + TITLE_TOKEN.length;
  const end = metastring.indexOf('"', startWithToken);

  return { start, startWithToken, end };
}

function removeStringMarkedByIndices(str: string, start: number, end: number) {
  return str.slice(0, start).concat(str.slice(end));
}

function getEffectiveLineNumbers(segment: string): number[] {
  const numbers: number[] = [];
  const trimmed = segment.trim();

  if (trimmed.includes('-')) {
    // "Expand" ranges.
    const segmentArray = trimmed.split('-');
    const start = Number(segmentArray[0]);
    const end = Number(segmentArray[1]);

    // Push all number from the range.
    for (let i = start; i <= end; i++) {
      // It's -1 because we want to address array indices.
      numbers.push(i - 1);
    }
  } else {
    // Push one number.
    // It's -1 because we want to address array indices.
    numbers.push(Number(trimmed) - 1);
  }

  return numbers;
}
