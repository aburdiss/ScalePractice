import React from 'react';
import { View, Text, Linking, Pressable, Switch, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import { useNavigation } from '@react-navigation/native';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description A rendered Text list item. This is currently only being
 * used to display copyright information, so it is not being translated.
 * @author Alexander Burdiss
 * @since 11/15/20
 * @version 1.1.1
 * @param {Object} props.item The item to be rendered.
 *
 * @component
 * @example
 * <TextListItem item={item} />
 */
export const TextListItem = ({ item }) => {
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
 * <LinkListItem item={item} />
 */
export const LinkListItem = ({ item }) => {
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
};

/**
 * @description A rendered link list item that opens a page inside the app on
 * the current stack. This is rendered the same as a LinkListItem, and performs
 * a similar function.
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.2
 * @param {Object} props.item The Internal list item to be rendered containing
 * a Component name to render to, and the text to be rendered.
 *
 * @component
 * @example
 * <InternalListItem item={item} />
 */
export const InternalListItem = ({ item }) => {
  const styles = useDynamicValue(dynamicStyles);
  const navigation = useNavigation();

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
};

/**
 * @description A rendered Switch list item that updates saved preferences.
 * @author Alexander Burdiss
 * @since 1/5/21
 * @version 1.0.2
 * @param {Object} props.item The data to be rendered in this component.
 * @param {Object} props.state The current state of the app, including user
 * preferences.
 * @param {Function} props.dispatch A function to make a reducer call to update
 * state.
 *
 * @component
 * @example
 * <SwitchListItem
 *   item={item}
 *   state={state}
 *   dispatch={dispatch}
 * />
 */
export const SwitchListItem = ({ item, state, dispatch }) => {
  const styles = useDynamicValue(dynamicStyles);
  function updateValue() {
    let updatedState = !state[item.setting];
    let newSetting = { [item.setting]: updatedState };
    dispatch({ type: 'SET_SETTING', payload: newSetting });
  }
  return (
    <Pressable
      style={styles.listRowContainer}
      onPress={updateValue}
      accessible={true}
      accessibilityLabel={translate(item.value)}
      accessibilityState={{ checked: state[item.setting] }}
      accessibilityRole="switch"
      accessibilityHint={
        translate('Toggles setting') + ' ' + translate(item.value)
      }
    >
      <Text style={styles.listRowText}>{translate(item.value)}</Text>
      <Switch value={state[item.setting]} onValueChange={updateValue} />
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
