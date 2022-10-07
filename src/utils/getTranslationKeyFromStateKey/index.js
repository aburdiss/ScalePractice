/**
 * @function getTranslationKeyFromStateKey
 * @description Transforms a key that is used in the global state reducer to a
 * key that is used in the translation files.
 * @param {string} value The key for the value in state
 * @param {boolean} isScale Whether or not the inputted key is a scale.
 * @returns {string} A key that you can pass to the "translate" function
 *
 * @copyright 2022 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 10/7/22
 * @version 1.0.0
 */
export function getTranslationKeyFromStateKey(value, isScale) {
  if (isScale) {
    return {
      major: "Major",
      naturalMinor: "Natural Minor",
      harmonicMinor: "Harmonic Minor",
      melodicMinor: "Melodic Minor",
      majorModes: "Major Modes",
      melodicMinorModes: "Melodic Minor Modes",
      blues: "Blues",
      pentatonic: "Pentatonic",
      octatonic: "Octatonic",
      wholeTone: "Whole Tone",
    }[value];
  } else {
    // Arpeggio
    return {
      major: "MajorChord",
      minor: "Minor",
      augmented: "Augmented",
      diminished: "Diminished",
      dominantSeventh: "Dominant Seventh",
      majorSeventh: "Major Seventh",
      minorSeventh: "Minor Seventh",
      minorMajorSeventh: "Minor Major Seventh",
      augmentedSeventh: "Augmented Minor Seventh",
      halfDiminishedSeventh: "Half Diminished Seventh",
      diminishedSeventh: "Diminished Seventh",
    }[value];
  }
}
