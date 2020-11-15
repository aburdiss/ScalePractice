import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * @description A styled text box that shows the currently selected scale
 * @author Alexander Burdiss
 * @since 10/11/20
 */
const ScaleDisplay = ({ children }) => {
  return (
    <View
      style={ styles.view }
    >
      <Text style={ styles.text }>{ children }</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 10,
  },
  text: {
    backgroundColor: 'gray',
    textAlign: 'center',
    width: '100%',
    padding: 16,
    fontSize: 16,
    borderRadius: 8,
  },
});

export default ScaleDisplay;