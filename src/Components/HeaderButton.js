import React from 'react';
import {Text, Pressable} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';

import {colors} from '../Model/Model';

/**
 * @description A simple button to live on the header and provide additional
 * navigation options in the app.
 * @author Alexander Burdiss
 * @since 10/11/20
 * @version 1.1.0
 * 
 * @component
 * @example
 * ```jsx
<HeaderButton handler={handler}>
  Hello, World!
</HeaderButton>
```
 */
const HeaderButton = ({children, handler}) => {
  const DARKMODE = useDarkMode();

  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.purpleDark : colors.purpleLight,
      }}
      onPress={handler}
      style={({pressed}) => ({
        padding: 8,
        marginRight: 4,
        opacity: pressed ? 0.7 : 1,
      })}>
      <Text
        style={{
          color: DARKMODE ? colors.purpleDark : colors.purpleLight,
          fontSize: 16,
        }}>
        {children}
      </Text>
    </Pressable>
  );
};

export default HeaderButton;
