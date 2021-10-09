import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from 'react-native-dynamic';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description Used as a render item in the ScaleDescription scroll view.
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.0.2
 * @param {Object} props.data The data to display in this list item.
 * 
 * @component
 * @example
 * ```jsx
<ListItem data={data} />
```
 */
const ListItem = ({ data }) => {
  const navigation = useNavigation();
  const DARKMODE = useDarkMode();

  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.purpleDark : colors.purpleLight,
      }}
      accessibilityRole="button"
      accessibile={true}
      accessibilityLabel={translate(data.name)}
      onPress={() => {
        navigation.navigate('Scale Detail', data);
      }}
      style={({ pressed }) => ({
        paddingLeft: 20,
        backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <View
        style={{
          borderBottomColor: DARKMODE
            ? colors.systemGray5Dark
            : colors.systemGray5Light,
          borderBottomWidth: 1,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            color: DARKMODE ? colors.white : colors.black,
          }}
        >
          {translate(data.name)}
        </Text>
      </View>
    </Pressable>
  );
};

export default ListItem;
