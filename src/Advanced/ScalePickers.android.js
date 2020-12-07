import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDarkMode } from 'react-native-dynamic';

import { colors } from '../Model/Model';
import { translate } from '../Translations/TranslationModel';
import { color } from 'react-native-reanimated';

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
          borderColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
          margin: 4,
          borderRadius: 8,
        }}
      >
        <Picker
          selectedValue={selectedNote}
          dropdownIconColor={DARKMODE ? '#bf5af2' : '#af52de'}
          onValueChange={(itemValue, itemIndex) => setSelectedNote(itemValue)}
        >
          {
            noteNames.map(noteName => (
              <Picker.Item label={noteName} value={noteName} key={noteName} color={DARKMODE ? colors.purpleDark : colors.purpleLight} />
            ))
          }
        </Picker>
      </View>
      <View
        style={{
          borderWidth: 1,
          borderColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
          margin: 4,
          borderRadius: 8,
        }}
      >
        <Picker
          selectedValue={selectedScale}
          dropdownIconColor={DARKMODE ? '#bf5af2' : '#af52de'}
          onValueChange={(itemValue, itemIndex) => setSelectedScale(itemValue)}
        >
          {
            scaleNames.map(scaleName => (
              <Picker.Item label={translate(scaleName)} value={translate(scaleName)} key={scaleName} color={DARKMODE ? colors.purpleDark : colors.purpleLight} />
            ))
          }
        </Picker>
      </View>
    </View>
  );
};

export default ScalePickers;
