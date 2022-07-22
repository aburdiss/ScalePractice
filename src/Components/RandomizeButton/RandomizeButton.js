import React from 'react';
import { Pressable, Text } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description A purple button meant to trigger the randomize process of the
 * app. Basic styles are already applied.
 * @author Alexander Burdiss
 * @since 10/11/20
 * @version 1.0.1
 * @param {Function} props.handler The function to call when this component is
 * pressed
 *
 * @example
 * <RandomizeButton handler={handler} />
 */
const RandomizeButton = ({ handler }) => {
  const DARKMODE = useDarkMode();

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
      <Text
        maxFontSizeMultiplier={3}
        style={{
          textAlign: 'center',
          color: DARKMODE ? colors.purpleDark : colors.purpleLight,
          fontSize: 24,
        }}
      >
        {translate('Randomize')}
      </Text>
    </Pressable>
  );
};

export default RandomizeButton;
