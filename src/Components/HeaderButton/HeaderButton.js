import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';

/**
 * @description A simple button to live on the header and provide additional
 * navigation options in the app.
 * @author Alexander Burdiss
 * @since 10/11/20
 * @version 1.1.2
 * @param {string} props.children The text to render inside this button.
 * @param {Function} props.handler The function to call when this button is pressed.
 *
 * @example
 * <HeaderButton handler={handler}>
 *   Hello, World!
 * </HeaderButton>
 */
const HeaderButton = ({ children, handler }) => {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    text: {
      color: DARKMODE ? colors.purpleDark : colors.purpleLight,
      fontSize: 16,
    },
  });

  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.purpleDark : colors.purpleLight,
      }}
      accessibilityRole="link"
      accessible={true}
      accessibilityLabel={children}
      accessibilityHint={translate('Navigates to') + ' ' + children}
      onPress={handler}
      style={({ pressed }) => ({
        padding: 8,
        marginRight: 4,
        opacity: pressed ? 0.7 : 1,
      })}
    >
      <Text maxFontSizeMultiplier={1.5} style={styles.text}>
        {children}
      </Text>
    </Pressable>
  );
};

export default HeaderButton;
