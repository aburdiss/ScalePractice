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
          selectedValue={selectedScale}
          dropdownIconColor="#800080"
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
    borderWidth: 1,
    borderColor: 'gray',
    margin: 4,
    borderRadius: 8,
  },
  pickerContainer: {
    paddingHorizontal: 26,
  },
});

export default ScalePickers;