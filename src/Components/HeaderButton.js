import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';


/**
 * @description A simple button to live on the header and provide additional 
 * navigation options in the app.
 * @author Alexander Burdiss
 * @since 10/11/20
 */
const HeaderButton = ({ children, handler }) => {
  return (
    <Pressable
      android_ripple={{color: 'purple'}}
      onPress={ handler }
      style={ styles.button }
      >
        {({ pressed }) => (
          <Text
          style={ styles.text }
          >
            { children }
          </Text>
        )}
      </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    marginRight: 4,
  },
  text: {
    color: 'purple',
  },
});

export default HeaderButton;