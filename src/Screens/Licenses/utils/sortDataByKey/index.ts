/**
 * @function sortDataByKey
 * @memberof Licenses
 * @description Sorts the licenses data by key.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * Created 12/17/2020
 * @param {Object[]} data The list of licenses.
 * @param {string|number} key An object key inside each member of data.
 * @returns {Object[]} A sorted version of the data array that is passed in.
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/30/25
 * @version 1.0.2
 */
export function sortDataByKey(data: { [key: string]: any }[], key: string) {
  const tempData = [...data];
  tempData.sort(function (a, b) {
    return a[key] > b[key] ? 1 : b[key] > a[key] ? -1 : 0;
  });
  return tempData;
}
