import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Pressable,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';

import { useDarkMode } from '../../utils';
import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @function AddToListButton
 * @component
 * @description A green button that says "Add To List", and calls whatever
 * function is passed in.
 * Created 12/7/20
 * @param {Object} props JSX props passed to this React component
 * @param {Function} props.handler The function to call when this button is
 * pressed
 * @returns {JSX.Element} JSX Render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 1.0.2
 * @example
 * <AddToListButton handler={handler} />
 */
export default function AddToListButton({
  handler,
}: {
  handler: (event: GestureResponderEvent) => void;
}) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    text: {
      textAlign: 'center',
      color: DARKMODE ? colors.greenDark : colors.greenLight,
    },
  });

  return (
    <View>
      <Pressable
        android_ripple={{
          color: DARKMODE ? colors.greenDark : colors.greenLight,
        }}
        accessibilityRole="button"
        accessibilityHint={translate('Adds the selected exercise to the list')}
        style={({ pressed }) => ({
          borderRadius: 8,
          borderColor: DARKMODE ? colors.greenDark : colors.greenLight,
          opacity: pressed ? 0.7 : 1,
          borderWidth: 1,
          margin: 10,
          padding: 12,
          overflow: 'hidden',
        })}
        onPress={handler}
      >
        <Text style={styles.text}>{translate('Add To List')}</Text>
      </Pressable>
    </View>
  );
}

AddToListButton.propTypes = {
  handler: PropTypes.func,
};
