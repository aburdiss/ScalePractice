import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

/**
 * @description A button that is styled to look like a reset button, with a red
 * outline and the text "Reset".
 * @author Alexander Burdiss
 * @since 11/18/20
 * @version 1.0.1
 * @param {Function} props.handler The function to call when this component
 * is pressed.
 * 
 * @component
 * @example
 * ```jsx
<ResetButton handler={handler} />
```
 */
const ResetButton = ({handler}) => {
  const DARKMODE = useDarkMode();
  
  return (
    <View>
      <Pressable
        android_ripple={{
          color: DARKMODE ? colors.redDark : colors.redLight,
        }}
        style={({pressed}) => ({
          borderRadius: 8,
          borderColor: DARKMODE ? colors.redDark : colors.redLight,
          opacity: pressed ? 0.7 : 1,
          borderWidth: 1,
          margin: 10,
          padding: 14,
          overflow: 'hidden',
        })}
        onPress={handler}>
        <Text
          style={{
            textAlign: 'center',
            color: DARKMODE ? colors.redDark : colors.redLight,
          }}>
          {translate('Reset')}
        </Text>
      </Pressable>
    </View>
  );
};

export default ResetButton;
