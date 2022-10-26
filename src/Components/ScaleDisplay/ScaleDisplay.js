import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';

/**
 * @description A styled text box that shows the currently selected scale
 * Created 10/11/20
 * @copyright Alexander Burdiss
 * @author Alexander Burdiss
 * @since 10/25/22
 * @version 1.0.3
 * @param {Object} props JSX props passed to this React Component
 * @param {string} props.children The text to render inside this component
 *
 * @example
 * <ScaleDisplay>
 *   Hello, World!
 * </ScaleDisplay>
 */
export default function ScaleDisplay({ children }) {
  const DARKMODE = useDarkMode();
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
      borderRadius: 8,
    },
  });

  return (
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
  );
}
