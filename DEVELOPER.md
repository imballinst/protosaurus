# Developing Guide

Before starting to develop Protosaurus, there are some things that might be important to know.

## Requirements

1. [Go 1.17.x](https://go.dev/doc/install).
2. CLI binaries: `bash`, `make`, `awk`, `tar`, `unzip`, and `curl`.
3. [Node.js® 16 LTS](https://nodejs.org/en).
4. [yarn 1 (Classic)](https://classic.yarnpkg.com/lang/en/).

## How to start

### Generating the required data

The entry file is the [Makefile](./Makefile) in the root of the project. Firstly, we need to generate the required files by doing `make gen`. What this command does is:

1. Read packages inside [`testdata`](./testdata) folder and generate a `doc.json` for each package. The generated `doc.json` resides in this [`website/generated folder`](./website/generated). The folder structure represents the package path, for example, `booking.v1` will become `booking/v1`.
2. Emit JavaScript files from TypeScript for the `mdx` module.
3. Generate MDX files from the generated `doc.json` within each generated package folder. The MDX files are located in `website/docs`. For well-known types, the MDX files are located in `website/docs/wkt`.
4. Generate JSON files from the generated `doc.json`, which will be used for the [`proto-messages`](website/docs/plugin/proto-messages) plugin. For each package, a JSON will be generated with the `{package_name}.json` (e.g. `booking.v1.json`), whereas all well-known types will be merged into a `wkt.json`.
5. Emit JavaScript files from TypeScript for the `proto-messages` plugin. The compiled JavaScript files reside in [website/plugins/proto-messages/lib](./website/plugins/proto-messages/lib). The index file will be referenced by [`docusaurus.config.js`](website/docusaurus.config.js).

### Starting the development server

Now that the required files have been generated, we can run this command inside the `website` folder to start the development server:

```
yarn start
```

### Building

To build, inside the `website` folder, run this command:

```
yarn build
```

## Developing `mdx` module

When we are developing the `mdx` module, perhaps we don't need to regenerate the `doc.json` files (unless we change the `.proto` files) using `make gen`. When we only want to re-generate the MDX and JSON files, we can do this in the root project:

```
make dev-gen-mdx
```

This will run the [`mdx/emit.ts`](./mdx/emit.ts) file using `ts-node`, so we don't have to emit JavaScript files inside `mdx/lib` during development.

## Developing `proto-messages` plugin

When we are developing the `proto-messages` plugin, the usual way to do it is to run `yarn start` inside the `website` folder. However, it can waste a bit of time if we change it frequently (especially if there are a lot of MDX files to process). In that case, instead of running Docusaurus development server, we can do this in the root project:

```
make dev-test-plugin
```

This will run the `test:mdx` script from the [`proto-messages/package.json` file](./website/plugins/proto-messages/package.json). This is a quicker way to verify the process or output of the plugin, so we don't have to run Docusaurus development server. To test the process, as usual, we can put `console.log`s or breakpoints. If we want to see the output, then we can uncomment the `console.log` in the [`test-remark` file](./website/plugins/proto-messages/test-remark.ts).
