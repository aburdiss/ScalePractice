import React from 'react';
import { View, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useDarkMode } from '../../utils';

import { colors } from '../../Model/Model';

/**
 * @function LargeScaleDisplay
 * @component
 * @description A styled text box that shows the currently selected scale
 * Created 6/11/21
 * @param {Object} props JSX props passed to this React component
 * @param {string} props.children The text to render inside this component
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/23/23
 * @version 1.0.1
 *
 * @example
 * <LargeScaleDisplay>Hello, World!</LargeScaleDisplay>
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
