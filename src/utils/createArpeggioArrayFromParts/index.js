import { translate } from '../../Translations/TranslationModel';
import { shuffle } from '../../utils';

/**
 * @function ArpeggioPractice~createArpeggioArrayFromParts
 * @description Constructs the arpeggio name and arpeggio note together to
 * form one string to display on the screen.
 * @author Alexander Burdiss
 * @since 10/12/20
 * @version 1.0.2
 *
 * @returns {string[]} array of all transpositions of a scale
 */
export function createArpeggioArrayFromParts(scaleName) {
  const letterNames = [
    'C',
    'C♯',
    'D',
    'E♭',
    'E',
    'F',
    'F♯',
    'G',
    'A♭',
    'A',
    'B♭',
    'B',
  ];

  let allLetterNamesOfScale = [];
  for (let letter of letterNames) {
    allLetterNamesOfScale.push(`${letter} ${translate(scaleName)}`);
  }
  allLetterNamesOfScale = shuffle(allLetterNamesOfScale);
  return allLetterNamesOfScale;
}
