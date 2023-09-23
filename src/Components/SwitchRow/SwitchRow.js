import React from 'react';
import { Text, Switch, Pressable } from 'react-native';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';
import { useDarkMode } from '../../utils';

/**
 * @function SwitchRow
 * @component
 * @description One Switch Row that is used on the Scale and Arpeggio Display
 * views. This view was created to create a more accessible and reuseable
 * switch row.
 * Created 1/5/21
 * @param {Object} props JSX props passed to this React component
 * @param {boolean} props.value The current value of the switch
 * @param {Function} props.onValueChange The function to call when the value
 * changes.
 * @param {string} props.text The text to render on this switch row.
 * @returns {JSX.Element} JSX render instructions.
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 1.0.2
 * @example
 * <SwitchRow
 *   value={value}
 *   onValueChange={onValueChange}
 *   text="Hello, World!"
 * />
 */
const SwitchRow = ({ value, onValueChange, text }) => {
  const DARKMODE = useDarkMode();
  const styles = {
    switchRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 40,
    },
    switchText: {
      color: DARKMODE ? colors.white : colors.black,
    },
  };

  return (
    <Pressable
      style={styles.switchRow}
      accessible={true}
      accessibilityState={{ checked: value }}
      accessibilityRole="switch"
      accessibilityLabel={translate('Toggles Switch') + ' ' + text}
      onPress={onValueChange}
    >
      <Text style={styles.switchText}>{text}</Text>
      <Switch onValueChange={onValueChange} value={value} />
    </Pressable>
  );
};

export default SwitchRow;
