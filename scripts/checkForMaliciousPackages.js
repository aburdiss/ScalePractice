#!/usr/bin/env node
// checkForMaliciousPackages.js
// Version 2.0.0
// Created June 15 2022 by Alexander Burdiss
// Last Modified 9/6/22 by Alexander Burdiss
const fs = require("fs");
const { execSync } = require("child_process");
const semver = require("semver");
const { dependencies, devDependencies } = require("../package.json");
const packageDependencies = { ...dependencies, ...devDependencies };

const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const GREEN = "\x1b[32m";
const NOCOLOR = "\x1b[0m";

const maliciousPackages = {
  colors: ["1.4.1", "*"],
  "discord-lofy": ["11.5.1", "*"],
  "discord-selfbot-v14": ["12.0.3", "*"],
  "discord-vilao": ["1.0.0", "*"],
  discordsystem: ["11.5.1", "*"],
  "es5-ext": ["0.10.54", "*"],
  "event-source-polyfill": ["1.0.26", "*"],
  faker: ["6.6.6", "*"],
  "fix-error": ["1.0.0", "*"],
  "mrg-message-broker": ["9998.987.376", "*"],
  "node-ipc": ["10.1.1", "*"],
  "octavius-public": ["1.836.609", "*"],
  peacenotwar: ["0.0.0", "*"],
  "prerequests-xcode": ["1.0.4", "*"],
  "styled-components": ["5.3.4", "*"],
  "ua-parser-js": ["0.7.29", "0.7.29"],
  "wafer-autocomplete": ["1.25.0", "*"],
  "wafer-beacon": ["1.3.3", "*"],
  "wafer-bind": ["1.1.2", "*"],
  "wafer-caas": ["1.14.20", "*"],
  "wafer-form": ["1.30.1", "*"],
  "wafer-geolocation": ["1.2.10", "*"],
  "wafer-image": ["1.2.2", "*"],
  "wafer-lightbox": ["1.5.4", "*"],
  "wafer-toggle": ["1.15.4", "*"],
};

main();

async function main() {
  // Get all potential package issues from package-lock.json
  const potentialMaliciousPackages = [];
  // Read packageLock as a string, so you can go line by line.
  const packageLock = fs
    .readFileSync("package-lock.json")
    .toString()
    .split("\n");
  // Read the packageLock as a JSON object in case you need to get the version
  // of a directly installed dependency.
  const packageLockJson = JSON.parse(
    fs.readFileSync("package-lock.json").toString()
  );
  packageLock.forEach((line) => {
    Object.keys(maliciousPackages).forEach(function filterPackages(thePackage) {
      if (line.includes(`"${thePackage}": "`)) {
        const [, name, , version] = line.trim().split('"');
        potentialMaliciousPackages.push({ [name]: version });
      } else if (line.includes(`"${thePackage}": {`)) {
        const version = packageLockJson.dependencies[thePackage].version;
        potentialMaliciousPackages.push({ [thePackage]: version });
      }
    });
  });

  const notInstalledPackagesWarned = [];
  const notLockedPackagesWarned = [];
  const lockedPackagesWarned = [];

  potentialMaliciousPackages.forEach((thePackage) => {
    const packageName = Object.keys(thePackage)[0];
    const installedVersion = packageDependencies[packageName];
    const [minBadVersion, maxBadVersion] = maliciousPackages[packageName];

    // Bad Package was found, and not in package.json
    if (
      installedVersion === undefined &&
      !notInstalledPackagesWarned.includes(
        packageName + thePackage[packageName]
      )
    ) {
      notInstalledPackagesWarned.push(packageName + thePackage[packageName]);
      console.error(
        `${RED}ERROR: Package ${YELLOW}${packageName}${RED} has been identified as Malware. It has been installed as a sub-dependency of this project. Please, lock this package in package.json to protect our software.
${NOCOLOR}Version Needed: ${packageName}@${thePackage[packageName]}
${YELLOW}First compromised version: ${minBadVersion}
${maxBadVersion !== "*" ? `Last compromised version:  ${maxBadVersion}` : ""}
${NOCOLOR}`
      );
    }

    // Package is installed, but not locked
    if (
      installedVersion &&
      containsSpecialCharacters(installedVersion) &&
      !notLockedPackagesWarned.includes(packageName)
    ) {
      notLockedPackagesWarned.push(packageName);
      console.error(
        `${RED}ERROR: Package ${YELLOW}${packageName}${RED} has been identified as Malware. It has been installed as a direct dependency of this project. If you are trying to lock this version, remove any special characters around the version to lock a specific version. If you are using this package intentionally, FIND ANOTHER PACKAGE.`
      );
    }

    // Package is locked, but the version is in the bad package range
    if (
      installedVersion &&
      !containsSpecialCharacters(installedVersion) &&
      !lockedPackagesWarned.includes(packageName)
    ) {
      function throwError() {
        lockedPackagesWarned.push(packageName);
        console.error(
          `${RED}ERROR: Package ${YELLOW}${packageName}${RED} has been identified as Malware. It has been locked, but the locked version appears to be compromised. Please, change the locked verion to an acceptable version, or remove the dependency.
Current Installed Version: ${installedVersion}
${YELLOW}First compromised version: ${minBadVersion}
${maxBadVersion !== "*" ? `Last compromised version:  ${maxBadVersion}` : ""}
${NOCOLOR}`
        );
      }
      if (maxBadVersion === "*") {
        const isBadVersion = semver.gte(
          semver.clean(installedVersion.replace("^", "")),
          semver.clean(minBadVersion.replace("^"))
        );
        if (isBadVersion) {
          throwError();
        }
      } else {
        const isBadVersion = semver.satisfies(
          semver.clean(installedVersion.replace("^", "")),
          `${semver.clean(minBadVersion)} - ${semver.clean(maxBadVersion)}`
        );
        if (isBadVersion) {
          throwError();
        }
      }
    }
  });

  // Packages correctly installed, and correclty locked. We still want to know
  // what they are so we can try to remove them in the future. This warning
  // just prints to the console, and doesn't give a non-zero exit code.
  const installedPackagesWarned = [];
  potentialMaliciousPackages.forEach((thePackage) => {
    const packageName = Object.keys(thePackage)[0];
    if (!installedPackagesWarned.includes(packageName)) {
      installedPackagesWarned.push(packageName);
      console.warn(
        `${YELLOW}Warning: "${packageName}" is safely installed, but some versions contain malware.${NOCOLOR}`
      );
      execSync(`npm list ${packageName}`, { stdio: "inherit" });
    }
  });

  function containsSpecialCharacters(text) {
    if (text) {
      return text.includes("^") || text.includes("~");
    }
    return false;
  }

  // break script if there are issues
  if (
    lockedPackagesWarned.length ||
    notLockedPackagesWarned.length ||
    notInstalledPackagesWarned.length
  ) {
    console.error(
      `${RED}Issues detected with dependencies. Please resolve and retry your action.${NOCOLOR}`
    );
    process.exit(1);
  }
  console.log(`${GREEN}No malicious packages detected${NOCOLOR}`);
  process.exit(0);
}
