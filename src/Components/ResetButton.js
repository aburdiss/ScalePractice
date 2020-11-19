import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { colors } from '../Model';

const ResetButton = ({ handler }) => {
  const DARKMODE = useDarkMode();
  return (
    <View>
      <Pressable
        android_ripple={{
          color: DARKMODE ? colors.redDark : colors.redLight,
        }}
        style={({ pressed }) => ({
          borderRadius: 8,
          borderColor: DARKMODE ? colors.redDark : colors.redLight,
          opacity: pressed ? 0.8 : 1,
          borderWidth: 1,
          margin: 10,
          padding: 14,
          overflow: "hidden",
        })}
        onPress={handler}
      >
        <Text
          style={{
            textAlign: 'center',
            color: DARKMODE ? colors.redDark : colors.redLight,
          }}
        >
          Reset
        </Text>
      </Pressable>
    </View>
  );
};

export default ResetButton;
