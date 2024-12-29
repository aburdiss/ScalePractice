import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @function ScalePickersIos
 * @component
 * @description Pickers used on iOS devices to select scales. Used on
 * AdvancedScale and AdvancedArpeggio components.
 * Created 11/15/20
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
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 1.0.2
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
export default function ScalePickersIos({
  selectedNote,
  setSelectedNote,
  noteNames,
  selectedScale,
  setSelectedScale,
  scaleNames,
}) {
  const DARKMODE = useDarkMode();

  return (
    <View style={styles.container}>
      <View style={styles.leftPicker}>
        <Picker
          selectedValue={selectedNote}
          onValueChange={(itemValue, itemIndex) => setSelectedNote(itemValue)}
          itemStyle={{
            color: DARKMODE ? colors.white : colors.black,
          }}
        >
          {noteNames.map((noteName) => (
            <Picker.Item label={noteName} value={noteName} key={noteName} />
          ))}
        </Picker>
      </View>
      <View style={styles.rightPicker}>
        <Picker
          selectedValue={selectedScale}
          onValueChange={(itemValue, itemIndex) => setSelectedScale(itemValue)}
          itemStyle={{
            color: DARKMODE ? colors.white : colors.black,
          }}
        >
          {scaleNames.map((scaleName) => (
            <Picker.Item
              label={translate(scaleName)}
              value={translate(scaleName)}
              key={scaleName}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftPicker: {
    width: '25%',
  },
  rightPicker: {
    width: '75%',
  },
});

ScalePickersIos.propTypes = {
  selectedNote: PropTypes.string,
  setSelectedNote: PropTypes.func,
  noteNames: PropTypes.arrayOf(PropTypes.string),
  selectedScale: PropTypes.string,
  setSelectedScale: PropTypes.func,
  scaleNames: PropTypes.arrayOf(PropTypes.string),
};
