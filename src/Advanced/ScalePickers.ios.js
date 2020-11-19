import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDarkMode } from 'react-native-dynamic';

import { colors } from '../Model';

const ScalePickers = ({ 
  selectedNote, 
  setSelectedNote, 
  noteNames, 
  selectedScale, 
  setSelectedScale, 
  scaleNames 
}) => {
  const DARKMODE = useDarkMode();
  return (
    <View style={{
      flexDirection: 'row',
    }}>
      <View
        style={{
          width: '25%',
        }}
      >
        <Picker
          selectedValue={selectedNote}
          onValueChange={(itemValue, itemIndex) => setSelectedNote(itemValue)}
          itemStyle={{
            color: DARKMODE ? colors.white : colors.black,
          }}
        >
          {
            noteNames.map(noteName => (
              <Picker.Item label={noteName} value={noteName} key={noteName} />
            ))
          }
        </Picker>
      </View>
      <View
        style={{
          width: '75%',
        }}
      >
        <Picker
          selectedValue={selectedScale}
          onValueChange={(itemValue, itemIndex) => setSelectedScale(itemValue)}
          itemStyle={{
            color: DARKMODE ? colors.white : colors.black,
          }}
        >
          {
            scaleNames.map(scaleName => (
              <Picker.Item label={scaleName} value={scaleName} key={scaleName} />
            ))
          }
        </Picker>
      </View>
    </View>
  );
};

export default ScalePickers;
