import { translate } from '../../Translations/TranslationModel';
import { shuffle } from '..';

/**
 * @function createScaleArrayFromParts
 * @description Constructs the scale name and scale note together to form one
 * string to display on the screen.
 * Created 10/12/20 by Alexander Burdiss
 * @param {string[]} letterNames All possible note letter names
 * @param {string[]} scaleNames All possible scale names
 * @returns {string[]} array of all transpositions of a scale
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/1/25
 * @version 2.0.1
 */
export function createScaleArrayFromParts(
  letterNames: string[],
  scaleNames: string[],
): string[] {
  let allLetterNamesOfScale = [];
  for (let letter of letterNames) {
    for (let scaleName of scaleNames) {
      allLetterNamesOfScale.push(`${letter} ${translate(scaleName)}`);
    }
  }
  allLetterNamesOfScale = shuffle(allLetterNamesOfScale);
  return allLetterNamesOfScale;
}
