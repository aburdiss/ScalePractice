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
import AddToListButton from '../../Components/AddToListButton/AddToListButton';
import ResetButton from '../../Components/ResetButton/ResetButton';
import SwipeableRow from '../../Components/SwipeableRow/SwipeableRow';
import ScalePickers from '../ScalePickers/ScalePickers';
import {colors, allNoteNames, allArpeggioNames} from '../../Model/Model';
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
<AdvancedArpeggio />
```
 */
const AdvancedArpeggio = () => {
  const styles = useDynamicValue(dynamicStyles);
  const [possibleArpeggios, setpossibleArpeggios] = useState([]);
  const [arpeggioArrayIndex, setArpeggioArrayIndex] = useState(0);
  const [randomArpeggioArray, setRandomArpeggioArray] = useState([]);
  const [currentArpeggio, setCurrentArpeggio] = useState(
    translate('No Arpeggio Selected'),
  );
  const [selectedNote, setSelectedNote] = useState('C');
  const [selectedArpeggio, setSelectedArpeggio] = useState(translate('Major'));
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const {state} = useContext(PreferencesContext);

  useEffect(
    /**
     * @function AdvancedArpeggio~useEffect~setupComponent
     * @description Provides some initial state when the component mounts
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
   * @function AdvancedArpeggio~addToArpeggioList
   * @description Adds the currently selected arpeggio to the list.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   */
  const addToArpeggioList = () => {
    let arpeggioAlreadyInList = false;
    const newArpeggio = `${selectedNote} ${selectedArpeggio}`;
    if (possibleArpeggios.includes(newArpeggio)) {
      arpeggioAlreadyInList = true;
    }
    if (!arpeggioAlreadyInList) {
      setpossibleArpeggios([newArpeggio, ...possibleArpeggios]);
      setRandomArpeggioArray(shuffle([newArpeggio, ...possibleArpeggios]));
      setArpeggioArrayIndex(0);
    } else {
      Alert.alert(translate('Arpeggio Already Selected'));
    }
  };

  /**
   * @function AdvancedArpeggio~generateArpeggio
   * @description Checks the current list of scales, and picks a random
   * selection from the list.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   */
  const generateArpeggio = () => {
    if (possibleArpeggios.length === 0) {
      Alert.alert(
        translate('No Arpeggio Selected'),
        translate('Please select at least one arpeggio'),
      );
    } else {
      if (state.repeat) {
        let newArpeggio =
          possibleArpeggios[
            Math.floor(Math.random() * possibleArpeggios.length)
          ];
        if (possibleArpeggios.length > 1) {
          do {
            newArpeggio =
              possibleArpeggios[
                Math.floor(Math.random() * possibleArpeggios.length)
              ];
          } while (newArpeggio === currentArpeggio);
        }
        setCurrentArpeggio(
          newArpeggio ? newArpeggio : translate('No Arpeggio Selected'),
        );
      } else {
        // Don't repeat Arpeggios
        if (arpeggioArrayIndex >= possibleArpeggios.length) {
          Alert.alert('All arpeggios practiced!', '', [
            {
              onPress: () => {
                setArpeggioArrayIndex(1);
                const newArpeggioArray = shuffle(randomArpeggioArray);
                setRandomArpeggioArray(newArpeggioArray);
                setCurrentArpeggio(newArpeggioArray[0]);
              },
            },
          ]);
        } else {
          setCurrentArpeggio(randomArpeggioArray[arpeggioArrayIndex]);
          setArpeggioArrayIndex((previous) => previous + 1);
        }
      }
    }
  };

  /**
   * @function AdvancedArpeggio~removeAllScales
   * @description Removes all scales from the current user selected list.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   */
  const removeAllScales = () => {
    setpossibleArpeggios([]);
  };

  /**
   * @function AdvancedArpeggio~deleteElement
   * @description Removes the inputted element from the list of elements
   * currently in state.
   * @author Alexander Burdiss
   * @since 11/9/20
   * @version 1.0.1
   * @param {string} element The element to remove from the list.
   */
  const deleteElement = (element) => {
    let temporaryArpeggios = [...possibleArpeggios];
    let index = temporaryArpeggios.indexOf(element);
    if (index !== -1) {
      temporaryArpeggios.splice(index, 1);
    }
    setpossibleArpeggios(temporaryArpeggios);
    setRandomArpeggioArray(shuffle(temporaryArpeggios));
    setArpeggioArrayIndex(0);
  };

  return (
    <View style={styles.container}>
      <ScaleDisplay>{currentArpeggio}</ScaleDisplay>
      <ScalePickers
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        noteNames={allNoteNames}
        selectedScale={selectedArpeggio}
        setSelectedScale={setSelectedArpeggio}
        scaleNames={allArpeggioNames}
      />
      {!isSmallScreen ? (
        <View style={styles.buttonContainer}>
          <ResetButton handler={removeAllScales} />
          <AddToListButton handler={addToArpeggioList} />
        </View>
      ) : null}
      <FlatList
        style={styles.list}
        data={possibleArpeggios}
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
            handler={generateArpeggio}
            accessibilityValue={{text: `${translate(currentArpeggio)}`}}
          />
          <AddToListButton handler={addToArpeggioList} />
        </View>
      ) : (
        <View style={styles.mainActionButton}>
          <RandomizeButton
            handler={generateArpeggio}
            accessibilityValue={{text: `${translate(currentArpeggio)}`}}
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

export default AdvancedArpeggio;
