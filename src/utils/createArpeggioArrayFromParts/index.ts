import { translate } from '../../Translations/TranslationModel';
import { shuffle } from '..';
import { indeterminantLetterNames } from '../../Model/Model';

/**
 * @function createArpeggioArrayFromParts
 * @description Constructs the arpeggio name and arpeggio note together to
 * form one string to display on the screen.
 * Created 10/12/20 by Alexander Burdiss
 * @param {string} arpeggioName The name of the arpeggio to create an array of
 * all possible arpeggios for.
 * @returns {string[]} An array with all 12 keys of arpeggio that was passed in.
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 2/1/25
 * @version 1.0.3
 */
export function createArpeggioArrayFromParts(arpeggioName: string): string[] {
  let allLetterNamesOfArpeggio = [];
  for (let letter of indeterminantLetterNames) {
    allLetterNamesOfArpeggio.push(`${letter} ${translate(arpeggioName)}`);
  }
  allLetterNamesOfArpeggio = shuffle(allLetterNamesOfArpeggio);
  return allLetterNamesOfArpeggio;
}
