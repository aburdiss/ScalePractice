import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @function ScaleDisplay
 * @component
 * @description A styled text box that shows the currently selected scale
 * Created 10/11/20
 * @param {Object} props JSX props passed to this React Component
 * @param {string} props.children The text to render inside this component
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 1.0.3
 *
 * @example
 * <ScaleDisplay>
 *   Hello, World!
 * </ScaleDisplay>
 */
export default function ScaleDisplay({ children }) {
  const DARKMODE = useDarkMode();
  const navigation = useNavigation();
  const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: 10,
    },
    text: {
      backgroundColor: DARKMODE
        ? colors.systemGray2Dark
        : colors.systemGray2Light,
      color: DARKMODE ? colors.white : colors.black,
      overflow: 'hidden',
      textAlign: 'center',
      width: '100%',
      padding: 14,
      fontSize: 18,
    },
  });

  return (
    <Pressable
      onPress={function () {
        Alert.alert(translate('Short App Description'), '', [
          { text: translate('Dismiss'), style: 'cancel' },
          {
            text: translate('Learn More'),
            onPress: function () {
              navigation.navigate('MoreStack', { screen: 'Help' });
            },
          },
        ]);
      }}
    >
      <View
        accessible={true}
        accessibilityLiveRegion="assertive"
        accessibilityLabel={children}
        accessibilityRole="alert"
        style={styles.container}
      >
        <Text maxFontSizeMultiplier={2} style={styles.text}>
          {children}
        </Text>
      </View>
    </Pressable>
  );
}

ScaleDisplay.propTypes = {
  children: PropTypes.node,
};
