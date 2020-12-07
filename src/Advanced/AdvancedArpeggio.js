import React, {useState, Component} from 'react';
import {Alert, View, Text, FlatList} from 'react-native';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import RandomizeButton from '../Components/RandomizeButton';
import ScaleDisplay from '../Components/ScaleDisplay';
import AddToListButton from '../Components/AddToListButton';
import ResetButton from '../Components/ResetButton';
import ScalePickers from './ScalePickers';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

class SwipeableRow extends Component {
  renderRightActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: 'clamp',
    });
    return (
      <RectButton
        style={this.props.styles.rightAction}
        onPress={() => this.props.delete(this.props.item)}
        // TODO: Add Accessibility Label and translate
      >
        <Ionicons
          name="trash"
          size={20}
          style={this.props.styles.trashIcon}
          color={colors.white}
        />
      </RectButton>
    );
  };
  render() {
    const {children} = this.props;
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
  const styles = useDynamicValue(dynamicStyles);

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

  const [possibleArpeggios, setpossibleArpeggios] = useState([]);
  const [currentArpeggio, setCurrentArpeggio] = useState(
    translate('No Arpeggio Selected'),
  );

  const [selectedNote, setSelectedNote] = useState('C');
  const [selectedArpeggio, setSelectedArpeggio] = useState(translate('Major'));

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
        translate('Arpeggio Already Selected'),
        '',
        [
          {
            text: translate('Dismiss'),
            style: 'cancel',
          },
        ],
        {cancelable: true},
      );
    }
  };

  const generateArpeggio = () => {
    if (possibleArpeggios.length === 0) {
      Alert.alert(
        translate('No Arpeggio Selected'),
        translate('Please select at least one arpeggio'),
        [
          {
            text: translate('Dismiss'),
            style: 'cancel',
          },
        ],
        {cancelable: true},
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

  const removeAllScales = () => {
    setpossibleArpeggios([]);
  };

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
