import React from 'react';
import { View, Text } from 'react-native';

import { colors } from '../../../Model/Model';
import { translate as translateFunc } from '../../../Translations/TranslationModel';
import { useDarkMode } from '../../../utils';

/**
 * @description A rendered Text list item. This is currently only being
 * used to display copyright information, so it is not being translated.
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.1.1
 * @param {Object} props The JSX props passed to this React component
 * @param {Object} props.item The item to be rendered.
 * @param {boolean} props.translate Whether or not this item should be
 * translated
 *
 * @example
 * <TextListItem item={item} />
 */
export default function TextListItem({ item, translate = true }) {
  const DARKMODE = useDarkMode();
  const styles = {
    listRowContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
      paddingVertical: 8,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
    },
    listRowText: {
      color: DARKMODE ? colors.white : colors.black,
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
      color: DARKMODE ? colors.purpleDark : colors.purpleLight,
      paddingRight: 5,
      flex: 1,
    },
  };

  return (
    <View style={styles.listRowContainer}>
      <Text style={styles.listRowText} accessibilityRole="text">
        {!translate || item.value.includes('Alexander Burdiss')
          ? item.value
          : translateFunc(item.value)}
      </Text>
    </View>
  );
}
