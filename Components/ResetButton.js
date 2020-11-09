import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const ResetButton = ({ handler }) => {
  return (
    <View>
      <Pressable
        android_ripple={{color: 'red'}}
        style={styles.button}
        onPress={handler}
      >
        <Text style={styles.text}>Reset</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    borderColor: 'red',
    borderWidth: 1,
    margin: 10,
    padding: 14,
  },
  text: {
    textAlign: 'center',
    color: 'red',
  },
});

export default ResetButton;
