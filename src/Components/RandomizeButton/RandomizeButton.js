import React from 'react';
import PropTypes from 'prop-types';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @function RandomizeButton
 * @component
 * @description A purple button meant to trigger the randomize process of the
 * app. Basic styles are already applied.
 * Created 10/11/20
 * @param {Object} props JSX props passed to this React component
 * @param {Function} props.handler The function to call when this component is
 * pressed
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 1.0.1
 *
 * @example
 * <RandomizeButton handler={handler} />
 */
export default function RandomizeButton({ handler }) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    text: {
      textAlign: 'center',
      color: DARKMODE ? colors.purpleDark : colors.purpleLight,
      fontSize: 24,
    },
  });
  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.purpleDark : colors.purpleLight,
      }}
      onPress={handler}
      style={({ pressed }) => ({
        borderRadius: 8,
        borderColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        borderWidth: 1,
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        justifyContent: 'center',
        opacity: pressed ? 0.7 : 1,
        overflow: 'hidden',
      })}
    >
      <Text maxFontSizeMultiplier={3} style={styles.text}>
        {translate('Randomize')}
      </Text>
    </Pressable>
  );
}

RandomizeButton.propTypes = {
  handler: PropTypes.func,
};
