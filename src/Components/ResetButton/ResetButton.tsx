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
 * @function ResetButton
 * @component
 * @description A button that is styled to look like a reset button, with a red
 * outline and the text "Reset".
 * Created 11/18/20
 * @param {Object} props The JSX props passed to this React component
 * @param {Function} props.handler The function to call when this component
 * is pressed.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 1.0.2
 *
 * @example
 * <ResetButton handler={handler} />
 */
export default function ResetButton({
  handler,
}: {
  handler: (event: GestureResponderEvent) => void;
}) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    text: {
      textAlign: 'center',
      color: DARKMODE ? colors.redDark : colors.redLight,
    },
  });

  return (
    <View>
      <Pressable
        android_ripple={{
          color: DARKMODE ? colors.redDark : colors.redLight,
        }}
        accessibilityRole="button"
        accessibilityLabel={translate('Reset')}
        accessibilityHint="Resets List"
        style={({ pressed }) => ({
          borderRadius: 8,
          borderColor: DARKMODE ? colors.redDark : colors.redLight,
          opacity: pressed ? 0.7 : 1,
          borderWidth: 1,
          margin: 10,
          padding: 12,
          overflow: 'hidden',
        })}
        onPress={handler}
      >
        <Text style={styles.text}>{translate('Reset')}</Text>
      </Pressable>
    </View>
  );
}

ResetButton.propTypes = {
  handler: PropTypes.func,
};
