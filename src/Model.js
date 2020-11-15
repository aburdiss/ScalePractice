/**
 * Model.js
 * The data used throughout Scale Practice
 * Created by Alexander Burdiss
 */
const MajorScaleDescription = "The Major scale is the most common scale in western music.";
const NaturalMinorScaleDescription = "The Natural Minor scale is built by starting on the sixth scale degree of the Major scale.";
const HarmonicMinorScaleDescription = "The Harmonic Minor scale shares all of the same notes with the Natural Minor scale, except its raised seventh scale degree. This scale is called the \"Harmonic Minor\" scale because it is the foundation of many harmonies in the minor mode.";
const MelodicMinorScaleConstruction = "W H W W W W H (ascending)\nW H W W H W W (Natural Minor descending)";
const MelodicMinorScaleDescription = "The ascending Melodic Minor scale is the same as the Harmonic Minor scale with a raised sixth scale degree. The descending Melodic Minor scale is equivalent to the Natural Minor scale. Many composers historically thought that the augmented second found in the Harmonic Minor scale was too wide, and this scale was created to bridge that augmented second.";
const IonianScaleDescription = "The first mode of the Major scale. This scale is equivalent to the Major scale.";
const DorianScaleDescription = "The second mode of the Major scale. This scale is the same as the Natural Minor scale with a raised sixth scale degree.";
const PhrygianScaleDescription = "The third mode of the Major scale. This scale is the same as the Natural Minor scale with a lowered second scale degree.";
const LydianScaleDescription = "The fourth mode of the Major scale. This scale is the same as the Major scale with a raised fourth scale degree.";
const MixolydianScaleDescription = "The fifth mode of the Major scale. This scale is the same as the Major scale with a lowered seventh scale degree.";
const AeolianScaleDescription = "The sixth mode of the Major scale. This scale is equivalent to the Natural Minor scale.";
const LocrianScaleDescription = "The seventh mode of the Major scale. This scale is the same as the Natural Minor scale with a lowered second and lowered fifth scale degree. This is the only major mode in which the tonic triad is diminished.";
const MinorMajorScaleDescription = "The first mode of the Melodic Minor scale. This scale is also known as the Jazz Minor scale. This scale is equivalent to the ascending Melodic Minor scale.";
const DorianFlat2ScaleDescription = "The second mode of the Melodic Minor scale. This scale is also known as the Phrygian ♯6, Assyrian, or Phrygidorian scale. This scale is the same as the Dorian scale with a lowered second scale degree.";
const LydianAugmentedScaleDescription = "The third mode of the Melodic Minor scale. This scale is also known as the Lydian ♯5 scale. This scale is the same as the Lydian scale with a raised fifth scale degree.";
const LydianDominantScaleDescription = "The fourth mode of the Melodic Minor scale. This scale is also known as the Lydian ♭7, Acoustic scale, Mixolydian ♯4, Overtone, or Lydomyxian scale. This scale is equivalent to the Lydian scale with a lowered seventh scale degree.";
const MixolydianFlatSixScaleDescription = "The fifth mode of the Melodic Minor scale. This scale is also known as the Melodic Major, Hindu, or Myxaeolian scale. This scale is the same as the Mixolydian scale with a lowered sixth scale degree.";
const LocrianNaturalTwoScaleDescription = "The sixth mode of the Melodic Minor scale. This scale is also known as the Half-diminished, or Aeolocrian scale. This scale is the same as the Locrian scale with a lowered second scale degree.";
const AlteredScaleDescription = "The seventh mode of the Melodic Minor scale. This scale is also known as the Super Locrian, or Altered Dominant scale. This scale is equivalent to the Locrian scale with a lowered fourth scale degree.";
const BluesScaleDescription = "This scale is the same as the minor pentatonic scale, with an added flat fifth scale degree, commonly known as the \"Blue Note\".";
const MajorPentatonicScaleDescription = "The major pentatonic scale is the same as the major scale, without the fourth and seventh scale degrees. Pentatonic scales were developed independantly by many different ancient cultures.";
const MinorPentatonicScaleDescription = "The minor pentatonic scale is the same as the natural minor scale, without the second and sixth scale degrees. Pentatonic scales were developed independantly by many different ancient cultures.";
const WholeHalfOctatonicScaleDescription = "The Octatonic scale is a symmetrical scale consisting of alternating whole and half steps. The Whole-Half Octatonic scale begins with a whole step. This scale is also known as the Whole-Half Diminished scale. In traditional twelve-tone music, there are only three different octatonic scales.";
const HalfWholeOctatonicScaleDescription = "The Octatonic scale is a symmetrical scale consisting of alternating whole and half steps. The Half-Whole Octatonic scale begins with a half step. This scale is also known as the Half-WHole Diminished scale. In traditional twelve-tone music, there are only three different octatonic scales.";
const WholeToneScaleDescription = "The Whole Tone scale is a symmetrical scale, consisting of only whole steps. In traditional twelve-tone music, there are only two different whole tone scales.";

const MajorArpeggioDescription = "The Major arpeggio consists of the first, third, and fifth scale degrees of the major scale.";
const MinorArpeggioDescription = "The Minor arpeggio consists of the first, third, and fifth scale degrees of the Natural Minor scale.";
const AugmentedArpeggioDescription = "The Augmented arpeggio is the same as the Major arpeggio with a raised fifth scale degree. The Augmented arpeggio is the only arpeggio present in the Whole Tone scale.";
const DiminishedArpeggioDescription = "The Diminished arpeggio is the same as the minor arpeggio with a lowered fifth scale degree.";
const DominantSeventhArpeggioDescription = "The Dominant Seventh arpeggio is the same as the major arpeggio, with an added lowered seventh scale degree (respective to the Major scale). This arpeggio is most commonly played over a dominant harmony.";
const MajorSeventhArpeggioDescription = "The Major Seventh arpeggio is the same as the major arpeggio with an added seventh scale degree (from the Major scale).";
const MinorSeventhArpeggioDescription = "The Minor Seventh arpeggio is the same as the Minor arpeggio with an added seventh scale degree (from the Natural Minor scale).";
const MinorMajorSeventhArpeggioDescription = "The Minor Major Seventh arpeggio is the same as the Minor arpeggio with an added seventh scale degree (from the Harmonic Minor scale).";
const AugmentedSeventhArpeggioDescription = "The Augmented Seventh arpeggio is the same as the Augmented Arpeggio with an added lowered seventh scale degree (from the Major scale).";
const HalfDiminishedSeventhArpeggioDescription = "The Half Diminished Seventh arpeggio is the same as the Diminished arpeggio with an added lowered seventh scale degree (from the Major scale).";
const DiminishedSeventhArpeggioDescription = "The Diminished Seventh arpeggio is the same as the Diminshed arpeggio with an added doubly lowered seventh scale degree (from the Major scale).";

export const scaleResourceData = [
  {id: 0, name: "Major", construction: "W W H W W W H", description: MajorScaleDescription},
  {id: 1, name: "Natural Minor", construction: "W H W W H W W", description: NaturalMinorScaleDescription},
  {id: 2, name: "Harmonic Minor", construction: "W H W W H W+H H", description: HarmonicMinorScaleDescription},
  {id: 3, name: "Melodic Minor", construction: MelodicMinorScaleConstruction, description: MelodicMinorScaleDescription},
  {id: 4, name: "Ionian", construction: "W W H W W W H", description: IonianScaleDescription},
  {id: 5, name: "Dorian", construction: "W H W W W H W", description: DorianScaleDescription},
  {id: 6, name: "Phrygian", construction: "H W W W H W W", description: PhrygianScaleDescription},
  {id: 7, name: "Lydian", construction: "W W W H W W H", description: LydianScaleDescription},
  {id: 8, name: "Mixolydian", construction: "W W H W W H W", description: MixolydianScaleDescription},
  {id: 9, name: "Aeolian", construction: "W H W W H W W", description: AeolianScaleDescription},
  {id: 10, name: "Locrian", construction: "H W W H W W W", description: LocrianScaleDescription},
  {id: 11, name: "Minor Major", construction: "W H W W W W H", description: MinorMajorScaleDescription},
  {id: 12, name: "Dorian ♭2", construction: "H W W W W H W", description: DorianFlat2ScaleDescription},
  {id: 13, name: "Lydian Augmented", construction: "W W W W H W H", description: LydianAugmentedScaleDescription},
  {id: 14, name: "Lydian Dominant", construction: "W W W H W H W", description: LydianDominantScaleDescription},
  {id: 15, name: "Mixolydian ♭6", construction: "W W H W H W W", description: MixolydianFlatSixScaleDescription},
  {id: 16, name: "Locrian ♮2", construction: "W H W H W W W", description: LocrianNaturalTwoScaleDescription},
  {id: 17, name: "Altered Scale", construction: "H W H W W W W", description: AlteredScaleDescription},
  {id: 18, name: "Blues", construction: "W+H W H H W+H W", description: BluesScaleDescription},
  {id: 19, name: "Major Pentatonic", construction: "W W W+H W W+H", description: MajorPentatonicScaleDescription},
  {id: 20, name: "Minor Pentatonic", construction: "W+H W W W+H W", description: MinorPentatonicScaleDescription},
  {id: 21, name: "Whole-Half Octatonic", construction: "W H W H W H W H", description: WholeHalfOctatonicScaleDescription},
  {id: 22, name: "Half-Whole Octatonic", construction: "H W H W H W H W", description: HalfWholeOctatonicScaleDescription},
  {id: 23, name: "Whole Tone", construction: "W W W W W W", description: WholeToneScaleDescription},
];

export const arpeggioResourceData = [
  {id: 24, name: "Major", construction: "M3 m3", description: MajorArpeggioDescription},
  {id: 25, name: "Minor", construction: "m3 M3", description: MinorArpeggioDescription},
  {id: 26, name: "Augmented", construction: "M3 M3", description: AugmentedArpeggioDescription},
  {id: 27, name: "Diminished", construction: "m3 m3", description: DiminishedArpeggioDescription},
  {id: 28, name: "Dominant Seventh", construction: "M3 m3 m3", description: DominantSeventhArpeggioDescription},
  {id: 29, name: "Major Seventh", construction: "M3 m3 M3", description: MajorSeventhArpeggioDescription},
  {id: 30, name: "Minor Seventh", construction: "m3 M3 m3", description: MinorSeventhArpeggioDescription},
  {id: 31, name: "Minor Major Seventh", construction: "m3 M3 M3", description: MinorMajorSeventhArpeggioDescription},
  {id: 32, name: "Augmented Minor Seventh", construction: "M3 M3 d3", description: AugmentedSeventhArpeggioDescription},
  {id: 33, name: "Half Diminished Seventh", construction: "m3 m3 M3", description: HalfDiminishedSeventhArpeggioDescription},
  {id: 34, name: "Diminished Seventh", construction: "m3 m3 m3", description: DiminishedSeventhArpeggioDescription},
];

export default {
  scaleResourceData,
  arpeggioResourceData,
}

export const colors = {
  white: '#FFFFFF',
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
  black: '#000000',

  purpleLight: 'rgb(175, 82, 222)',
  purpleDark: 'rgb(191, 90, 242)',
}