import { translate } from '../../Translations/TranslationModel';
import { shuffle } from '..';
import { indeterminantLetterNames } from '../../Model/Model';

/**
 * @function createArpeggioArrayFromParts
 * @description Constructs the arpeggio name and arpeggio note together to
 * form one string to display on the screen.
 * @author Alexander Burdiss
 * @since 10/12/20
 * @version 1.0.2
 *
 * @returns {string[]} array of all transpositions of a scale
 */
export function createArpeggioArrayFromParts(scaleName: string): string[] {
  let allLetterNamesOfScale = [];
  for (let letter of indeterminantLetterNames) {
    allLetterNamesOfScale.push(`${letter} ${translate(scaleName)}`);
  }
  allLetterNamesOfScale = shuffle(allLetterNamesOfScale);
  return allLetterNamesOfScale;
}
