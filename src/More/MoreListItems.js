import React from 'react';
import {View, Text, Linking, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {colors} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

/**
 * @description A rendered Text list item. This is currently only being
 * used to display copyright information, so it is not being translated.
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.1.0
 * @param {Object} props.item The item to be rendered.
 * 
 * @component
 * @example
 * ```jsx
<TextListItem item={item} />
```
 */
export const TextListItem = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={styles.listRowContainer}>
      {item.value.charAt(0) == '©' ? (
        <Text style={styles.listRowText}>{item.value}</Text>
      ) : (
        <Text style={styles.listRowText}>{translate(item.value)}</Text>
      )}
    </View>
  );
};

/**
 * @description A rendered Link list item with a chevron and purple text
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.1.0
 * @param {Object} props.item The item to be rendered.
 * 
 * @component
 * @example
 * ```jsx
<LinkListItem item={item} />
```
 */
export const LinkListItem = ({item}) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <Pressable
      style={({pressed}) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      onPress={() => {
        Linking.openURL(item.link);
      }}>
      <View style={styles.listRowContainer}>
        <Text style={styles.linkText}>{translate(item.value)}</Text>
        <Ionicons
          name={'chevron-forward-outline'}
          size={25}
          color={styles.linkText.color}
        />
      </View>
    </Pressable>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  listRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    paddingVertical: 8,
    height: 45,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
  },
  listRowText: {
    color: new DynamicValue(colors.black, colors.white),
  },
  linkText: {
    color: new DynamicValue(colors.purpleLight, colors.purpleDark),
  },
});
