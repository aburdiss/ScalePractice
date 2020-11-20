import React, { useState } from 'react';
import { Alert, View, Text, Switch } from 'react-native';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic';

import ScaleDisplay from '../Components/ScaleDisplay';
import AllScalesButton from '../Components/AllScalesButton';
import RandomzieButton from '../Components/RandomizeButton';

import { colors } from '../Model/Model';
import { translate } from '../Translations/TranslationModel';

/**
 * @description A view that allows the user to randomize all of the arpeggios
 * in a particular category.
 * @author Alexander Burdiss
 * @since 10/10/20  
 */
const RandomArpeggio = () => {
  const styles = useDynamicValue(dynamicStyles);

  const [currentArpeggio, setCurrentArpeggio] = useState(translate("No Arpeggio Selected"));

  const [majorSwitch, setMajorSwitch] = useState(true);
  const toggleMajorSwitch = () => setMajorSwitch(previousState => !previousState);

  const [minorSwitch, setMinorSwitch] = useState(false);
  const toggleMinorSwitch = () => setMinorSwitch(previousState => !previousState);

  const [augmentedSwitch, setAugmentedSwitch] = useState(false);
  const toggleAugmentedSwitch = () => setAugmentedSwitch(previousState => !previousState);

  const [diminishedSwitch, setDiminishedSwitch] = useState(false);
  const toggleDiminishedSwitch = () => setDiminishedSwitch(previousState => !previousState);

  const [dominantSeventhSwitch, setDominantSeventhSwitch] = useState(false);
  const toggleDominantSeventhSwitch = () => setDominantSeventhSwitch(previousState => !previousState);

  const [majorSeventhSwitch, setMajorSeventhSwitch] = useState(false);
  const toggleMajorSeventhSwitch = () => setMajorSeventhSwitch(previousState => !previousState);

  const [minorSeventhSwitch, setMinorSeventhSwitch] = useState(false);
  const toggleMinorSeventhSwitch = () => setMinorSeventhSwitch(previousState => !previousState);

  const [minorMajorSeventhSwitch, setMinorMajorSeventhSwitch] = useState(false);
  const toggleMinorMajorSeventhSwitch = () => setMinorMajorSeventhSwitch(previousState => !previousState);

  const [augmentedSeventhSwitch, setAugmentedSeventhSwitch] = useState(false);
  const toggleAugmentedSeventhSwitch = () => setAugmentedSeventhSwitch(previousState => !previousState);

  const [halfDiminishedSeventhSwitch, setHalfDiminishedSeventhSwitch] = useState(false);
  const toggleHalfDiminishedSeventhSwitch = () => setHalfDiminishedSeventhSwitch(previousState => !previousState);

  const [diminishedSeventhSwitch, setDiminishedSeventhSwitch] = useState(false);
  const toggleDiminishedSeventhSwitch = () => setDiminishedSeventhSwitch(previousState => !previousState);
 

  /**
   * @description A function that toggles all arpeggio switches to true. If all
   * are currently selected, toggles all off except major.
   * @since 10/14/20
   */
  function selectAllArpeggios () {
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
   * @description A function that parses what switches are turned on, and
   * generates a random arpeggio based on the user preferences.
   * @since 10/13/20
   */
  function generateArpeggios () {

    let possibleArpeggios = [];

    if (majorSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Major"));
    }
    if (minorSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Minor"));
    }
    if (augmentedSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Augmented"));
    }
    if (diminishedSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Diminished"));
    }
    if (dominantSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Dominant Seventh"));
    }
    if (majorSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Major Seventh"));
    }
    if (minorSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Minor Seventh"));
    }
    if (minorMajorSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Minor Major Seventh"));
    }
    if (augmentedSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Augmented Minor Seventh"));
    }
    if (halfDiminishedSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Half Diminished Seventh"));
    }
    if (diminishedSeventhSwitch) {
      possibleArpeggios.push(...createArpeggioArrayFromParts("Diminished Seventh"));
    }

    // Ensuring that the new arpeggio is different from the old one.
    if (possibleArpeggios.length === 0) {
      Alert.alert(
        translate("No Arpeggio Selected"),
        translate("Please select at least one category"),
        [
          {
            text: translate("Dismiss"),
            style: "cancel",
          },
        ],
        { cancelable: true }
      );
    } else {
      let newArpeggio;
      do {
        newArpeggio = possibleArpeggios[Math.floor(Math.random() * possibleArpeggios.length)];
      } while (newArpeggio === currentArpeggio);
      setCurrentArpeggio(newArpeggio ? newArpeggio : translate("No Arpeggio Selected"));
    }
    
  }

  /**
   * @description Constructs the scale name and scale note together to form one
   * string to display on the screen.
   * @since 10/12/20
   * 
   * @param {[String]} letterNames 
   * @param {[String]} scaleNames 
   * @returns [String] array of all transpositions of a scale
   */
  function createArpeggioArrayFromParts ( scaleName ) {
    const letterNames = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];

    let allLetterNamesOfScale = [];
    for (let letter of letterNames) {
      allLetterNamesOfScale.push(`${letter} ${translate(scaleName)}`);
    }
    return allLetterNamesOfScale;
  }


  return (
    <View style={ styles.container }>
      <View>
        <ScaleDisplay>{ currentArpeggio }</ScaleDisplay>
        <View>

          <View style={ styles.switchesContainer }>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Major") }
              </Text>
              <Switch
                onValueChange={ toggleMajorSwitch }
                value={ majorSwitch }
              />
            </View>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Minor") }
              </Text>
              <Switch
                onValueChange={ toggleMinorSwitch }
                value={ minorSwitch }
              />
            </View>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Augmented") }
              </Text>
              <Switch
                onValueChange={ toggleAugmentedSwitch }
                value={ augmentedSwitch }
              />
            </View>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Diminished") }
              </Text>
              <Switch
                onValueChange={ toggleDiminishedSwitch }
                value={ diminishedSwitch }
              />
            </View>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Dominant Seventh") }
              </Text>
              <Switch
                onValueChange={ toggleDominantSeventhSwitch }
                value={ dominantSeventhSwitch }
              />
            </View>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Major Seventh") }
              </Text>
              <Switch
                onValueChange={ toggleMajorSeventhSwitch }
                value={ majorSeventhSwitch }
              />
            </View>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Minor Seventh") }
              </Text>
              <Switch
                onValueChange={ toggleMinorSeventhSwitch }
                value={ minorSeventhSwitch }
              />
            </View>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Minor Major Seventh") }
              </Text>
              <Switch
                onValueChange={ toggleMinorMajorSeventhSwitch }
                value={ minorMajorSeventhSwitch }
              />
            </View>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Augmented Minor Seventh") }
              </Text>
              <Switch
                onValueChange={ toggleAugmentedSeventhSwitch }
                value={ augmentedSeventhSwitch }
              />
            </View>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Half Diminished Seventh") }
              </Text>
              <Switch
                onValueChange={ toggleHalfDiminishedSeventhSwitch }
                value={ halfDiminishedSeventhSwitch }
              />
            </View>

            <View style={ styles.switchRow }>
              <Text
                style={ styles.switchText }
              >
                { translate("Diminished Seventh") }
              </Text>
              <Switch
                onValueChange={ toggleDiminishedSeventhSwitch }
                value={ diminishedSeventhSwitch }
              />
            </View>

            <AllScalesButton handler={ selectAllArpeggios }>
              { translate("All Arpeggios") }
            </AllScalesButton>

          </View>
        </View>
      </View>
      <View>
        <RandomzieButton
          handler={ generateArpeggios }
          accessibilityValue={{text: `${translate(currentArpeggio)}`}}
        />
      </View>
    </View>
  );
};


/**
 * @description Styles for RandomScale component.
 */
const dynamicStyles = new DynamicStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
  switchesContainer: {
    width: '70%',
    alignSelf: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  switchText: {
    color: new DynamicValue(colors.black, colors.white),
  },
});

export default RandomArpeggio;
