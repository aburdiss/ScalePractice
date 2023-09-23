import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';

/**
 * @function AllScalesButton
 * @component
 * @description A gray button that is meant to trigger all switches on a page.
 * Basic styles are already applied.
 * Created 10/12/20
 * @param {Object} props The JSX props passed to this React component
 * @param {string} props.children The text to render in the button
 * @param {Function} props.handler The function to call when the button is
 * pressed
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 1.0.1
 *
 * @example
 * <AllScalesButton handler={handler}>
 *   Hello, World!
 * </AllScalesButton>
 */
const AllScalesButton = ({ children, handler }) => {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    text: {
      textAlign: 'center',
      color: DARKMODE ? colors.systemGray : colors.systemGray,
      fontSize: 16,
    },
  });

  return (
    <Pressable
      android_ripple={{
        color: DARKMODE ? colors.systemGray : colors.systemGray,
      }}
      accessibilityRole="button"
      onPress={handler}
      style={({ pressed }) => ({
        borderRadius: 8,
        borderColor: DARKMODE ? colors.systemGray : colors.systemGray,
        borderWidth: 1,
        marginVertical: 10,
        padding: 10,
        opacity: pressed ? 0.7 : 1,
        overflow: 'hidden',
      })}
    >
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default AllScalesButton;
