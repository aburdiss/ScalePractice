import React from 'react';
import PropTypes from 'prop-types';
import {
  Pressable,
  StyleSheet,
  Text,
  GestureResponderEvent,
} from 'react-native';
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
export default function AllScalesButton({
  children,
  handler,
  accessibilityHint,
}: {
  children: React.ReactNode;
  handler: (event: GestureResponderEvent) => void;
  accessibilityHint?: string;
}) {
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
      accessibilityHint={accessibilityHint}
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
}

AllScalesButton.propTypes = {
  handler: PropTypes.func,
  children: PropTypes.node,
};
