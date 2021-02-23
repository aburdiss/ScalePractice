import React, {useState} from 'react';
import {Alert, View, Text, FlatList} from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import RandomizeButton from '../Components/RandomizeButton';
import ScaleDisplay from '../Components/ScaleDisplay';
import AddToListButton from '../Components/AddToListButton';
import ResetButton from '../Components/ResetButton';
import SwipeableRow from '../Components/SwipeableRow';
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
<AdvancedArpeggio />
```
 */
const AdvancedArpeggio = () => {
  const styles = useDynamicValue(dynamicStyles);
  const [possibleArpeggios, setpossibleArpeggios] = useState([]);
  const [currentArpeggio, setCurrentArpeggio] = useState(
    translate('No Arpeggio Selected'),
  );
  const [selectedNote, setSelectedNote] = useState('C');
  const [selectedArpeggio, setSelectedArpeggio] = useState(translate('Major'));

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
  const arpeggioNames = [
    'Major',
    'Minor',
    'Augmented',
    'Diminished',
    'Dominant Seventh',
    'Major Seventh',
    'Minor Seventh',
    'Minor Major Seventh',
    'Augmented Minor Seventh',
    'Half Diminished Seventh',
    'Diminished Seventh',
  ];

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
      let newArpeggio =
        possibleArpeggios[Math.floor(Math.random() * possibleArpeggios.length)];
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
  };

  return (
    <View style={styles.container}>
      <ScaleDisplay>{currentArpeggio}</ScaleDisplay>
      <ScalePickers
        selectedNote={selectedNote}
        setSelectedNote={setSelectedNote}
        noteNames={noteNames}
        selectedScale={selectedArpeggio}
        setSelectedScale={setSelectedArpeggio}
        scaleNames={arpeggioNames}
      />
      <View style={styles.buttonContainer}>
        <ResetButton handler={removeAllScales} />
        <AddToListButton handler={addToArpeggioList} />
      </View>
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
      <RandomizeButton
        handler={generateArpeggio}
        accessibilityValue={{text: `${translate(currentArpeggio)}`}}
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

export default AdvancedArpeggio;
