import React, {useState, useContext, useEffect} from 'react';
import {Alert, View, Text, FlatList} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import {shuffle} from 'underscore';

import RandomizeButton from '../../Components/RandomizeButton/RandomizeButton';
import ScaleDisplay from '../../Components/ScaleDisplay/ScaleDisplay';
import SwipeableRow from '../../Components/SwipeableRow/SwipeableRow';
import AddToListButton from '../../Components/AddToListButton/AddToListButton';
import ResetButton from '../../Components/ResetButton/ResetButton';
import ScalePickers from '../ScalePickers/ScalePickers';
import {colors, allScaleNames, allNoteNames} from '../../Model/Model';
import {PreferencesContext} from '../../Model/Preferences';
import {getIsSmallScreen} from '../../Model/Utilities';
import {translate} from '../../Translations/TranslationModel';

/**
 * @description A view that allows the user to randomize between a list of
 * selected scales.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 2.0.0
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
  const [scaleArrayIndex, setScaleArrayIndex] = useState(0);
  const [randomScaleArray, setRandomScaleArray] = useState([]);
  const [currentScale, setCurrentScale] = useState(
    translate('No Scale Selected'),
  );
  const [selectedNote, setSelectedNote] = useState('C');
  const [selectedScale, setSelectedScale] = useState(translate('Major'));
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const {state} = useContext(PreferencesContext);

  useEffect(
    /**
     * @function AdvancedScale~useEffect~setupComponent
     * @description Provides some inital state when the component first mounts
     * @author Alexander Burdiss
     * @since 2/28/21
     * @version 1.0.0
     */
    function setupComponent() {
      setIsSmallScreen(getIsSmallScreen());
    },
    [],
  );

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
      setRandomScaleArray(shuffle([newScale, ...possibleScales]));
      setScaleArrayIndex(0);
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
      if (state.repeat) {
        let newScale =
          possibleScales[Math.floor(Math.random() * possibleScales.length)];
        if (possibleScales.length > 1) {
          do {
            newScale =
              possibleScales[Math.floor(Math.random() * possibleScales.length)];
          } while (newScale === currentScale);
        }
        setCurrentScale(newScale ? newScale : 'No Scale Selected');
      } else {
        // Don't repeat scales
        if (scaleArrayIndex >= possibleScales.length) {
          Alert.alert('All scaled practiced!', '', [
            {
              onPress: () => {
                setScaleArrayIndex(1);
                const newScaleArray = shuffle(randomScaleArray);
                setRandomScaleArray(newScaleArray);
                setCurrentScale(newScaleArray[0]);
              },
            },
          ]);
        } else {
          setCurrentScale(randomScaleArray[scaleArrayIndex]);
          setScaleArrayIndex((previous) => previous + 1);
        }
      }
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
    setRandomScaleArray(shuffle(temporaryScales));
    setScaleArrayIndex(0);
  };

  return (
    <View style={styles.container}>
      <ScaleDisplay>{currentScale}</ScaleDisplay>
      <ScalePickers
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        noteNames={allNoteNames}
        selectedScale={selectedScale}
        setSelectedScale={setSelectedScale}
        scaleNames={allScaleNames}
      />
      {!isSmallScreen ? (
        <View style={styles.buttonContainer}>
          <ResetButton handler={removeAllScales} />
          <AddToListButton handler={addToScaleList} />
        </View>
      ) : null}
      <FlatList
        style={styles.list}
        data={possibleScales}
        renderItem={({item}) => (
          <SwipeableRow styles={styles} deleteItem={deleteElement} item={item}>
            <View style={styles.listItemContainer}>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            </View>
          </SwipeableRow>
        )}
        keyExtractor={(item) => item}
      />
      {isSmallScreen ? (
        <View style={styles.smallScreenButtonContainer}>
          <ResetButton handler={removeAllScales} />
          <RandomizeButton
            handler={generateScale}
            accessibilityValue={{text: `${currentScale}`}}
          />
          <AddToListButton handler={addToScaleList} />
        </View>
      ) : (
        <View style={styles.mainActionButton}>
          <RandomizeButton
            handler={generateScale}
            accessibilityValue={{text: `${currentScale}`}}
          />
        </View>
      )}
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
  list: {
    flex: 1,
    borderTopColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderTopWidth: 1,
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
  mainActionButton: {
    borderTopColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderTopWidth: 1,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: new DynamicValue(colors.redLight, colors.redDark),
    flex: 1,
    justifyContent: 'flex-end',
  },
  smallScreenButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
    borderTopWidth: 1,
  },
  trashIcon: {
    paddingRight: 10,
  },
});

export default AdvancedScale;
