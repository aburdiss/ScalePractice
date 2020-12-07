import React from 'react';
import {Pressable, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';

import {colors} from '../Model/Model';

/**
 * @description A gray button that is meant to trigger all switches on a page.
 * Basic styles are already applied.
 * @author Alexander Burdiss
 * @since 10/12/20
 */
const AllScalesButton = ({children, handler}) => {
  const DARKMODE = useDarkMode();

  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.systemGray : colors.systemGray,
      }}
      onPress={handler}
      style={({pressed}) => ({
        borderRadius: 8,
        borderColor: DARKMODE ? colors.systemGray : colors.systemGray,
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        opacity: pressed ? 0.8 : 1,
        overflow: 'hidden',
      })}>
      <Text
        style={{
          textAlign: 'center',
          color: DARKMODE ? colors.systemGray : colors.systemGray,
          fontSize: 16,
        }}>
        {children}
      </Text>
    </Pressable>
  );
};

export default AllScalesButton;
