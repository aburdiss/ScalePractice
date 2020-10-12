import React, { useState } from 'react';
import { Alert, View, Text, Switch, StyleSheet } from 'react-native';

import ScaleDisplay from '../Components/ScaleDisplay';
import AllScalesButton from '../Components/AllScalesButton';
import RandomzieButton from '../Components/RandomizeButton';


/**
 * @description A view that allows the user to randomize all of the arpeggios
 * in a particular category.
 * @author Alexander Burdiss
 * @since 10/10/20  
 */
const RandomArpeggio = () => {

  const [currentScale, setCurrentScale] = useState("No Scale Selected");

  function selectAllScales () {

  }

  function generateScales () {
    
  }

  return (
    <View style={ styles.container }>
      <View>
        <ScaleDisplay>{ currentScale }</ScaleDisplay>
        <View>

          <AllScalesButton handler={ selectAllScales }>All Scales</AllScalesButton>

        </View>
      </View>
      <View>
        <RandomzieButton handler={ generateScales } />
      </View>
    </View>
  );
};


/**
 * @description Styles for RandomScale component.
 */
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
    paddingVertical: 4,
  }
});


export default RandomArpeggio;