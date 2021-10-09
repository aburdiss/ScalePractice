import { translate } from '../../Translations/TranslationModel';
import { shuffle } from 'underscore';

/**
 * @function createScaleArrayFromParts
 * @description Constructs the scale name and scale note together to form one
 * string to display on the screen.
 * @author Alexander Burdiss
 * @since 10/12/20
 * @version 2.0.0
 *
 * @param {[String]} letterNames
 * @param {[String]} scaleNames
 * @returns {[String]} array of all transpositions of a scale
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

/**
 * @function ArpeggioPractice~createArpeggioArrayFromParts
 * @description Constructs the arpeggio name and arpeggio note together to
 * form one string to display on the screen.
 * @author Alexander Burdiss
 * @since 10/12/20
 * @version 1.0.2
 *
 * @returns {[String]} array of all transpositions of a scale
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
