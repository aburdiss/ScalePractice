/*

Download this lib: https://www.npmjs.com/package/npm-license-crawler
I did it globally: `npm i npm-license-crawler -g`

Run this command to get the data
`npm-license-crawler --onlyDirectDependencies --json src/MoreStack/Licenses/licenses.json`

*/

import React from 'react';
import { View } from 'react-native';

import LicensesList from './LicensesList';
import { useDarkMode } from 'react-native-dynamic';
import { colors } from '../../Model/Model';

import Data from './licenses.json';
import { capitalize } from '../../utils/capitalize/capitalize';
import { useIdleScreen } from '../../utils/useIdleScreen/useIdleScreen';

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

  const reg = /((https?:\/\/)?(www\.)?github\.com\/)?(@|#!\/)?([A-Za-z0-9_-]{1,30})(\/([-a-z]{1,40}))?/i;

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

let licenseData = Object.keys(Data).map((key) => {
  let { licenses, ...license } = Data[key];

  let name, version;
  if (key[0] == '@') {
    [, name, version] = key.split('@');
  } else {
    [name, version] = key.split('@');
  }

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

sortDataByKey(licenseData, 'username');

/**
 * @description A wrapper for the LicensesList component that processes the
 * data and passes it in.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.2.0
 *
 * @component
 * @example
 * ```jsx
<Licenses />
```
 */
const Licenses = () => {
  useIdleScreen();

  const DARKMODE = useDarkMode();

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={{
        flex: 1,
        backgroundColor: DARKMODE ? colors.black : colors.systemGray2Light,
      }}
    >
      <LicensesList licenses={licenseData} />
    </View>
  );
};

export default Licenses;
