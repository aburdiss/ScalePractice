import React from 'react';
import { Pressable, Text } from 'react-native';
import { DarkModeContext, useDarkMode } from 'react-native-dynamic';
import { color } from 'react-native-reanimated';

import { colors } from '../Model';

/**
 * @description A purple button meant to trigger the randomize process of the
 * app. Basic styles are already applied.
 * @author Alexander Burdiss
 * @since 10/11/20
 */
const RandomizeButton = ({ handler }) => {
  const DARKMODE = useDarkMode();
  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.purpleDark : colors.purpleLight
      }}
      onPress={ handler }
      style={({ pressed }) => ({
        borderRadius: 8,
        borderColor: DARKMODE ? colors.purpleDark : colors.purpleLight,
        borderWidth: 1,
        margin: 10,
        padding: 10,
        opacity: pressed ? 0.8 : 1,
        overflow: "hidden",
      })}
    >
      <Text
        style={{
          textAlign: 'center',
          color: DARKMODE
            ? colors.purpleDark
            : colors.purpleLight,
          fontSize: 24,
        }}
      >
        Randomize
      </Text>
    </Pressable>
  );
};

export default RandomizeButton;
