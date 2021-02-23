import React, {useCallback, useState} from 'react';
import {Alert, View, ScrollView} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import ScaleDisplay from '../Components/ScaleDisplay';
import AllScalesButton from '../Components/AllScalesButton';
import RandomizeButton from '../Components/RandomizeButton';
import SwitchRow from '../Components/SwitchRow';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';
import {debounce, random} from 'underscore';

/**
 * @description A View that allows the user to randomize all of the scales in
 * a particular category.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 1.1.0
 *
 * @component
 * @example
 *   <RandomScale />
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
   * @function ScalePractice~selectAllScales
   * @description A function that toggles all scale switches to true. If all are
   * currently selected, toggles all off except major.
   * @author Alexander Burdiss
   * @since 10/12/20
   * @version 1.0.1
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
   * @function ScalePractice~generateScales
   * @description A function that parses what switches are turned on, and
   * generates a random scale based on the user preferences.
   * @author Alexander Burdiss
   * @since 10/11/20
   * @version 1.0.1
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
      );
    } else {
      let newScale;
      do {
        newScale = possibleScales[random(possibleScales.length - 1)];
      } while (newScale == currentScale);
      setCurrentScale(newScale ? newScale : translate('No Scale Selected'));
    }
  }

  /**
   * @function ScalePractice~createScaleArrayFromParts
   * @description Constructs the scale name and scale note together to form one
   * string to display on the screen.
   * @author Alexander Burdiss
   * @since 10/12/20
   * @version 1.0.2
   *
   * @param {[String]} letterNames
   * @param {[String]} scaleNames
   * @returns {[String]} array of all transpositions of a scale
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

  /**
   * @function ScalePractice~debouncedGenerateScales
   * @description Prevents the user from clicking the generate button within
   * 150 ms of another press.
   * @author Alexander Burdiss
   * @since 1/5/21
   * @version 1.0.0
   */
  const debouncedGenerateScales = useCallback(
    debounce(generateScales, 150, true),
    [
      majorSwitch,
      naturalMinorSwitch,
      harmonicMinorSwitch,
      melodicMinorSwitch,
      majorModesSwitch,
      melodicMinorModesSwitch,
      bluesSwitch,
      pentatonicSwitch,
      octatonicSwtich,
      wholeToneSwitch,
    ],
  );

  return (
    <View style={styles.container}>
      <View style={styles.scaleDisplay}>
        <ScaleDisplay>{currentScale}</ScaleDisplay>
      </View>
      <View style={styles.switchesContainer}>
        <ScrollView>
          <SwitchRow
            onValueChange={toggleMajorSwitch}
            value={majorSwitch}
            text={translate('Major')}
          />
          <SwitchRow
            onValueChange={toggleNaturalMinorSwitch}
            value={naturalMinorSwitch}
            text={translate('Natural Minor')}
          />
          <SwitchRow
            onValueChange={toggleHarmonicMinorSwitch}
            value={harmonicMinorSwitch}
            text={translate('Harmonic Minor')}
          />
          <SwitchRow
            onValueChange={toggleMelodicMinorSwitch}
            value={melodicMinorSwitch}
            text={translate('Melodic Minor')}
          />
          <SwitchRow
            onValueChange={toggleMajorModesSwitch}
            value={majorModesSwitch}
            text={translate('Major Modes')}
          />
          <SwitchRow
            onValueChange={toggleMelodicMinorModesSwitch}
            value={melodicMinorModesSwitch}
            text={translate('Melodic Minor Modes')}
          />
          <SwitchRow
            onValueChange={toggleBluesSwitch}
            value={bluesSwitch}
            text={translate('Blues')}
          />
          <SwitchRow
            onValueChange={togglePentatonicSwitch}
            value={pentatonicSwitch}
            text={translate('Pentatonic')}
          />
          <SwitchRow
            onValueChange={toggleOctatonicSwitch}
            value={octatonicSwtich}
            text={translate('Octatonic')}
          />
          <SwitchRow
            onValueChange={toggleWholeToneSwitch}
            value={wholeToneSwitch}
            text={translate('Whole Tone')}
          />
          <View style={styles.allScaleButton}>
            <AllScalesButton
              handler={selectAllScales}
              accessibilityHint={translate('Toggles All Scales')}>
              {translate('All Scales')}
            </AllScalesButton>
          </View>
        </ScrollView>
      </View>
      <View style={styles.mainActionButton}>
        <RandomizeButton
          handler={debouncedGenerateScales}
          accessibilityValue={{text: `${translate(currentScale)}`}}
          accessibilityHint={translate('Randomizes a new scale')}
          accessible={true}
        />
      </View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  allScaleButton: {
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
  mainActionButton: {
    borderColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderTopWidth: 1,
  },
  scaleDisplay: {
    borderBottomWidth: 1,
    borderColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
  },
  switchesContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    marginHorizontal: 10,
  },
});

export default RandomScale;
