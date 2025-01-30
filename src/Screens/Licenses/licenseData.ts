import rawLicenseData from './licenses.json';
import { capitalize } from '../../utils';

import { extractNameFromGithubUrl } from './utils/extractNameFromGithubUrl';
import { sortDataByKey } from './utils/sortDataByKey';

let licenseData = Object.keys(rawLicenseData).map((key) => {
  // @ts-ignore
  let { licenses, ...license } = rawLicenseData[key];

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

licenseData = sortDataByKey(licenseData, 'username');

export { licenseData };
