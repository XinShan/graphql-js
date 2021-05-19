'use strict';

const fs = require('fs');

const { version } = require('../package.json');

const versionMatch = /^(\d+)\.(\d+)\.(\d+)-?(.*)?$/.exec(version);
if (!versionMatch) {
  throw new Error('Version does not match semver spec: ' + version);
}

const [, major, minor, patch, preReleaseTag] = versionMatch;

const body = `
// Note: This file is autogenerated using "resources/gen-version.js" script and
// automatically updated by "npm version" command.

/**
 * A string containing the version of the GraphQL.js library
 */
export const version = '${version}';

/**
 * An object containing the components of the GraphQL.js version string
 */
export const versionInfo = Object.freeze({
  major: ${major},
  minor: ${minor},
  patch: ${patch},
  preReleaseTag: ${preReleaseTag ? `'${preReleaseTag}'` : 'null'},
});
`;

if (require.main === module) {
  fs.writeFileSync('./src/version.js', body.trim() + '\n');
}
