/**
 * @function getTranslationKeyFromStateKey
 * @memberof Random
 * @description Transforms a key that is used in the global state reducer to a
 * key that is used in the translation files.
 * Created 10/7/2022 by Alexander Burdiss
 * @param {string} value The key for the value in state
 * @param {boolean} isScale Whether or not the inputted key is a scale.
 * @returns {string} A key that you can pass to the "translate" function
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/31/25
 * @version 1.0.0
 */
export function getTranslationKeyFromStateKey(
  value: string,
  isScale: boolean,
): string | undefined {
  if (isScale) {
    return {
      major: 'Major',
      naturalMinor: 'Natural Minor',
      harmonicMinor: 'Harmonic Minor',
      melodicMinor: 'Melodic Minor',
      majorModes: 'Major Modes',
      melodicMinorModes: 'Melodic Minor Modes',
      blues: 'Blues',
      pentatonic: 'Pentatonic',
      octatonic: 'Octatonic',
      wholeTone: 'Whole Tone',
    }[value];
  } else {
    // Arpeggio
    return {
      major: 'MajorChord',
      minor: 'Minor',
      augmented: 'Augmented',
      diminished: 'Diminished',
      dominantSeventh: 'Dominant Seventh',
      majorSeventh: 'Major Seventh',
      minorSeventh: 'Minor Seventh',
      minorMajorSeventh: 'Minor Major Seventh',
      augmentedSeventh: 'Augmented Minor Seventh',
      halfDiminishedSeventh: 'Half Diminished Seventh',
      diminishedSeventh: 'Diminished Seventh',
    }[value];
  }
}
