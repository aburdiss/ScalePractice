import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const ScalePickers = ({ 
  selectedNote, 
  setSelectedNote, 
  noteNames, 
  selectedScale, 
  setSelectedScale, 
  scaleNames 
}) => {
  return (
    <View style={styles.pickerContainer}>
      <View style={[
        {
          width: '25%',
        },
        styles.picker
      ]}>
        <Picker
          selectedValue={selectedNote}
          onValueChange={(itemValue, itemIndex) => setSelectedNote(itemValue)}
        >
          {
            noteNames.map(noteName => (
              <Picker.Item label={noteName} value={noteName} key={noteName} />
            ))
          }
        </Picker>
      </View>
      <View style={[
        {
          width: '75%',
        },
        styles.picker
      ]}>
        <Picker
          selectedValue={selectedScale}
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

const styles = StyleSheet.create({
  picker: {
  },
  pickerContainer: {
    flexDirection: 'row',
  },
});

export default ScalePickers;