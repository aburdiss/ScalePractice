const fs = require('fs');
const semver = require('semver');
const { dependencies, devDependencies } = require('../package.json');
const packageDependencies = { ...dependencies, ...devDependencies };

const maliciousPackages = {
  // https://snyk.io/blog/peacenotwar-malicious-npm-node-ipc-package-vulnerability/
  'node-ipc': ['10.1.1', '10.1.3'],
  // https://arstechnica.com/information-technology/2021/12/malicious-packages-sneaked-into-npm-repository-stole-discord-tokens/
  'prerequests-xcode': ['1.0.4', '*'],
  'discord-selfbot-v14': ['12.0.3', '*'],
  'discord-lofy': ['11.5.1', '*'],
  discordsystem: ['11.5.1', '*'],
  'discord-vilao': ['1.0.0', '*'],
  'fix-error': ['1.0.0', '*'],
  'wafer-bind': ['1.1.2', '*'],
  'wafer-autocomplete': ['1.25.0', '*'],
  'wafer-beacon': ['1.3.3', '*'],
  'wafer-caas': ['1.14.20', '*'],
  'wafer-toggle': ['1.15.4', '*'],
  'wafer-geolocation': ['1.2.10', '*'],
  'wafer-image': ['1.2.2', '*'],
  'wafer-form': ['1.30.1', '*'],
  'wafer-lightbox': ['1.5.4', '*'],
  'octavius-public': ['1.836.609', '*'],
  'mrg-message-broker': ['9998.987.376', '*'],
  // https://www.bleepingcomputer.com/news/security/dev-corrupts-npm-libs-colors-and-faker-breaking-thousands-of-apps/
  colors: ['1.4.1', '*'],
  faker: ['6.6.6', '*'],
};

const protestwarePackages = {
  // https://www.npmjs.com/package/peacenotwar
  peacenotwar: ['0.0.0', '*'],
  // https://github.com/styled-components/styled-components/issues/3706
  'styled-components': ['5.3.4', '*'],
  // https://github.com/medikoo/es5-ext/commit/5cce43a554e099aefcaf005209c8f8d64b6c6ae5
  'es5-ext': ['0.10.54', '*'],
  // https://github.com/Yaffle/EventSource/commit/de137927e13d8afac153d2485152ccec48948a7a
  'event-source-polyfill': ['1.0.26', '*'],
  // https://snyk.io/blog/peacenotwar-malicious-npm-node-ipc-package-vulnerability/
  'node-ipc': ['10.1.3', '*'],
};

// Get all potential package issues from package-lock.json
let potentialProtestwarePackages = [];
let potentialMaliciousPackages = [];
const packageLock = fs.readFileSync('package-lock.json').toString().split('\n');
packageLock.forEach((line) => {
  Object.keys(protestwarePackages).forEach(function filterPackages(thePackage) {
    if (line.includes(`"${thePackage}": "`)) {
      const [, name, , version] = line.trim().split('"');
      potentialProtestwarePackages.push({ [name]: version });
    }
  });
  Object.keys(maliciousPackages).forEach(function filterPackages(thePackage) {
    if (line.includes(`"${thePackage}": "`)) {
      const [, name, , version] = line.trim().split('"');
      potentialMaliciousPackages.push({ [name]: version });
    }
  });
});

const TYPES = {
  Malware: 'Malware',
  Protestware: 'Protestware',
};

let issueCount = 0;

checkForMaliciousPackage(potentialProtestwarePackages, TYPES.Protestware);
checkForMaliciousPackage(potentialMaliciousPackages, TYPES.Malware);

function checkForMaliciousPackage(potentialPackages, type) {
  // Check if versions are above issue versions
  potentialPackages.forEach((thePackage) => {
    const packageName = Object.keys(thePackage)[0];
    const lockedVersion = packageDependencies[packageName];
    // eslint-disable-next-line eqeqeq
    if (lockedVersion == undefined) {
      console.error(
        `ERR: Unlocked ${type} packages found: ${packageName}@${thePackage[packageName]}`,
      );
    } else {
      const installedVersion = thePackage[packageName];
      const [minBadVersion, maxBadVersion] = {
        [TYPES.Protestware]: protestwarePackages,
        [TYPES.Malware]: maliciousPackages,
      }[type][packageName];

      if (maxBadVersion === '*') {
        const isBadVersion = semver.gte(
          semver.clean(installedVersion.replace('^', '')),
          semver.clean(minBadVersion.replace('^')),
        );
        if (isBadVersion) {
          throwError();
        }
      } else {
        const isBadVersion = semver.satisfies(
          semver.clean(installedVersion.replace('^', '')),
          `${semver.clean(minBadVersion)} - ${semver.clean(maxBadVersion)}`,
        );
        if (isBadVersion) {
          throwError();
        }
      }

      function throwError() {
        issueCount++;
        console.log(
          {
            // Red
            [TYPES.Malware]: '\x1b[31m',
            // Yellow
            [TYPES.Protestware]: '\x1b[33m',
          }[type],
        );
        console.error(
          type + ' discovered: ' + packageName + '@' + installedVersion,
        );
        console.log('To fix, lock this version below ' + minBadVersion);
        if (maxBadVersion != '*') {
          console.log('or above version ' + minBadVersion);
        }
        // Reset
        console.log('\x1b[0m');
      }
    }
  });
}

// Handle breaking script if there are issues.
if (issueCount > 0) {
  console.error(
    'Issues detected with dependencies. Please resolve and retry your action.',
  );
  process.exit(1);
}
process.exit(0);
