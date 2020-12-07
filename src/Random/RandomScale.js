import React, {useState} from 'react';
import {Alert, View, Text, Switch} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import ScaleDisplay from '../Components/ScaleDisplay';
import AllScalesButton from '../Components/AllScalesButton';
import RandomzieButton from '../Components/RandomizeButton';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

/**
 * @description A View that allows the user to randomize all of the scales in
 * a particular category.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const RandomScale = () => {
  const styles = useDynamicValue(dynamicStyles);

  const [currentScale, setCurrentScale] = useState(
    translate('No Scale Selected'),
  );

  const [majorSwitch, setMajorSwitch] = useState(true);
  const toggleMajorSwitch = () =>
    setMajorSwitch((previousState) => !previousState);

  const [naturalMinorSwitch, setNaturalMinorSwitch] = useState(false);
  const toggleNaturalMinorSwitch = () =>
    setNaturalMinorSwitch((previousState) => !previousState);

  const [harmonicMinorSwitch, setHarmonicMinorSwitch] = useState(false);
  const toggleHarmonicMinorSwitch = () =>
    setHarmonicMinorSwitch((previousState) => !previousState);

  const [melodicMinorSwitch, setMelodicMinorSwitch] = useState(false);
  const toggleMelodicMinorSwitch = () =>
    setMelodicMinorSwitch((previousState) => !previousState);

  const [majorModesSwitch, setMajorModesSwitch] = useState(false);
  const toggleMajorModesSwitch = () =>
    setMajorModesSwitch((previousState) => !previousState);

  const [melodicMinorModesSwitch, setMelodicMinorModesSwitch] = useState(false);
  const toggleMelodicMinorModesSwitch = () =>
    setMelodicMinorModesSwitch((previousState) => !previousState);

  const [bluesSwitch, setBluesSwitch] = useState(false);
  const toggleBluesSwitch = () =>
    setBluesSwitch((previousState) => !previousState);

  const [pentatonicSwitch, setPentatonicSwitch] = useState(false);
  const togglePentatonicSwitch = () =>
    setPentatonicSwitch((previousState) => !previousState);

  const [octatonicSwtich, setOctatonicSwitch] = useState(false);
  const toggleOctatonicSwitch = () =>
    setOctatonicSwitch((previousState) => !previousState);

  const [wholeToneSwitch, setWholeToneSwitch] = useState(false);
  const toggleWholeToneSwitch = () =>
    setWholeToneSwitch((previousState) => !previousState);

  /**
   * @description A function that toggles all scale switches to true. If all are
   * currently selected, toggles all off except major.
   * @since 10/12/20
   */
  function selectAllScales() {
    let allOn = true;

    if (!majorSwitch) {
      allOn = false;
      setMajorSwitch(true);
    }
    if (!naturalMinorSwitch) {
      allOn = false;
      setNaturalMinorSwitch(true);
    }
    if (!harmonicMinorSwitch) {
      allOn = false;
      setHarmonicMinorSwitch(true);
    }
    if (!melodicMinorSwitch) {
      allOn = false;
      setMelodicMinorSwitch(true);
    }
    if (!majorModesSwitch) {
      allOn = false;
      setMajorModesSwitch(true);
    }
    if (!melodicMinorModesSwitch) {
      allOn = false;
      setMelodicMinorModesSwitch(true);
    }
    if (!bluesSwitch) {
      allOn = false;
      setBluesSwitch(true);
    }
    if (!pentatonicSwitch) {
      allOn = false;
      setPentatonicSwitch(true);
    }
    if (!octatonicSwtich) {
      allOn = false;
      setOctatonicSwitch(true);
    }
    if (!wholeToneSwitch) {
      allOn = false;
      setWholeToneSwitch(true);
    }

    if (allOn) {
      setNaturalMinorSwitch(false);
      setHarmonicMinorSwitch(false);
      setMelodicMinorSwitch(false);
      setMajorModesSwitch(false);
      setMelodicMinorModesSwitch(false);
      setBluesSwitch(false);
      setPentatonicSwitch(false);
      setOctatonicSwitch(false);
      setWholeToneSwitch(false);
    }
  }

  /**
   * @description A function that parses what switches are turned on, and
   * generates a random scale based on the user preferences.
   * @since 10/11/20
   */
  function generateScales() {
    const majorLetterNames = [
      'C',
      'D♭',
      'D',
      'E♭',
      'E',
      'F',
      'F♯',
      'G♭',
      'G',
      'A♭',
      'A',
      'B♭',
      'B',
    ];
    const minorLetterNames = [
      'C',
      'C♯',
      'D',
      'D♯',
      'E♭',
      'E',
      'F',
      'F♯',
      'G',
      'G♯',
      'A',
      'B♭',
      'B',
    ];
    const indeterminantLetterNames = [
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

    const pentatonicScaleNames = ['Major Pentatonic', 'Minor Pentatonic'];
    const majorModeNames = [
      'Ionian',
      'Dorian',
      'Phrygian',
      'Lydian',
      'Mixolydian',
      'Aeolian',
      'Locrian',
    ];
    const melodicMinorModeNames = [
      'Minor Major',
      'Dorian ♭2',
      'Lydian Augmented',
      'Lydian Dominant',
      'Mixolydian ♭6',
      'Locrian ♮2',
      'Altered Scale',
    ];
    const octatonicScaleNames = [
      'Whole-Half Octatonic',
      'Half-Whole Octatonic',
    ];

    let possibleScales = [];

    if (majorSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(majorLetterNames, ['Major']),
      );
    }
    if (naturalMinorSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(minorLetterNames, ['Natural Minor']),
      );
    }
    if (harmonicMinorSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(minorLetterNames, ['Harmonic Minor']),
      );
    }
    if (melodicMinorSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(minorLetterNames, ['Melodic Minor']),
      );
    }
    if (majorModesSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(majorLetterNames, majorModeNames),
      );
    }
    if (melodicMinorModesSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(minorLetterNames, melodicMinorModeNames),
      );
    }
    if (bluesSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(indeterminantLetterNames, ['Blues']),
      );
    }
    if (pentatonicSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(
          indeterminantLetterNames,
          pentatonicScaleNames,
        ),
      );
    }
    if (octatonicSwtich) {
      possibleScales.push(
        ...createScaleArrayFromParts(
          indeterminantLetterNames,
          octatonicScaleNames,
        ),
      );
    }
    if (wholeToneSwitch) {
      possibleScales.push(
        ...createScaleArrayFromParts(indeterminantLetterNames, ['Whole Tone']),
      );
    }

    // Ensuring that the new scale is different from the old one
    if (possibleScales.length === 0) {
      Alert.alert(
        translate('No Scale Selected'),
        translate('Please select at least one category'),
        [
          {
            text: translate('Dismiss'),
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    } else {
      let newScale;
      do {
        newScale =
          possibleScales[Math.floor(Math.random() * possibleScales.length)];
      } while (newScale == currentScale);
      setCurrentScale(newScale ? newScale : translate('No Scale Selected'));
    }
  }

  /**
   * @description Constructs the scale name and scale note together to form one
   * string to display on the screen.
   * @since 10/12/20
   *
   * @param {[String]} letterNames
   * @param {[String]} scaleNames
   * @returns [String] array of all transpositions of a scale
   */
  function createScaleArrayFromParts(letterNames, scaleNames) {
    let allLetterNamesOfScale = [];
    for (let letter of letterNames) {
      for (let scaleName of scaleNames) {
        allLetterNamesOfScale.push(`${letter} ${translate(scaleName)}`);
      }
    }
    return allLetterNamesOfScale;
  }

  return (
    <View style={styles.container}>
      <View>
        <ScaleDisplay>{currentScale}</ScaleDisplay>

        <View style={styles.switchesContainer}>
          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{translate('Major')}</Text>
            <Switch onValueChange={toggleMajorSwitch} value={majorSwitch} />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{translate('Natural Minor')}</Text>
            <Switch
              onValueChange={toggleNaturalMinorSwitch}
              value={naturalMinorSwitch}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{translate('Harmonic Minor')}</Text>
            <Switch
              onValueChange={toggleHarmonicMinorSwitch}
              value={harmonicMinorSwitch}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{translate('Melodic Minor')}</Text>
            <Switch
              onValueChange={toggleMelodicMinorSwitch}
              value={melodicMinorSwitch}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{translate('Major Modes')}</Text>
            <Switch
              onValueChange={toggleMajorModesSwitch}
              value={majorModesSwitch}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>
              {translate('Melodic Minor Modes')}
            </Text>
            <Switch
              onValueChange={toggleMelodicMinorModesSwitch}
              value={melodicMinorModesSwitch}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{translate('Blues')}</Text>
            <Switch onValueChange={toggleBluesSwitch} value={bluesSwitch} />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{translate('Pentatonic')}</Text>
            <Switch
              onValueChange={togglePentatonicSwitch}
              value={pentatonicSwitch}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{translate('Octatonic')}</Text>
            <Switch
              onValueChange={toggleOctatonicSwitch}
              value={octatonicSwtich}
            />
          </View>

          <View style={styles.switchRow}>
            <Text style={styles.switchText}>{translate('Whole Tone')}</Text>
            <Switch
              onValueChange={toggleWholeToneSwitch}
              value={wholeToneSwitch}
            />
          </View>

          <AllScalesButton handler={selectAllScales}>
            {translate('All Scales')}
          </AllScalesButton>
        </View>
      </View>
      <View>
        <RandomzieButton
          handler={generateScales}
          accessibilityValue={{text: `${translate(currentScale)}`}}
        />
      </View>
    </View>
  );
};

/**
 * @description Styles for RandomScale component.
 */
const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
  switchesContainer: {
    width: '70%',
    alignSelf: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  switchText: {
    color: new DynamicValue(colors.black, colors.white),
  },
});

export default RandomScale;
