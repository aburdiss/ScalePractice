import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDarkMode } from 'react-native-dynamic';

import { colors } from '../../Model/Model';

/**
 * @function LargeScaleDisplay
 * @description A styled text box that shows the currently selected scale
 * @author Alexander Burdiss
 * @since 6/11/21
 * @version 1.0.1
 * @param {String} props.children The text to render inside this component
 *
 * @component
 * @example
 * ```jsx
 * <LargeScaleDisplay>Hello, World!</LargeScaleDisplay>
 * ```
 */
const LargeScaleDisplay = ({ children }) => {
  const DARKMODE = useDarkMode();

  return (
    <LinearGradient
      colors={DARKMODE ? ['#ce4bf6', '#763af6'] : ['#763af6', '#ce4bf6']}
    >
      <View
        accessible={true}
        accessibilityLiveRegion="assertive"
        accessibilityLabel={children}
        accessibilityRole="alert"
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        <Text
          maxFontSizeMultiplier={2}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            color: DARKMODE ? colors.white : colors.white,
            overflow: 'hidden',
            textAlign: 'center',
            width: '100%',
            paddingHorizontal: 14,
            fontSize: 32,
            fontWeight: 'bold',
          }}
        >
          {children}
        </Text>
      </View>
    </LinearGradient>
  );
};

export default LargeScaleDisplay;
