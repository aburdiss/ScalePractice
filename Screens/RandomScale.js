import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

import ScaleDisplay from '../Components/ScaleDisplay';
import RandomzieButton from '../Components/RandomizeButton';

/**
 * @description A function that parses what switches are turned on, and
 * generates a random scale based on the user preferences.
 * @author Alexander Burdiss
 * @since 10/11/20
 */
function generateScales () {
  let majorLetterNames = ["C", "D♭", "D", "E♭", "E", "F", "F♯", "G♭", "G", "A♭", "A", "B♭", "B"];
  let minorLetterNames = ["C", "C♯", "D", "D♯", "E♭", "E", "F", "F♯", "G", "G♯", "A", "B♭", "B"];
  let indeterminantLetterNames = ["C", "C♯", "D", "E♭", "E", "F", "F♯", "G", "A♭", "A", "B♭", "B"];

  let pentatonicScaleNames = ["Major Pentatonic", "Minor Pentatonic"];
  let majorModeNames = ["Ionian", "Dorian", "Phrygian", "Lydian", "Mixolydian", "Aeolian", "Locrian"];
  let melodicMinorModeNames = ["Minor Major", "Dorian ♭2", "Lydian Augmented", "Lydian Dominant", "Mixolydian ♭6", "Locrian ♮2", "Altered Scale"];
  let octatonicScaleNames = ["Whole-Half Octatonic", "Half-Whole Octatonic"];
        
  var possibleScales = [];

  console.log("Pressed!");
}


/**
 * @description A View that allows the user to randomize all of the scales in
 * a particular category. 
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const RandomScale = () => {

  const [currentScale, setCurrentScale] = useState("No Scale Selected");

  const [majorSwitch, setMajorSwitch] = useState(true);
  const toggleMajorSwitch = () => setMajorSwitch(previousState => !previousState);

  const [naturalMinorSwitch, setNaturalMinorSwitch] = useState(false);
  const toggleNaturalMinorSwitch = () => setNaturalMinorSwitch(previousState => !previousState);

  const [harmonicMinorSwitch, setHarmonicMinorSwitch] = useState(false);
  const toggleHarmonicMinorSwitch = () => setHarmonicMinorSwitch(previousState => !previousState);

  const [melodicMinorSwitch, setMelodicMinorSwitch] = useState(false);
  const toggleMelodicMinorSwitch = () => setMelodicMinorSwitch(previousState => !previousState);

  const [majorModesSwitch, setMajorModesSwitch] = useState(false);
  const toggleMajorModesSwitch = () => setMajorModesSwitch(previousState => !previousState);

  const [melodicMinorModesSwitch, setMelodicMinorModesSwitch] = useState(false);
  const toggleMelodicMinorModesSwitch = () => setMelodicMinorModesSwitch(previousState => !previousState);

  const [bluesSwitch, setBluesSwitch] = useState(false);
  const toggleBluesSwitch = () => setBluesSwitch(previousState => !previousState);

  const [pentatonicSwitch, setPentatonicSwitch] = useState(false);
  const togglePentatonicSwitch = () => setPentatonicSwitch(previousState => !previousState);

  const [octatonicSwtich, setOctatonicSwitch] = useState(false);
  const toggleOctatonicSwitch = () => setOctatonicSwitch(previousState => !previousState);

  const [wholeToneSwitch, setWholeToneSwitch] = useState(false);
  const toggleWholeToneSwitch = () => setWholeToneSwitch(previousState => !previousState);

  return (
    <View style={ styles.container }>
      <View>
        <ScaleDisplay>{ currentScale }</ScaleDisplay>

        <View style={ styles.switchesContainer }>

          <View style={ styles.switchRow }>
            <Text>Major</Text>
            <Switch
              onValueChange={ toggleMajorSwitch }
              value={ majorSwitch }
            />
          </View>

          <View style={ styles.switchRow }>
            <Text>Natural Minor</Text>
            <Switch
              onValueChange={ toggleNaturalMinorSwitch }
              value={ naturalMinorSwitch }
            />
          </View>

          <View style={ styles.switchRow }>
            <Text>Harmonic Minor</Text>
            <Switch
              onValueChange={ toggleHarmonicMinorSwitch }
              value={ harmonicMinorSwitch }
            />
          </View>

          <View style={ styles.switchRow }>
            <Text>Melodic Minor</Text>
            <Switch
              onValueChange={ toggleMelodicMinorSwitch }
              value={ melodicMinorSwitch }
            />
          </View>

          <View style={ styles.switchRow }>
            <Text>Major Modes</Text>
            <Switch
              onValueChange={ toggleMajorModesSwitch }
              value={ majorModesSwitch }
            />
          </View>

          <View style={ styles.switchRow }>
            <Text>Melodic Minor Modes</Text>
            <Switch
              onValueChange={ toggleMelodicMinorModesSwitch }
              value={ melodicMinorModesSwitch }
            />
          </View>

        </View>
      </View>
      <View>
        <RandomzieButton handler={generateScales} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  switchesContainer: {
    width: '70%',
    alignSelf: 'center',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});

export default RandomScale;
