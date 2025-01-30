import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { useDarkMode, useIdleScreen } from '../../utils';
import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @function Help
 * @component
 * @description The Help Page component for the Scale Practice App
 * Created 8/25/23
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2025 Alexander Burdiss
 * @since 1/30/25
 * @version 1.0.1
 * @example
 * <Help />
 */
export default function Help() {
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const { container, text } = StyleSheet.create({
    container: {
      paddingHorizontal: 20,
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
      height: '100%',
    },
    text: { paddingTop: 20, color: DARKMODE ? colors.white : colors.black },
  });

  return (
    <View style={container}>
      <Text style={text}>{translate('Help1')}</Text>
      <Text style={text}>{translate('Help2')}</Text>
    </View>
  );
}
