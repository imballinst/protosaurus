# The code-runner API

The code runner is a sub-module of the `mdx` package that will be run against code blocks with a certain metastring tag (will be explained in later sections).

This document was last updated on March 9, 2022.

## Requirements

Test the commands and make sure they output the correct result (if any). If there is no result specified, ensure that they do not run into exit codes other than 1.

### Similar implementations

Similar implementations can be found, for example, the [Istio documentations](https://github.com/istio/istio.io/tree/master/content/en/docs/examples/bookinfo). It uses test file(s) per Markdown file.

### Adjustments/tweaks

I think the Istio documentation tests are a bit complicated (at least in my opinion). When a snippet changes in the Markdown file, we must be sure to change the `.sh` files as well. That leaves us with at least 3 files to update for a code block change.

I propose changes, as the following:

1. Instead of creating multiple `.sh` files, we will leave that off to the "code runner" module to generate the files containing the commands. We will use `validationId` metastring to indicate that the code block should be validated.
2. If there are outputs to be expected, then the `outputLines` metastring will be used as the "expected result".
3. If there are setups required before running the test, then the `preValidationScript` metastring will be used, indicating the script that needs to be run before the code block is validated (e.g. a server needs to be running in order the command to work properly).

For starter, I think we can start with each point.

## Specifications

### Targets

By default, the targets are all MDX files under `docs`. It should be configurable via the preset options. For example:

```js
{
  "mdxCodeValidationFolders": ["versioned_docs"]
}
```

This will target all files inside `versioned_docs` instead of `docs`.

### Metastring syntax

Inside a MDX file, the code blocks that will be validated are the ones with the `validationId` metastring. This ID is unique across **all Markdowns**, so make sure that it only has one occurrence in the entire documentation.

````md
```bash {outputLines:2} validationId="echo-test"
echo "123"
123
```
````

The line with the number specified in `outputLines` will not be considered as command. As such, the command here is `echo "123"`. In case of multiple lines for `bash` language, then the parser should try trimming lines with `\\n` (a backslash + a new line).

### Creating the test

To ensure the code is working normally, the commands not specified as output lines will be "stored". Using the example above, for the code block with the `validationId` with the value "echo-test" inside the file `tutorial/hello-world.mdx`, it will create a structure like the following in the `protosaurus` cache folder:

```
└── .protosaurus
    └── validate
        └── tutorial
            └── hello-world
                ├── .markdownfolder
                ├── tests
                │   └── echo-test
                └── outputs
                    └── echo-test
```

The code language will specify the file extension, which in this case, since it is `bash`, then it has no extension. There is also a `echo-test` file under `output` folder, which in this case, contains the `123` output.

## Running the code

Our runner will run every `tests` folder in every Markdown-related folder. In the case above, the steps are as the following:

1. Read directories recursively until it has reached the a folder with `.markdownfolder`.
2. Store the path to until the parent directory of the test/output file, e.g. `tutorial/hello-world`. For a more nested directory, then the value will be different.
3. If the code block has this `preValidationScript`, ensure that it is executed first before the command. This script is relative to the `{DOCUSAURUS_PATH}/scripts`.
4. For every test file, check their extension and run the test accordingly.
5. If it has a "pair output" file, then ensure to read that output file and match the `stdout` from the test file execution.

## Storing result

The result will be stored under the `validate` folder directly, named `validate/results.json`. The content is as the following:

```json
{
  "echo-test": true
}
```

The more code blocks are being validated, the more content will exist in the JSON file.

## Reading result

The rehype plugin will have this `context.pathToResultJson`, which contain the required detail when parsing the HAST. We just need to read the metastring, check if it has `validationId`, and if it is, then we check whether the result is `true` or `false`.

If the result is `true`, then we render a HAST of a checklist, otherwise we render a close/times icon.

### Concerns

The amount of synchronous file reads perhaps can be concerning. As starter, we will have this `json` variable outside of the rehype function. If it is `undefined`, only then we will read from the JSON result file. It's still unknown whether the file-scoped variable will be reset or not, but I think it's a good start.
