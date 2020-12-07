/**
 * Model.js
 * The data used throughout Scale Practice
 * Created by Alexander Burdiss
 */

export const scaleResourceData = [
  {
    id: 0,
    name: 'Major',
    construction: 'MajorScaleConstruction',
    description: 'MajorScaleDescription',
  },
  {
    id: 1,
    name: 'Natural Minor',
    construction: 'NaturalMinorScaleConstruction',
    description: 'NaturalMinorScaleDescription',
  },
  {
    id: 2,
    name: 'Harmonic Minor',
    construction: 'HarmonicMinorScaleConstruction',
    description: 'HarmonicMinorScaleDescription',
  },
  {
    id: 3,
    name: 'Melodic Minor',
    construction: 'MelodicMinorScaleConstruction',
    description: 'MelodicMinorScaleDescription',
  },
  {
    id: 4,
    name: 'Ionian',
    construction: 'IonianScaleConstruction',
    description: 'IonianScaleDescription',
  },
  {
    id: 5,
    name: 'Dorian',
    construction: 'DorianScaleConstruction',
    description: 'DorianScaleDescription',
  },
  {
    id: 6,
    name: 'Phrygian',
    construction: 'PhrygianScaleConstruction',
    description: 'PhrygianScaleDescription',
  },
  {
    id: 7,
    name: 'Lydian',
    construction: 'LydianScaleConstruction',
    description: 'LydianScaleDescription',
  },
  {
    id: 8,
    name: 'Mixolydian',
    construction: 'MixolydianScaleConstruction',
    description: 'MixolydianScaleDescription',
  },
  {
    id: 9,
    name: 'Aeolian',
    construction: 'AeolianScaleConstruction',
    description: 'AeolianScaleDescription',
  },
  {
    id: 10,
    name: 'Locrian',
    construction: 'LocrianScaleConstruction',
    description: 'LocrianScaleDescription',
  },
  {
    id: 11,
    name: 'Minor Major',
    construction: 'MinorMajorScaleConstruction',
    description: 'MinorMajorScaleDescription',
  },
  {
    id: 12,
    name: 'Dorian ♭2',
    construction: 'DorianFlat2ScaleConstruction',
    description: 'DorianFlat2ScaleDescription',
  },
  {
    id: 13,
    name: 'Lydian Augmented',
    construction: 'LydianAugmentedScaleConstruction',
    description: 'LydianAugmentedScaleDescription',
  },
  {
    id: 14,
    name: 'Lydian Dominant',
    construction: 'LydianDominantScaleConstruction',
    description: 'LydianDominantScaleDescription',
  },
  {
    id: 15,
    name: 'Mixolydian ♭6',
    construction: 'MixolydianFlat6ScaleConstruction',
    description: 'MixolydianFlatSixScaleDescription',
  },
  {
    id: 16,
    name: 'Locrian ♮2',
    construction: 'LocrianNatural2ScaleConstruction',
    description: 'LocrianNaturalTwoScaleDescription',
  },
  {
    id: 17,
    name: 'Altered Scale',
    construction: 'AlteredScaleConstruction',
    description: 'AlteredScaleDescription',
  },
  {
    id: 18,
    name: 'Blues',
    construction: 'BluesScaleConstruction',
    description: 'BluesScaleDescription',
  },
  {
    id: 19,
    name: 'Major Pentatonic',
    construction: 'MajorPentatonicScaleConstruction',
    description: 'MajorPentatonicScaleDescription',
  },
  {
    id: 20,
    name: 'Minor Pentatonic',
    construction: 'MinorPentatonicScaleConstruction',
    description: 'MinorPentatonicScaleDescription',
  },
  {
    id: 21,
    name: 'Whole-Half Octatonic',
    construction: 'WholeHalfOctatonicScaleConstruction',
    description: 'WholeHalfOctatonicScaleDescription',
  },
  {
    id: 22,
    name: 'Half-Whole Octatonic',
    construction: 'HalfWholeOctatonicScaleConstruction',
    description: 'HalfWholeOctatonicScaleDescription',
  },
  {
    id: 23,
    name: 'Whole Tone',
    construction: 'WholeToneScaleConstruction',
    description: 'WholeToneScaleDescription',
  },
];

export const arpeggioResourceData = [
  {
    id: 24,
    name: 'Major',
    construction: 'MajorArpeggioConstruction',
    description: 'MajorArpeggioDescription',
  },
  {
    id: 25,
    name: 'Minor',
    construction: 'MinorArpeggioConstruction',
    description: 'MinorArpeggioDescription',
  },
  {
    id: 26,
    name: 'Augmented',
    construction: 'AugmentedArpeggioConstruction',
    description: 'AugmentedArpeggioDescription',
  },
  {
    id: 27,
    name: 'Diminished',
    construction: 'DiminishedArpeggioConstruction',
    description: 'DiminishedArpeggioDescription',
  },
  {
    id: 28,
    name: 'Dominant Seventh',
    construction: 'DominantSeventhArpeggioConstruction',
    description: 'DominantSeventhArpeggioDescription',
  },
  {
    id: 29,
    name: 'Major Seventh',
    construction: 'MajorSeventhArpeggioConstruction',
    description: 'MajorSeventhArpeggioDescription',
  },
  {
    id: 30,
    name: 'Minor Seventh',
    construction: 'MinorSeventhArpeggioConstruction',
    description: 'MinorSeventhArpeggioDescription',
  },
  {
    id: 31,
    name: 'Minor Major Seventh',
    construction: 'MinorMajorSeventhArpeggioConstruction',
    description: 'MinorMajorSeventhArpeggioDescription',
  },
  {
    id: 32,
    name: 'Augmented Minor Seventh',
    construction: 'AugmentedMinorSeventhArpeggioConstruction',
    description: 'AugmentedSeventhArpeggioDescription',
  },
  {
    id: 33,
    name: 'Half Diminished Seventh',
    construction: 'HalfDiminishedSeventhArpeggioConstruction',
    description: 'HalfDiminishedSeventhArpeggioDescription',
  },
  {
    id: 34,
    name: 'Diminished Seventh',
    construction: 'DiminishedSeventhArpeggioConstruction',
    description: 'DiminishedSeventhArpeggioDescription',
  },
];

export default {
  scaleResourceData,
  arpeggioResourceData,
};

// iOS System Colors
export const colors = {
  white: 'rgb(255, 255, 255)',
  systemGray6Light: 'rgb(242, 242, 247)',
  systemGray5Light: 'rgb(229, 229, 234)',
  systemGray4Light: 'rgb(209, 209, 214)',
  systemGray3Light: 'rgb(199, 199, 204)',
  systemGray2Light: 'rgb(174, 174, 178)',
  systemGray: 'rgb(142, 142, 147)',
  systemGray2Dark: 'rgb(99, 99, 102)',
  systemGray3Dark: 'rgb(72, 72, 74)',
  systemGray4Dark: 'rgb(58, 58, 60)',
  systemGray5Dark: 'rgb(44, 44, 46)',
  systemGray6Dark: 'rgb(28, 28, 30)',
  black: 'rgb(0, 0, 0)',

  redLight: 'rgb(255, 59, 48)',
  redDark: 'rgb(255, 69, 58)',

  orangeLight: 'rgb(255, 149, 0)',
  orangeDark: 'rgb(255, 159, 10)',

  yellowLight: 'rgb(255, 204, 0)',
  yellowDark: 'rgb(255, 214, 10)',

  greenLight: 'rgb(52, 199, 89)',
  greenDark: 'rgb(48, 209, 88)',

  tealLight: 'rgb(90, 200, 250)',
  tealDark: 'rgb(100, 210, 255)',

  blueLight: 'rgb(0, 122, 255)',
  blueDark: 'rgb(10, 132, 255)',

  indigoLight: 'rgb(88, 86, 214)',
  indigoDark: 'rgb(94, 92, 230)',

  purpleLight: 'rgb(175, 82, 222)', //af52de
  purpleDark: 'rgb(191, 90, 242)', //bf5af2

  pinkLight: 'rgb(255, 45, 85)',
  pinkDark: 'rgb(255, 55, 98)',
};
