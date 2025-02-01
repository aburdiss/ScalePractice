/**
 * @function capitalize
 * @description Capitalizes the first letter of the string passed in.
 * Created 9/11/21 by Alexander Burdiss
 * @param {string} inputString A string to have the first letter capitalized in
 * @returns {string} The exact same string that was passed in, but with the
 * first letter capitalized.
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/1/25
 * @version 1.0.1
 */
export function capitalize(inputString: string): string {
  const firstLetter = inputString[0];
  const restOfString = inputString.slice(1);
  return `${firstLetter.toUpperCase()}${restOfString}`;
}
