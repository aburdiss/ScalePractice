import { createScaleArrayFromParts } from '../../../../utils/createScaleArrayFromParts';
import {
  majorLetterNames,
  minorLetterNames,
  indeterminantLetterNames,
  pentatonicScaleNames,
  majorModeNames,
  melodicMinorModeNames,
  octatonicScaleNames,
  SCALE_TYPES,
} from '../../../../Model/Model';

export function getAllScalesFromState(scaleOptions) {
  let possibleScales = [];

  if (scaleOptions[SCALE_TYPES.major]) {
    possibleScales.push(
      ...createScaleArrayFromParts(majorLetterNames, ['Major']),
    );
  }
  if (scaleOptions[SCALE_TYPES.naturalMinor]) {
    possibleScales.push(
      ...createScaleArrayFromParts(minorLetterNames, ['Natural Minor']),
    );
  }
  if (scaleOptions[SCALE_TYPES.harmonicMinor]) {
    possibleScales.push(
      ...createScaleArrayFromParts(minorLetterNames, ['Harmonic Minor']),
    );
  }
  if (scaleOptions[SCALE_TYPES.melodicMinor]) {
    possibleScales.push(
      ...createScaleArrayFromParts(minorLetterNames, ['Melodic Minor']),
    );
  }
  if (scaleOptions[SCALE_TYPES.majorModes]) {
    possibleScales.push(
      ...createScaleArrayFromParts(majorLetterNames, majorModeNames),
    );
  }
  if (scaleOptions[SCALE_TYPES.melodicMinorModes]) {
    possibleScales.push(
      ...createScaleArrayFromParts(minorLetterNames, melodicMinorModeNames),
    );
  }
  if (scaleOptions[SCALE_TYPES.blues]) {
    possibleScales.push(
      ...createScaleArrayFromParts(indeterminantLetterNames, ['Blues']),
    );
  }
  if (scaleOptions[SCALE_TYPES.pentatonic]) {
    possibleScales.push(
      ...createScaleArrayFromParts(
        indeterminantLetterNames,
        pentatonicScaleNames,
      ),
    );
  }
  if (scaleOptions[SCALE_TYPES.octatonic]) {
    possibleScales.push(
      ...createScaleArrayFromParts(
        indeterminantLetterNames,
        octatonicScaleNames,
      ),
    );
  }
  if (scaleOptions[SCALE_TYPES.wholeTone]) {
    possibleScales.push(
      ...createScaleArrayFromParts(indeterminantLetterNames, ['Whole Tone']),
    );
  }
  return possibleScales;
}
