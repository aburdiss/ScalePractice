import React from 'react';
import {View, Pressable, Text} from 'react-native';
import {useDarkMode} from 'react-native-dynamic';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

/**
 * @description A green button that says "Add To List", and calls whatever
 * function is passed in. 
 * @author Alexander Burdiss
 * @since 12/7/20
 * @version 1.0.1
 * @param {Function} props.handler The function to call when this component
 * is pressed 
 * 
 * @component
 * @example
 * ```jsx
<AddToListButton handler={handler} />
```
 */
const AddToListButton = ({handler}) => {
  const DARKMODE = useDarkMode();

  return (
    <View>
      <Pressable
        android_ripple={{
          color: DARKMODE ? colors.greenDark : colors.greenLight,
        }}
        style={({pressed}) => ({
          borderRadius: 8,
          borderColor: DARKMODE ? colors.greenDark : colors.greenLight,
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
            color: DARKMODE ? colors.greenDark : colors.greenLight,
          }}>
          {translate('Add To List')}
        </Text>
      </Pressable>
    </View>
  );
};

export default AddToListButton;
