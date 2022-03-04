import { Element } from 'hast-format';

const TITLE_TOKEN = 'title="';
const COLLAPSIBLE_TOKEN = 'collapsible';

export interface MetastringInfo {
  title: string;
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
  const titleStartIdx = metastring.indexOf(TITLE_TOKEN);
  const titleEndIdx = metastring.indexOf(
    '"',
    titleStartIdx + TITLE_TOKEN.length
  );
  let title = '';

  if (titleStartIdx > -1 && titleEndIdx > -1) {
    const titleIdxPlusToken = titleStartIdx + TITLE_TOKEN.length;

    title = metastring.slice(titleIdxPlusToken, titleEndIdx);
    metastring = metastring
      .slice(0, titleIdxPlusToken)
      .concat(metastring.slice(titleEndIdx + 1));
  }

  // Parse collapsible.
  let isCollapsible = false;

  const collapsibleIdx = metastring.indexOf(COLLAPSIBLE_TOKEN);
  if (collapsibleIdx > -1) {
    isCollapsible = true;
    metastring = metastring
      .slice(0, collapsibleIdx)
      .concat(metastring.slice(collapsibleIdx + COLLAPSIBLE_TOKEN.length));
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
      if (segment.includes('-')) {
        // "Expand" ranges.
        const segmentArray = segment.split('-');
        const start = Number(segmentArray[0]);
        const end = Number(segmentArray[1]);

        // Push all number from the range.
        for (let i = start; i <= end; i++) {
          // It's -1 because we want to address array indices.
          highlightedLines.push(i - 1);
        }
      } else {
        // Push one number.
        // It's -1 because we want to address array indices.
        highlightedLines.push(Number(segment) - 1);
      }
    }
  }

  return {
    title,
    isCollapsible,
    highlightedLines
  };
}

export function stripTitleFromElementProperties(
  properties: Element['properties']
) {
  if (properties === undefined) {
    // Exit early.
    return undefined;
  }

  const keys = Object.keys(properties);
  const titleIdx = keys.indexOf('title');
  if (titleIdx === -1) {
    // Exit early when no title key is found.
    return properties;
  }

  // Here, we need to do 2 things.
  // The first one is, we need to delete the title-related keys.
  // It is contained in `metastring`, `title`, and one key after `title`.
  // For more information, please see the properties example in the test file.
  const newProperties = { ...properties };
  const titleEndIdx = titleIdx + 1;
  // Delete the title-related keys.
  delete newProperties[keys[titleIdx]];
  delete newProperties[keys[titleEndIdx]];

  // Also trim it from the metastring.
  const metastring = newProperties.metastring || '';
  const metastringTitleIdx = metastring.indexOf(TITLE_TOKEN);
  // Only try to trim it when we find the TITLE_TOKEN substring, which most likely
  // exists, if things are working normally in the remark/rehype transformer.
  if (metastringTitleIdx > -1) {
    const metaStringTitleEndIdx = metastring.indexOf(
      '"',
      metastringTitleIdx + TITLE_TOKEN.length
    );

    // Do a preventive slicing. This covers 3 cases:
    //
    // 1. title at the start of the string
    // 2. title in the middle of the string
    // 3. title at the end of the string
    newProperties.metastring = metastring
      .slice(0, metastringTitleIdx)
      .concat(metastring.slice(metaStringTitleEndIdx + 1))
      .trim();
  }

  return newProperties;
}
