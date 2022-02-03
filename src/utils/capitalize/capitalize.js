/**
 * @function capitalize
 * @description Capitalizes the first letter of the string passed in.
 * @param {string} inputString
 * @returns {string}
 * @author Alexander Burdiss
 * @since 9/11/21
 * @version 1.0.0
 */
export function capitalize(inputString) {
  if (typeof inputString !== 'string') {
    return undefined;
  }
  const firstLetter = inputString[0];
  const restOfString = inputString.slice(1);
  return `${firstLetter.toUpperCase()}${restOfString}`;
}
