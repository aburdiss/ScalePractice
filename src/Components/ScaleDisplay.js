import React from 'react';
import {View, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';

import {colors} from '../Model/Model';

/**
 * @description A styled text box that shows the currently selected scale
 * @author Alexander Burdiss
 * @since 10/11/20
 */
const ScaleDisplay = ({children}) => {
  const DARKMODE = useDarkMode();
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 10,
      }}>
      <Text
        style={{
          backgroundColor: DARKMODE
            ? colors.systemGray2Dark
            : colors.systemGray2Light,
          color: DARKMODE ? colors.white : colors.black,
          overflow: 'hidden',
          textAlign: 'center',
          width: '100%',
          padding: 16,
          fontSize: 18,
          borderRadius: 8,
        }}>
        {children}
      </Text>
    </View>
  );
};

export default ScaleDisplay;
