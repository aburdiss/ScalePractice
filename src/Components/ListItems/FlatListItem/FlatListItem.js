import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDarkMode } from '../../../utils';

import { colors } from '../../../Model/Model';
import { translate } from '../../../Translations/TranslationModel';

/**
 * @function FlatListItem
 * @component
 * @description Used as a render item in the ScaleDescription scroll view.
 * Created: 11/15/23
 * @param {Object} props JSX props passed to this React component
 * @param {Object} props.data The data to display in this list item.
 * @return {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.0.2
 *
 * @example
 * <ListItem data={data} />
 */
export default function FlatListItem({ data }) {
  const navigation = useNavigation();
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    container: {
      borderBottomColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      borderBottomWidth: 1,
      paddingVertical: 15,
    },
  });

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
      <View style={styles.container}>
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
}

FlatListItem.propTypes = {
  data: PropTypes.object,
};
