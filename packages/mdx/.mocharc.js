"use strict";

// This is a JavaScript-based config file containing every Mocha option plus others.
// If you need conditional logic, you might want to use this type of config,
// e.g. set options via environment variables 'process.env'.
// Otherwise, JSON or YAML is recommended.

module.exports = {
  diff: true,
  // For some reasons we cannot use `global` field for `test` etc.
  // We need to add them to `global.test` in the `setup-test.js` file.
  file: ["./setup-test.js"],
  spec: ["lib/**/*.test.ts"],
  require: "ts-node/register",
};
