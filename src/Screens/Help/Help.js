import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useIdleScreen } from '../../utils';
import { translate } from '../../Translations/TranslationModel';

/**
 * @function Help
 * @description The Help Page component for the Scale Practice App
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @since 8/25/23
 * @version 1.0.0
 * @example
 * <Help />
 */
export default function Help() {
  useIdleScreen();

  const { container, text } = StyleSheet.create({
    container: { paddingHorizontal: 20 },
    heading: {},
    text: { paddingTop: 20 },
  });

  return (
    <View style={container}>
      <Text style={text}>{translate('Help1')}</Text>
      <Text style={text}>{translate('Help2')}</Text>
    </View>
  );
}
