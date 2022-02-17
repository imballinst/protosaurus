# Developing Guide

Before starting to develop Protosaurus, there are some things that might be important to know.

## Requirements

1. [Go 1.17.x](https://go.dev/doc/install).
2. CLI binaries: `bash`, `make`, `awk`, `tar`, `unzip`, and `curl`.
3. [Node.js® 16 LTS](https://nodejs.org/en).
4. [yarn 1 (Classic)](https://classic.yarnpkg.com/lang/en/).

## How to start

### Generating the required data

The entry file is the [Makefile](./Makefile) in the root of the project. Firstly, we need to generate the required files by doing:

```
make gen
```

What the command above does is:

1. Read packages inside [`testdata`](./testdata) folder and generate a `doc.json` for each package. The generated `doc.json` resides in this [`website/generated folder`](./website/generated). The folder structure represents the package path, for example, `booking.v1` will become `booking/v1`. As for well-known types, they are emitted to [`packages/wkt`](./packages/wkt/generated).
2. Install the dependencies of all workspaces
3. Copy the well-known types to [`website/generated folder`](./website/generated).
4. Emit JavaScript files from TypeScript for the TypeScript packages inside `packages`.

### Starting the development server

Now that the required files have been generated, we can run this command in the root project to start the development server:

```
make start
```

### Building

To build, in the root project, run this command:

```
make docs
```

## Developing `rehype-plugin-protosaurus-codeblock`

When we are developing `rehype-plugin-protosaurus-codeblock`, one way to test if we are processing MDXAST syntax correctly, we can do this in the root project:

```
make dev-test-mdx-plugin
```

This will run the [`test-remark.ts`](./packages/rehype-plugin-protosaurus-codeblock/test-remark.ts) file using `ts-node`. It will then emit files to [`website/docs`](./website/docs).

## Developing `protosaurus-plugin-mdx` plugin

When we are developing `protosaurus-plugin-mdx`, one way to test if we are emitting correct MDX files, we can do this in the root project:

```
make dev-test-plugin
```

This will run the `emit:test` script from the [`protosaurus-plugin-mdx` package](./packages/protosaurus-plugin-mdx). This is a quicker way to verify the MDX output, so we don't have to run Docusaurus development server. To test the process, as usual, we can put `console.log`s or breakpoints. If we want to see the output, then we can uncomment the `console.log` in the [`test-remark` file](./packages/rehype-plugin-protosaurus-codeblock/test-remark.ts).
