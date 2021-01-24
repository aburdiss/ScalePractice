import React, {useState} from 'react';
import {Alert, View, Text, FlatList} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import RandomizeButton from '../Components/RandomizeButton';
import ScaleDisplay from '../Components/ScaleDisplay';
import SwipeableRow from '../Components/SwipeableRow';
import AddToListButton from '../Components/AddToListButton';
import ResetButton from '../Components/ResetButton';
import ScalePickers from './ScalePickers';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

/**
 * @description A view that allows the user to randomize between a list of
 * selected scales.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 1.1.0
 * 
 * @component
 * @example
 * ```jsx
<Advanced Scale />
```
 */
const AdvancedScale = () => {
  const styles = useDynamicValue(dynamicStyles);
  const [possibleScales, setPossibleScales] = useState([]);
  const [currentScale, setCurrentScale] = useState(
    translate('No Scale Selected'),
  );
  const [selectedNote, setSelectedNote] = useState('C');
  const [selectedScale, setSelectedScale] = useState(translate('Major'));

  const noteNames = [
    'C',
    'C♯',
    'D♭',
    'D',
    'D♯',
    'E♭',
    'E',
    'F',
    'F♯',
    'G♭',
    'G',
    'G♯',
    'A♭',
    'A',
    'A♯',
    'B♭',
    'B',
  ];
  const scaleNames = [
    'Major',
    'Natural Minor',
    'Harmonic Minor',
    'Melodic Minor',
    'Ionian',
    'Dorian',
    'Phrygian',
    'Lydian',
    'Mixolydian',
    'Aeolian',
    'Locrian',
    'Minor Major',
    'Dorian ♭2',
    'Lydian Augmented',
    'Lydian Dominant',
    'Mixolydian ♭6',
    'Locrian ♮2',
    'Altered Scale',
    'Blues',
    'Major Pentatonic',
    'Minor Pentatonic',
    'Whole-Half Octatonic',
    'Half-Whole Octatonic',
    'Whole Tone',
  ];

  /**
   * @function AdvancedScale~addToScaleList
   * @description Adds the currently selected scale from the pickers to the
   * list of scales. Alerts the user if the scale is already in the list.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   */
  const addToScaleList = () => {
    let scaleAlreadyInList = false;
    const newScale = `${selectedNote} ${selectedScale}`;
    if (possibleScales.includes(newScale)) {
      scaleAlreadyInList = true;
    }
    if (!scaleAlreadyInList) {
      setPossibleScales([newScale, ...possibleScales]);
    } else {
      Alert.alert(translate('Scale Already Selected'));
    }
  };

  /**
   * @function AdvancedScale~generateScale
   * @description Generates a random scale from the user selected list of
   * scales.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   */
  const generateScale = () => {
    if (possibleScales.length === 0) {
      Alert.alert(
        translate('No Scale Selected'),
        translate('Please select at least one scale'),
      );
    } else {
      let newScale =
        possibleScales[Math.floor(Math.random() * possibleScales.length)];
      if (possibleScales.length > 1) {
        do {
          newScale =
            possibleScales[Math.floor(Math.random() * possibleScales.length)];
        } while (newScale === currentScale);
      }
      setCurrentScale(newScale ? newScale : 'No Scale Selected');
    }
  };

  /**
   * @function AdvancedScale~removeAllScales
   * @description Removes all scales from the user created list of scales.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   */
  const removeAllScales = () => {
    setPossibleScales([]);
  };

  /**
   * @function AdvancedScale~deleteElement
   * @description Removes the inputted element from the current user selected
   * list of scales.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   * @param {string} element
   */
  const deleteElement = (element) => {
    let temporaryScales = [...possibleScales];
    let index = temporaryScales.indexOf(element);
    if (index !== -1) {
      temporaryScales.splice(index, 1);
    }
    setPossibleScales(temporaryScales);
  };

  return (
    <View style={styles.container}>
      <ScaleDisplay>{currentScale}</ScaleDisplay>
      <ScalePickers
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        noteNames={noteNames}
        selectedScale={selectedScale}
        setSelectedScale={setSelectedScale}
        scaleNames={scaleNames}
      />
      <View style={styles.buttonContainer}>
        <ResetButton handler={removeAllScales} />
        <AddToListButton handler={addToScaleList} />
      </View>
      <FlatList
        style={styles.list}
        data={possibleScales}
        renderItem={({item}) => (
          <SwipeableRow styles={styles} delete={deleteElement} item={item}>
            <View style={styles.listItemContainer}>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            </View>
          </SwipeableRow>
        )}
        keyExtractor={(item) => item}
      />
      <RandomizeButton
        handler={generateScale}
        accessibilityValue={{text: `${currentScale}`}}
      />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
  list: {
    flex: 1,
  },
  listItemContainer: {
    paddingLeft: 20,
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
  },
  listItemText: {
    paddingVertical: 15,
    color: new DynamicValue(colors.black, colors.white),
  },
  listItemTextContainer: {
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderBottomWidth: 1,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: new DynamicValue(colors.redLight, colors.redDark),
    flex: 1,
    justifyContent: 'flex-end',
  },
  trashIcon: {
    paddingRight: 10,
  },
});

export default AdvancedScale;
