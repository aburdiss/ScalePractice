/*

Download this lib: https://www.npmjs.com/package/npm-license-crawler
I did it globally: `npm i npm-license-crawler -g`

Run this command to get the data
`npm-license-crawler --onlyDirectDependencies --json licenses.json`

Paste that data into ./Licenses/data.js

*/

import React from 'react';

import LicensesList from './LicensesList';
import {useDarkMode} from 'react-native-dynamic';
import {colors} from '../../Model/Model';

import Data from './data';
import SafeAreaView from 'react-native-safe-area-view';
import {capitalize} from 'underscore.string';

/**
 * @function extractNameFromGithubUrl
 * @description Takes a url to a gitHub repository and returns the username of
 * the author of the software.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @version 1.0.1
 * @since 12/17/20
 * @param {String} url The GitHub url of a piece of software.
 * @returns {String} The GitHub username
 */
function extractNameFromGithubUrl(url) {
  if (!url) {
    return null;
  }

  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  const components = reg.exec(url);

  if (components && components.length > 5) {
    return components[5];
  }
  return null;
}

/**
 * @function sortDataByKey
 * @description Sorts the licenses data by key.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.1
 * @param {Array} data The list of licenses.
 * @param {String|Number} key An object key inside each member of data.
 * @returns {Array} A sorted version of the data array that is passed in.
 */
function sortDataByKey(data, key) {
  data.sort(function (a, b) {
    return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
  });
  return data;
}

let licenses = Object.keys(Data).map((key) => {
  let {licenses, ...license} = Data[key];
  let [name, version] = key.split('@');

  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_]{1,15})(\/([-a-z]{1,20}))?/i;
  let username =
    extractNameFromGithubUrl(license.repository) ||
    extractNameFromGithubUrl(license.licenseUrl);

  let userUrl;
  let image;
  if (username) {
    username = capitalize(username);
    image = `http://github.com/${username}.png`;
    userUrl = `http://github.com/${username}`;
  }

  return {
    key,
    name,
    image,
    userUrl,
    username,
    licenses: licenses.slice(0, 405),
    version,
    ...license,
  };
});

sortDataByKey(licenses, 'username');

/**
 * @description A wrapper for the LicensesList component that processes the
 * data and passes it in.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.1
 * 
 * @component
 * @example
 * ```jsx
<Licenses />
```
 */
const Licenses = () => {
  const DARKMODE = useDarkMode();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: DARKMODE ? colors.black : colors.systemGray2Light,
      }}>
      <LicensesList licenses={licenses} />
    </SafeAreaView>
  );
};

export default Licenses;
