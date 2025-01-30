import { createArpeggioArrayFromParts } from '../../../../utils';

/**
 * @function getAllArpeggiosFromState
 * @memberof Random
 * @description This function will create an array of all the possible arpeggios
 * based on the selected arpeggios from state.
 * Created 10/8/2022
 * @param {Object} arpeggioOptions The options stored in state.
 * @returns {string[]} An array of all the possible arpeggios based on the
 * passed in state.
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/30/25
 * @version 1.0.0
 * @example const arpeggios = getAllArpeggiosFromState(state.arpeggioOptions);
 */
export function getAllArpeggiosFromState(arpeggioOptions: {
  [key: string]: boolean;
}): string[] {
  let possibleArpeggios = [];

  if (arpeggioOptions.major) {
    possibleArpeggios.push(...createArpeggioArrayFromParts('Major'));
  }
  if (arpeggioOptions.minor) {
    possibleArpeggios.push(...createArpeggioArrayFromParts('Minor'));
  }
  if (arpeggioOptions.augmented) {
    possibleArpeggios.push(...createArpeggioArrayFromParts('Augmented'));
  }
  if (arpeggioOptions.diminished) {
    possibleArpeggios.push(...createArpeggioArrayFromParts('Diminished'));
  }
  if (arpeggioOptions.dominantSeventh) {
    possibleArpeggios.push(...createArpeggioArrayFromParts('Dominant Seventh'));
  }
  if (arpeggioOptions.majorSeventh) {
    possibleArpeggios.push(...createArpeggioArrayFromParts('Major Seventh'));
  }
  if (arpeggioOptions.minorSeventh) {
    possibleArpeggios.push(...createArpeggioArrayFromParts('Minor Seventh'));
  }
  if (arpeggioOptions.minorMajorSeventh) {
    possibleArpeggios.push(
      ...createArpeggioArrayFromParts('Minor Major Seventh'),
    );
  }
  if (arpeggioOptions.augmentedSeventh) {
    possibleArpeggios.push(
      ...createArpeggioArrayFromParts('Augmented Minor Seventh'),
    );
  }
  if (arpeggioOptions.halfDiminishedSeventh) {
    possibleArpeggios.push(
      ...createArpeggioArrayFromParts('Half Diminished Seventh'),
    );
  }
  if (arpeggioOptions.diminishedSeventh) {
    possibleArpeggios.push(
      ...createArpeggioArrayFromParts('Diminished Seventh'),
    );
  }
  return possibleArpeggios;
}
