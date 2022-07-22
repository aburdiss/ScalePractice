import React from 'react';
import { View, Text } from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';

/**
 * @description A rendered Text list item. This is currently only being
 * used to display copyright information, so it is not being translated.
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.1.1
 * @param {Object} props.item The item to be rendered.
 *
 * @example
 * <TextListItem item={item} />
 */
export default function TextListItem({ item }) {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={styles.listRowContainer}>
      <Text style={styles.listRowText} accessibilityRole="text">
        {item.value.includes('Alexander Burdiss')
          ? item.value
          : translate(item.value)}
      </Text>
    </View>
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
