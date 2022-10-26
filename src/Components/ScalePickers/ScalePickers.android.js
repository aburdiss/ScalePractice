import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description Pickers used on android devices to select scales. Used on
 * AdvancedScale and AdvancedArpeggio components.
 * Created 11/15/20
 * @copyright Alexander Burdiss
 * @author Alexander Burdiss
 * @since 10/25/22
 * @version 1.0.2
 * @param {Object} props JSX props passed to this React Component
 * @param {string} props.selectedNote The currently selected note to be shown
 * on the note name picker
 * @param {Function} props.setSelectedNote A function to update the state
 * variable props.selectedNote
 * @param {string[]} props.noteNames All possible note names to be shown on
 * the note name picker
 * @param {string} props.selectedScale The currently selected scale to be shown
 * on the scale picker
 * @param {Function} props.setSelectedScale A function to update the state
 * variable props.selectedScale
 * @param {string[]} props.scaleNames All possible scale names to be shown on
 * the scale picker
 *
 * @example
 * <ScalePickers
 *   selectedNote={selectedNote}
 *   setSelectedNote={setSelectedNote}
 *   noteNames={noteNames}
 *   selectedScale={selectedScale}
 *   setSelectedScale={setSelectedScale}
 *   scaleNames={scaleNames}
 * />
 */
export default function ScalePickers({
  selectedNote,
  setSelectedNote,
  noteNames,
  selectedScale,
  setSelectedScale,
  scaleNames,
}) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 26,
    },
    leftPicker: {
      borderWidth: 1,
      borderColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
      margin: 4,
      borderRadius: 8,
    },
    rightPicker: {
      borderWidth: 1,
      borderColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
      margin: 4,
      borderRadius: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.leftPicker}>
        <Picker
          selectedValue={selectedNote}
          dropdownIconColor={DARKMODE ? '#bf5af2' : '#af52de'}
          onValueChange={(itemValue, itemIndex) => setSelectedNote(itemValue)}
        >
          {noteNames.map((noteName) => (
            <Picker.Item
              label={noteName}
              value={noteName}
              key={noteName}
              color={DARKMODE ? colors.purpleDark : colors.purpleLight}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.rightPicker}>
        <Picker
          selectedValue={selectedScale}
          dropdownIconColor={DARKMODE ? '#bf5af2' : '#af52de'}
          onValueChange={(itemValue, itemIndex) => setSelectedScale(itemValue)}
        >
          {scaleNames.map((scaleName) => (
            <Picker.Item
              label={translate(scaleName)}
              value={translate(scaleName)}
              key={scaleName}
              color={DARKMODE ? colors.purpleDark : colors.purpleLight}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}
