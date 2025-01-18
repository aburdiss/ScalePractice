import { createArpeggioArrayFromParts } from '../../../../utils';

export function getAllArpeggiosFromState(arpeggioOptions: {
  [key: string]: boolean;
}) {
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
