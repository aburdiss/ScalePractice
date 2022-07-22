import React from 'react';
import { View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useDarkMode } from 'react-native-dynamic';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description Pickers used on iOS devices to select scales. Used on
 * AdvancedScale and AdvancedArpeggio components.
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.0.1
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
 * @component
 * @example
 * ```jsx
<ScalePickers
  selectedNote={selectedNote}
  setSelectedNote={setSelectedNote}
  noteNames={noteNames}
  selectedScale={selectedScale}
  setSelectedScale={setSelectedScale}
  scaleNames={scaleNames}
/>
```
 */
const ScalePickers = ({
  selectedNote,
  setSelectedNote,
  noteNames,
  selectedScale,
  setSelectedScale,
  scaleNames,
}) => {
  const DARKMODE = useDarkMode();

  return (
    <View
      style={{
        flexDirection: 'row',
      }}
    >
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
          {noteNames.map((noteName) => (
            <Picker.Item label={noteName} value={noteName} key={noteName} />
          ))}
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
};

export default ScalePickers;
