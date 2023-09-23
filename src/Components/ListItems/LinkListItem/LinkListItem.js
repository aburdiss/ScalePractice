import React from 'react';
import { View, Text, Linking, Pressable, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';
import { useDarkMode } from '../../../utils';

/**
 * @function LinkListItem
 * @component
 * @description A rendered Link list item with a chevron and purple text
 * Created 11/15/20
 * @param {Object} props The JSX props passed to this React component
 * @param {Object} props.item The item to be rendered.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 1.1.0
 *
 * @example
 * <LinkListItem item={item} />
 */
export default function LinkListItem({ item }) {
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
