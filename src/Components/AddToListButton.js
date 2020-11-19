import React from 'react';
import { View, Pressable, Text } from 'react-native';
import { useDarkMode } from 'react-native-dynamic';

import { colors } from '../Model/Model';

const AddToListButton = ({ handler }) => {
  const DARKMODE = useDarkMode();

  return (
    <View>
      <Pressable
        android_ripple={{
          color: DARKMODE ? colors.greenDark : colors.greenLight,
        }}
        style={({ pressed }) => ({
          borderRadius: 8,
          borderColor: DARKMODE ? colors.greenDark : colors.greenLight,
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
            color: DARKMODE ? colors.greenDark : colors.greenLight,
          }}
        >
          Add to List
        </Text>
      </Pressable>
    </View>
  );
};

export default AddToListButton;
