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
    <View
      style={{
        paddingHorizontal: 26,
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: DARKMODE ? colors.systemGray2Dark : colors.systemGray2Light,
          margin: 4,
          borderRadius: 8,
        }}
      >
        <Picker
          selectedValue={selectedNote}
          dropdownIconColor={DARKMODE ? colors.purpleDark : colors.purpleLight}
          onValueChange={(itemValue, itemIndex) => setSelectedNote(itemValue)}
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
          borderWidth: 1,
          borderColor: 'gray',
          margin: 4,
          borderRadius: 8,
        }}
      >
        <Picker
          selectedValue={selectedScale}
          dropdownIconColor={DARKMODE ? colors.purpleDark : colors.purpleDark}
          onValueChange={(itemValue, itemIndex) => setSelectedScale(itemValue)}
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
