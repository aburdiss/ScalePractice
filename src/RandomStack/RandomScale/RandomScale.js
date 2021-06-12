import React, {
  useCallback,
  useContext,
  useEffect,
  useState,
  useRef,
} from 'react';
import {Alert, View, ScrollView, Pressable, Text} from 'react-native';
import Popover from 'react-native-popover-view';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {debounce, random, shuffle} from 'underscore';

import LargeScaleDisplay from '../../Components/LargeScaleDisplay/LargeScaleDisplay';
import ScaleDisplay from '../../Components/ScaleDisplay/ScaleDisplay';
import RandomizeButton from '../../Components/RandomizeButton/RandomizeButton';
import {createScaleArrayFromParts} from '../utils/RandomUtils';

import {
  colors,
  majorLetterNames,
  minorLetterNames,
  indeterminantLetterNames,
  pentatonicScaleNames,
  majorModeNames,
  melodicMinorModeNames,
  octatonicScaleNames,
} from '../../Model/Model';
import {PreferencesContext} from '../../Model/Preferences';
import {translate} from '../../Translations/TranslationModel';
import RandomScaleSettings from './RandomScaleSettings/RandomScaleSettings';

/**
 * @description A View that allows the user to randomize all of the scales in
 * a particular category.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 3.0.0
 *
 * @component
 * @example
 *   <RandomScale />
 *
 * @todo Refactor this to be more functional
 */
const RandomScale = () => {
  const styles = useDynamicValue(dynamicStyles);

  const selectionRef = useRef(null);
  const [showSelectionPopover, setShowSelectionPopover] = useState(false);

  const {state} = useContext(PreferencesContext);

  const [currentScale, setCurrentScale] = useState(
    translate('No Scale Selected'),
  );

  const [scaleArrayIndex, setScaleArrayIndex] = useState(0);
  const [scaleArray, setScaleArray] = useState([]);

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

  useEffect(generateScales, [
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
  ]);

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
    setScaleArray(shuffle(possibleScales));
    setScaleArrayIndex(0);
  }

  /**
   * @function RandomScale~getNewScale
   * @description Checks whether the user has selected to repeat scales or not
   * and displays the next scale on the screen.
   * @author Alexander Burdiss
   * @since 2/26/21
   * @version 1.0.0
   */
  function getNewScale() {
    if (state.repeat) {
      // Ensuring that the new scale is at least different from the old one
      if (scaleArray.length === 0) {
        Alert.alert(
          translate('No Scale Selected'),
          translate('Please select at least one category'),
        );
      } else {
        let newScale;
        do {
          newScale = scaleArray[random(scaleArray.length - 1)];
        } while (newScale == currentScale);
        setCurrentScale(newScale ? newScale : translate('No Scale Selected'));
      }
    } else {
      // Do not repeat scales
      if (scaleArrayIndex >= scaleArray.length) {
        Alert.alert('All scaled practiced!', '', [
          {
            onPress: () => {
              setScaleArrayIndex(1);
              const newScaleArray = shuffle(scaleArray);
              setScaleArray(newScaleArray);
              setCurrentScale(newScaleArray[0]);
            },
          },
        ]);
      } else {
        setCurrentScale(scaleArray[scaleArrayIndex]);
        setScaleArrayIndex((previous) => previous + 1);
      }
    }
  }

  /**
   * @function ScalePractice~debouncedGetNewScale
   * @description Prevents the user from clicking the generate button within
   * 150 ms of another press.
   * @author Alexander Burdiss
   * @since 1/5/21
   * @version 1.0.0
   */
  const debouncedGetNewScale = useCallback(debounce(getNewScale, 150, true), [
    state,
    scaleArrayIndex,
    scaleArray,
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
  ]);

  const ScaleSettings = () => {
    return (
      <RandomScaleSettings
        toggleMajorSwitch={toggleMajorSwitch}
        majorSwitch={majorSwitch}
        toggleNaturalMinorSwitch={toggleNaturalMinorSwitch}
        naturalMinorSwitch={naturalMinorSwitch}
        toggleHarmonicMinorSwitch={toggleHarmonicMinorSwitch}
        harmonicMinorSwitch={harmonicMinorSwitch}
        toggleMelodicMinorSwitch={toggleMelodicMinorSwitch}
        melodicMinorSwitch={melodicMinorSwitch}
        toggleMajorModesSwitch={toggleMajorModesSwitch}
        majorModesSwitch={majorModesSwitch}
        toggleMelodicMinorModesSwitch={toggleMelodicMinorModesSwitch}
        melodicMinorModesSwitch={melodicMinorModesSwitch}
        toggleBluesSwitch={toggleBluesSwitch}
        bluesSwitch={bluesSwitch}
        togglePentatonicSwitch={togglePentatonicSwitch}
        pentatonicSwitch={pentatonicSwitch}
        toggleOctatonicSwitch={toggleOctatonicSwitch}
        octatonicSwtich={octatonicSwtich}
        toggleWholeToneSwitch={toggleWholeToneSwitch}
        wholeToneSwitch={wholeToneSwitch}
        selectAllScales={selectAllScales}
      />
    );
  };

  return state?.simpleRandom ? (
    <View>
      <Pressable onPress={debouncedGetNewScale}>
        <LargeScaleDisplay>{currentScale}</LargeScaleDisplay>
      </Pressable>
      <Pressable
        ref={selectionRef}
        hitSlop={1}
        onPress={() => setShowSelectionPopover(true)}
        style={styles.selectionsButton}>
        <Text style={styles.selectionsText}>
          {translate('Scale Selections')}
        </Text>
      </Pressable>
      <Popover
        arrowStyle={styles.popoverArrow}
        from={selectionRef}
        isVisible={showSelectionPopover}
        onRequestClose={() => setShowSelectionPopover(false)}>
        <ScrollView style={styles.popoverContainer}>
          <ScaleSettings />
        </ScrollView>
      </Popover>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.scaleDisplay}>
        <ScaleDisplay>{currentScale}</ScaleDisplay>
      </View>
      <View style={styles.switchesContainer}>
        <ScrollView>
          <ScaleSettings />
        </ScrollView>
      </View>
      <View style={styles.mainActionButton}>
        <RandomizeButton
          handler={debouncedGetNewScale}
          accessibilityValue={{text: `${translate(currentScale)}`}}
          accessibilityHint={translate('Randomizes a new scale')}
          accessible={true}
        />
      </View>
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
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
  popoverArrow: {
    backgroundColor: new DynamicValue(
      colors.systemGray6Light,
      colors.systemGray6Dark,
    ),
  },
  popoverContainer: {
    width: 300,
    backgroundColor: new DynamicValue(
      colors.systemGray6Light,
      colors.systemGray6Dark,
    ),
  },
  scaleDisplay: {
    borderBottomWidth: 1,
    borderColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
  },
  selectionsButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    height: 25,
    zIndex: 2,
  },
  selectionsText: {
    color: new DynamicValue(colors.black, colors.white),
  },
  switchesContainer: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    marginHorizontal: 10,
  },
});

export default RandomScale;
