import React from 'react';
import { View, Text, Linking, Pressable, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';

/**
 * @description A rendered Link list item with a chevron and purple text
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.1.0
 * @param {Object} props.item The item to be rendered.
 *
 * @example
 * <LinkListItem item={item} />
 */
export default function LinkListItem({ item }) {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      accessible={true}
      accessibilityLabel={translate(item.value)}
      accessibilityRole="link"
      onPress={() => {
        Linking.openURL(item.link);
      }}
    >
      <View style={styles.listRowContainer}>
        {item.image ? (
          <Image source={item.image} style={styles.linkImage} />
        ) : null}
        <Text style={styles.linkText}>{translate(item.value)}</Text>
        <Ionicons
          name={'chevron-forward-outline'}
          size={25}
          color={styles.linkText.color}
        />
      </View>
    </Pressable>
  );
}

const dynamicStyles = new DynamicStyleSheet({
  listRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(
      colors.systemGray5Light,
      colors.systemGray5Dark,
    ),
  },
  listRowText: {
    color: new DynamicValue(colors.black, colors.white),
    paddingVertical: 5,
  },
  linkImage: {
    height: 25,
    width: 25,
    borderRadius: 4,
    marginRight: 5,
    resizeMode: 'contain',
  },
  linkText: {
    color: new DynamicValue(colors.purpleLight, colors.purpleDark),
    paddingRight: 5,
    flex: 1,
  },
});
