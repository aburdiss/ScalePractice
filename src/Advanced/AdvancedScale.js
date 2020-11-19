import React, { useState, Component } from 'react';
import { Alert, View, Text, FlatList } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic';

import RandomizeButton from '../Components/RandomizeButton';
import ScaleDisplay from '../Components/ScaleDisplay';
import AddToListButton from '../Components/AddToListButton';
import ResetButton from '../Components/ResetButton';
import ScalePickers from './ScalePickers';

import { colors } from '../Model/Model';

class SwipeableRow extends Component {
  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={this.props.styles.rightAction} onPress={() => this.props.delete(this.props.item)}>
        <Ionicons
          name="trash"
          size={20}
          style={this.props.styles.trashIcon}
          color={colors.white}
        />
      </RectButton>
    );
  }
  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        rightThreshold={41}
        renderRightActions={this.renderRightActions}>
        {children}
      </Swipeable>
    );
  }
}



/**
 * @description A view that allows the user to randomize between a list of 
 * selected scales.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const AdvancedScale = () => {
  const styles = useDynamicValue(dynamicStyles);

  const noteNames = ["C", "C♯", "D♭", "D", "D♯", "E♭", "E", "F", "F♯", "G♭", "G", "G♯", "A♭", "A", "A♯", "B♭", "B"];
  const scaleNames = ["Major", "Natural Minor", "Harmonic Minor", "Melodic Minor", "Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian", "Minor Major", "Dorian ♭2", "Lydian Augmented", "Lydian Dominant", "Mixolydian ♭6", "Locrian ♮2", "Altered Scale", "Blues", "Major Pentatonic", "Minor Pentatonic", "Whole-Half Octatonic", "Half-Whole Octatonic", "Whole Tone"];

  const [possibleScales, setPossibleScales] = useState([]);
  const [currentScale, setCurrentScale] = useState("No Scale Selected");

  const [selectedNote, setSelectedNote] = useState('C');
  const [selectedScale, setSelectedScale] = useState('Major');

  const addToScaleList = () => {
    let scaleAlreadyInList = false;
    const newScale = `${selectedNote} ${selectedScale}`;
    if (possibleScales.includes(newScale)) {
      scaleAlreadyInList = true;
    }
    if (!scaleAlreadyInList) {
      setPossibleScales([newScale, ...possibleScales]);
    } else {
      Alert.alert(
        "Scale Already in List",
        "",
        [
          {
            text: "Return",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    }
    
  }

  const generateScale = () => {
    if (possibleScales.length === 0) {
      Alert.alert(
        "No Scale Selected",
        "Please select at least one scale",
        [
          {
            text: "Return",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      let newScale = possibleScales[Math.floor(Math.random() * possibleScales.length)];
      if (possibleScales.length > 1) {
        do {
          newScale = possibleScales[Math.floor(Math.random() * possibleScales.length)];
        } while (newScale === currentScale);
      }
      setCurrentScale(newScale ? newScale : "No Scale Selected");
    }
  }

  const removeAllScales = () => {
    setPossibleScales([]);
  }

  const deleteElement = (element) => {
    let temporaryScales = [...possibleScales];
    let index = temporaryScales.indexOf(element);
    if (index !== -1) {
      temporaryScales.splice(index, 1);
    }
    setPossibleScales(temporaryScales);
  }

  return (
    <View style={styles.container}>
      <ScaleDisplay>{ currentScale }</ScaleDisplay>
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
        renderItem={({ item }) => (
          <SwipeableRow styles={styles} delete={deleteElement} item={item}>
            <View style={styles.listItemContainer}>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.listItemText}>{item}</Text>
              </View>
            </View>
          </SwipeableRow>
        )}
        keyExtractor={item => item}
      />
      <RandomizeButton handler={generateScale} />
    </View>
  );
};


const dynamicStyles = new DynamicStyleSheet({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
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
    borderBottomColor: new DynamicValue(colors.systemGray5Light, colors.systemGray5Dark),
    borderBottomWidth: 1,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: new DynamicValue(colors.redLight, colors.redDark),
    flex: 1,
    justifyContent: 'flex-end'
  },
  trashIcon: {
    paddingRight: 10,
  }
});

export default AdvancedScale;