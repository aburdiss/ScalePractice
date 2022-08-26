import { translate } from "../../Translations/TranslationModel";
import { shuffle } from "../../utils";

/**
 * @function createScaleArrayFromParts
 * @description Constructs the scale name and scale note together to form one
 * string to display on the screen.
 * @author Alexander Burdiss
 * @since 10/12/20
 * @version 2.0.0
 *
 * @param {string[]} letterNames
 * @param {string[]} scaleNames
 * @returns {string[]} array of all transpositions of a scale
 */
export function createScaleArrayFromParts(letterNames, scaleNames) {
  let allLetterNamesOfScale = [];
  for (let letter of letterNames) {
    for (let scaleName of scaleNames) {
      allLetterNamesOfScale.push(`${letter} ${translate(scaleName)}`);
    }
  }
  allLetterNamesOfScale = shuffle(allLetterNamesOfScale);
  return allLetterNamesOfScale;
}
