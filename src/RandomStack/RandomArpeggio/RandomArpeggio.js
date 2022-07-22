import React, {
  useState,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { Alert, View, ScrollView, Pressable, Text } from 'react-native';
import Popover from 'react-native-popover-view';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import { createArpeggioArrayFromParts } from '../utils/RandomUtils';
import {
  LargeScaleDisplay,
  ScaleDisplay,
  RandomizeButton,
} from '../../Components';
import RandomArpeggioSettings from './RandomArpeggioSettings/RandomArpeggioSettings';

import { colors } from '../../Model/Model';
import { PreferencesContext } from '../../Model/Preferences';
import { translate } from '../../Translations/TranslationModel';

import { random, shuffle, debounce, useIdleScreen } from '../../utils';

/**
 * @description A view that allows the user to randomize all of the arpeggios
 * in a particular category.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 3.1.0
 *
 * @example
 *   <RandomArpeggio />
 */
const RandomArpeggio = () => {
  useIdleScreen();

  const styles = useDynamicValue(dynamicStyles);

  const selectionRef = useRef(null);
  const [showSelectionPopover, setShowSelectionPopover] = useState(false);

  const { state } = useContext(PreferencesContext);

  const [currentArpeggio, setCurrentArpeggio] = useState(
    translate('No Arpeggio Selected'),
  );

  const [arpeggioArrayIndex, setArpeggioArrayIndex] = useState(0);
  const [arpeggioArray, setArpeggioArray] = useState([]);

  const [majorSwitch, setMajorSwitch] = useState(true);
  const toggleMajorSwitch = () =>
    setMajorSwitch((previousState) => !previousState);

  const [minorSwitch, setMinorSwitch] = useState(false);
  const toggleMinorSwitch = () =>
    setMinorSwitch((previousState) => !previousState);

  const [augmentedSwitch, setAugmentedSwitch] = useState(false);
  const toggleAugmentedSwitch = () =>
    setAugmentedSwitch((previousState) => !previousState);

  const [diminishedSwitch, setDiminishedSwitch] = useState(false);
  const toggleDiminishedSwitch = () =>
    setDiminishedSwitch((previousState) => !previousState);

  const [dominantSeventhSwitch, setDominantSeventhSwitch] = useState(false);
  const toggleDominantSeventhSwitch = () =>
    setDominantSeventhSwitch((previousState) => !previousState);

  const [majorSeventhSwitch, setMajorSeventhSwitch] = useState(false);
  const toggleMajorSeventhSwitch = () =>
    setMajorSeventhSwitch((previousState) => !previousState);

  const [minorSeventhSwitch, setMinorSeventhSwitch] = useState(false);
  const toggleMinorSeventhSwitch = () =>
    setMinorSeventhSwitch((previousState) => !previousState);

  const [minorMajorSeventhSwitch, setMinorMajorSeventhSwitch] = useState(false);
  const toggleMinorMajorSeventhSwitch = () =>
    setMinorMajorSeventhSwitch((previousState) => !previousState);

  const [augmentedSeventhSwitch, setAugmentedSeventhSwitch] = useState(false);
  const toggleAugmentedSeventhSwitch = () =>
    setAugmentedSeventhSwitch((previousState) => !previousState);

  const [halfDiminishedSeventhSwitch, setHalfDiminishedSeventhSwitch] =
    useState(false);
  const toggleHalfDiminishedSeventhSwitch = () =>
    setHalfDiminishedSeventhSwitch((previousState) => !previousState);

  const [diminishedSeventhSwitch, setDiminishedSeventhSwitch] = useState(false);
  const toggleDiminishedSeventhSwitch = () =>
    setDiminishedSeventhSwitch((previousState) => !previousState);

  useEffect(generateArpeggios, [
    majorSwitch,
    minorSwitch,
    augmentedSwitch,
    diminishedSwitch,
    dominantSeventhSwitch,
    majorSeventhSwitch,
    minorSeventhSwitch,
    minorMajorSeventhSwitch,
    augmentedSeventhSwitch,
    halfDiminishedSeventhSwitch,
    diminishedSeventhSwitch,
  ]);

  /**
   * @function ArpeggioPractice~selectAllArpeggios
   * @description A function that toggles all arpeggio switches to true. If all
   * are currently selected, toggles all off except major.
   * @author Alexander Burdiss
   * @since 10/14/20
   * @version 1.0.1
   */
  function selectAllArpeggios() {
    let allOn = true;

    if (!majorSwitch) {
      allOn = false;
      setMajorSwitch(true);
    }

    if (!minorSwitch) {
      allOn = false;
      setMinorSwitch(true);
    }

    if (!augmentedSwitch) {
      allOn = false;
      setAugmentedSwitch(true);
    }

    if (!diminishedSwitch) {
      allOn = false;
      setDiminishedSwitch(true);
    }

    if (!dominantSeventhSwitch) {
      allOn = false;
      setDominantSeventhSwitch(true);
    }

    if (!majorSeventhSwitch) {
      allOn = false;
      setMajorSeventhSwitch(true);
    }

    if (!minorSeventhSwitch) {
      allOn = false;
      setMinorSeventhSwitch(true);
    }

    if (!minorMajorSeventhSwitch) {
      allOn = false;
      setMinorMajorSeventhSwitch(true);
    }

    if (!augmentedSeventhSwitch) {
      allOn = false;
      setAugmentedSeventhSwitch(true);
    }

    if (!halfDiminishedSeventhSwitch) {
      allOn = false;
      setHalfDiminishedSeventhSwitch(true);
    }

    if (!diminishedSeventhSwitch) {
      allOn = false;
      setDiminishedSeventhSwitch(true);
    }

    if (allOn) {
      setMinorSwitch(false);
      setAugmentedSwitch(false);
      setDiminishedSwitch(false);
      setDominantSeventhSwitch(false);
      setMajorSeventhSwitch(false);
      setMinorSeventhSwitch(false);
      setMinorMajorSeventhSwitch(false);
      setAugmentedSeventhSwitch(false);
      setHalfDiminishedSeventhSwitch(false);
      setDiminishedSeventhSwitch(false);
    }
  }

  /**
   * @function ArpeggioPractice~generateArpeggios
   * @description A function that parses what switches are turned on, and
   * generates a random arpeggio based on the user preferences.
   * @author Alexander Burdiss
   * @since 10/13/20
   * @version 1.0.1
   */
  function generateArpeggios() {
    let possibleArpeggios = [];

    if (majorSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Major'));
    }
    if (minorSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Minor'));
    }
    if (augmentedSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Augmented'));
    }
    if (diminishedSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Diminished'));
    }
    if (dominantSeventhSwitch) {
      possibleArpeggios.push(
        ...createArpeggioArrayFromParts('Dominant Seventh'),
      );
    }
    if (majorSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Major Seventh'));
    }
    if (minorSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts('Minor Seventh'));
    }
    if (minorMajorSeventhSwitch) {
      possibleArpeggios.push(
        ...createArpeggioArrayFromParts('Minor Major Seventh'),
      );
    }
    if (augmentedSeventhSwitch) {
      possibleArpeggios.push(
        ...createArpeggioArrayFromParts('Augmented Minor Seventh'),
      );
    }
    if (halfDiminishedSeventhSwitch) {
      possibleArpeggios.push(
        ...createArpeggioArrayFromParts('Half Diminished Seventh'),
      );
    }
    if (diminishedSeventhSwitch) {
      possibleArpeggios.push(
        ...createArpeggioArrayFromParts('Diminished Seventh'),
      );
    }

    setArpeggioArray(shuffle(possibleArpeggios));
    setArpeggioArrayIndex(0);
  }

  /**
   * @function RandomArpeggio~getNewArpeggio
   * @description Checks whether the user has selected repeat scales
   * and displays the next scale on the screen
   * @author Alexander Burdiss
   * @since 2/26/21
   * @version 1.0.0
   */
  function getNewArpeggio() {
    if (state.repeat) {
      // Ensuring that the new arpeggio is different from the old one.
      if (arpeggioArray.length === 0) {
        Alert.alert(
          translate('No Arpeggio Selected'),
          translate('Please select at least one category'),
        );
      } else {
        let newArpeggio;
        do {
          newArpeggio = arpeggioArray[random(arpeggioArray.length - 1)];
        } while (newArpeggio === currentArpeggio);
        setCurrentArpeggio(
          newArpeggio ? newArpeggio : translate('No Arpeggio Selected'),
        );
      }
    } else {
      if (arpeggioArrayIndex >= arpeggioArray.length) {
        Alert.alert('All arpeggios practiced!', '', [
          {
            onPress: () => {
              setArpeggioArrayIndex(1);
              const newArpeggiosArray = shuffle(arpeggioArray);
              setArpeggioArray(newArpeggiosArray);
              setCurrentArpeggio(newArpeggiosArray[0]);
            },
          },
        ]);
      } else {
        setCurrentArpeggio(arpeggioArray[arpeggioArrayIndex]);
        setArpeggioArrayIndex((previous) => previous + 1);
      }
    }
  }

  /**
   * @function ArpeggioPractice~debouncedGenerateArpeggios
   * @description Prevents the user from clicking the generate button within
   * 150 ms of another click.
   * @author Alexander Burdiss
   * @since 1/13/21
   * @version 1.0.0
   */
  const debouncedGetNewArpeggio = useCallback(
    debounce(getNewArpeggio, 150, true),
    [
      state,
      arpeggioArrayIndex,
      arpeggioArray,
      majorSwitch,
      minorSwitch,
      augmentedSwitch,
      diminishedSwitch,
      dominantSeventhSwitch,
      majorSeventhSwitch,
      minorSeventhSwitch,
      minorMajorSeventhSwitch,
      augmentedSeventhSwitch,
      halfDiminishedSeventhSwitch,
      diminishedSeventhSwitch,
    ],
  );

  const ArpeggioSettings = () => {
    return (
      <RandomArpeggioSettings
        toggleMajorSwitch={toggleMajorSwitch}
        majorSwitch={majorSwitch}
        toggleMinorSwitch={toggleMinorSwitch}
        minorSwitch={minorSwitch}
        toggleAugmentedSwitch={toggleAugmentedSwitch}
        augmentedSwitch={augmentedSwitch}
        toggleDiminishedSwitch={toggleDiminishedSwitch}
        diminishedSwitch={diminishedSwitch}
        toggleDominantSeventhSwitch={toggleDominantSeventhSwitch}
        dominantSeventhSwitch={dominantSeventhSwitch}
        toggleMajorSeventhSwitch={toggleMajorSeventhSwitch}
        majorSeventhSwitch={majorSeventhSwitch}
        toggleMinorSeventhSwitch={toggleMinorSeventhSwitch}
        minorSeventhSwitch={minorSeventhSwitch}
        toggleMinorMajorSeventhSwitch={toggleMinorMajorSeventhSwitch}
        minorMajorSeventhSwitch={minorMajorSeventhSwitch}
        toggleAugmentedSeventhSwitch={toggleAugmentedSeventhSwitch}
        augmentedSeventhSwitch={augmentedSeventhSwitch}
        toggleHalfDiminishedSeventhSwitch={toggleHalfDiminishedSeventhSwitch}
        halfDiminishedSeventhSwitch={halfDiminishedSeventhSwitch}
        toggleDiminishedSeventhSwitch={toggleDiminishedSeventhSwitch}
        diminishedSeventhSwitch={diminishedSeventhSwitch}
        selectAllArpeggios={selectAllArpeggios}
      />
    );
  };

  return state?.simpleRandom ? (
    <View>
      <Pressable onPress={debouncedGetNewArpeggio}>
        <LargeScaleDisplay>{currentArpeggio}</LargeScaleDisplay>
      </Pressable>
      <Pressable
        ref={selectionRef}
        hitSlop={1}
        onPress={() => setShowSelectionPopover(true)}
        style={styles.selectionsButton}
      >
        <Text style={styles.selectionsText}>
          {translate('Arpeggio Selections')}
        </Text>
      </Pressable>
      <Popover
        arrowStyle={styles.popoverArrow}
        from={selectionRef}
        isVisible={showSelectionPopover}
        onRequestClose={() => setShowSelectionPopover(false)}
      >
        <ScrollView style={styles.popoverContainer}>
          <ArpeggioSettings />
        </ScrollView>
      </Popover>
    </View>
  ) : (
    <View style={styles.container}>
      <View style={styles.scaleDisplay}>
        <ScaleDisplay>{currentArpeggio}</ScaleDisplay>
      </View>
      <View style={styles.switchesContainer}>
        <ScrollView>
          <ArpeggioSettings />
        </ScrollView>
      </View>
      <View style={styles.mainActionButton}>
        <RandomizeButton
          handler={debouncedGetNewArpeggio}
          accessibilityValue={{ text: `${translate(currentArpeggio)}` }}
          accessibilityHint={translate('Randomizes a new arpeggio')}
          accessibilityRole="button"
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

export default RandomArpeggio;
