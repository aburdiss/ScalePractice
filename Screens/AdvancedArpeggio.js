import React, { useState, Component } from 'react';
import { Alert, View, Text, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RandomizeButton from '../Components/RandomizeButton';
import ScaleDisplay from '../Components/ScaleDisplay';
import AddToListButton from '../Components/AddToListButton';
import ResetButton from '../Components/ResetButton';


class SwipeableRow extends Component {
  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton style={styles.rightAction} onPress={() => this.props.delete(this.props.item)}>
        <Ionicons
          name="trash"
          size={20}
          style={styles.trashIcon}
          color="#fff"
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
const AdvancedArpeggio = () => {
  const noteNames = ["C", "C♯", "D♭", "D", "D♯", "E♭", "E", "F", "F♯", "G♭", "G", "G♯", "A♭", "A", "A♯", "B♭", "B"];
  const arpeggioNames = ["Major", "Minor", "Augmented", "Diminished", "Dominant Seventh", "Major Seventh", "Minor Seventh", "Minor Major Seventh", "Augmented Minor Seventh", "Half Diminished Seventh", "Diminished Seventh"];

  const [possibleArpeggios, setpossibleArpeggios] = useState([]);
  const [currentScale, setCurrentScale] = useState("No Arpeggio Selected");

  const [selectedNote, setSelectedNote] = useState('C');
  const [selectedArpeggio, setSelectedArpeggio] = useState('Major');

  const addToArpeggioList = () => {
    let arpeggioAlreadyInList = false;
    const newArpeggio = `${selectedNote} ${selectedArpeggio}`;
    if (possibleArpeggios.includes(newArpeggio)) {
      arpeggioAlreadyInList = true;
    }
    if (!arpeggioAlreadyInList) {
      setpossibleArpeggios([newArpeggio, ...possibleArpeggios]);
    } else {
      Alert.alert(
        "Arpeggio Already in List",
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

  const generateArpeggio = () => {
    if (possibleArpeggios.length === 0) {
      Alert.alert(
        "No Arpeggio Selected",
        "Please select at least one arpeggio",
        [
          {
            text: "Return",
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      let newArpeggio = possibleArpeggios[Math.floor(Math.random() * possibleArpeggios.length)];
      if (possibleArpeggios.length > 1) {
        do {
          newArpeggio = possibleArpeggios[Math.floor(Math.random() * possibleArpeggios.length)];
        } while (newArpeggio === currentScale);
      }
      setCurrentScale(newArpeggio ? newArpeggio : "No Arpeggio Selected");
    }
  }

  const removeAllScales = () => {
    setpossibleArpeggios([]);
  }

  const deleteElement = (element) => {
    let temporaryArpeggios = [...possibleArpeggios];
    let index = temporaryArpeggios.indexOf(element);
    if (index !== -1) {
      temporaryArpeggios.splice(index, 1);
    }
    setpossibleArpeggios(temporaryArpeggios);
  }

  return (
    <View style={styles.container}>
      <ScaleDisplay>{ currentScale }</ScaleDisplay>
      <View style={styles.pickerContainer}>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedNote}
            dropdownIconColor="#800080"
            onValueChange={(itemValue, itemIndex) => setSelectedNote(itemValue)}
            >
            {
              noteNames.map(noteName => (
                <Picker.Item label={noteName} value={noteName} key={noteName} />
                ))
              }
          </Picker>
        </View>
        <View style={styles.picker}>
          <Picker
            selectedValue={selectedArpeggio}
            dropdownIconColor="#800080"
            onValueChange={(itemValue, itemIndex) => setSelectedArpeggio(itemValue)}
            >
            {
              arpeggioNames.map(arpeggioName => (
                <Picker.Item label={arpeggioName} value={arpeggioName} key={arpeggioName} />
                ))
              }
          </Picker>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <ResetButton handler={removeAllScales} />
        <AddToListButton handler={addToArpeggioList} />
      </View>
      <FlatList
        style={styles.list}
        data={possibleArpeggios}
        renderItem={({ item }) => (
          <SwipeableRow delete={deleteElement} item={item}>
            <View style={styles.listItemContainer}>
              <Text style={styles.listItemText}>{item}</Text>
            </View>
          </SwipeableRow>
        )}
        keyExtractor={item => item}
      />
      <RandomizeButton handler={generateArpeggio} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20
  },
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  listItemContainer: {
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  listItemText: {
    borderTopColor: 'gray',
    borderTopWidth: 1,
    paddingVertical: 15,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    margin: 4,
    borderRadius: 8,
  },
  pickerContainer: {
    paddingHorizontal: 26,
  },
  rightAction: {
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#dd2c00',
    flex: 1,
    justifyContent: 'flex-end'
  },
  trashIcon: {
    paddingRight: 10,
  }
});

export default AdvancedArpeggio;