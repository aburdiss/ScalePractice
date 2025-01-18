import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';
import { useDarkMode } from '../../../utils';

/**
 * @function InternalListItem
 * @component
 * @description A rendered link list item that opens a page inside the app on
 * the current stack. This is rendered the same as a LinkListItem, and performs
 * a similar function.
 * Created 12/17/20
 * @param {Object} props JSX props passed to this React component
 * @param {Object} props.item The Internal list item to be rendered containing
 * a Component name to render to, and the text to be rendered.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 1.0.2
 *
 * @example
 * <InternalListItem item={item} />
 */
export default function InternalListItem({
  item,
}: {
  item: { value: string; component?: string };
}) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
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
  });
  const navigation = useNavigation<{ navigate: Function }>();

  return (
    <Pressable
      style={({ pressed }) => ({
        opacity: pressed ? 0.7 : 1,
      })}
      accessible={true}
      accessibilityLabel={translate(item.value)}
      accessibilityRole="link"
      onPress={() => {
        navigation.navigate(item.component);
      }}
    >
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
}

InternalListItem.propTypes = {
  item: PropTypes.object,
};
