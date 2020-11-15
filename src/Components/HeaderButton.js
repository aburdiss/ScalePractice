import React from 'react';
import { Text, Pressable } from 'react-native';
import { useDarkMode } from 'react-native-dynamic'

import { colors } from '../Model';

/**
 * @description A simple button to live on the header and provide additional 
 * navigation options in the app.
 * @author Alexander Burdiss
 * @since 10/11/20
 */
const HeaderButton = ({ children, handler }) => {
  const DARKMODE = useDarkMode();
  return (
    <Pressable
      android_ripple={{color: DARKMODE ? colors.purpleDark : colors.purpleLight }}
      onPress={ handler }
      style={{
        padding: 8,
        marginRight: 4,
      }}
      >
        {({ pressed }) => (
          <Text
          style={{
            color: DARKMODE ? colors.purpleDark : colors.purpleLight,
            fontSize: 16,
          }}
          >
            { children }
          </Text>
        )}
      </Pressable>
  );
};

export default HeaderButton;