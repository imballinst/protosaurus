export interface StoredValue {
  language: string;
  content: string;
  output: string;
  isValid: boolean;
}

// The first key is the path to file.
// The second key is the code block validation ID.
// The value is the code block contents.
// For example:
//
// {
//   "path/to/file": {
//     "hello-world": "echo \"Hello world!\""
//   }
// }
export type PathAndCodeBlocksRecord = Record<string, StoredValue>;
