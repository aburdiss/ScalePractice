import React from 'react';
import {ScrollView, View, Text, Dimensions} from 'react-native';
import Image from 'react-native-scalable-image';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {colors, getImagePath} from '../Model/Model';
import {translate} from '../Translations/TranslationModel';

const {width} = Dimensions.get('window');

/**
 * @description A component that renders a detailed image, based on the id
 * given when calling navigation.navigate().
 * @author Alexandder Burdiss
 * @since 12/15/20
 * @version 1.0.1
 * @param {Object} props.route The Route object provided by React Navigation
 * 
 * @component
 * @example
 * ```jsx
<ScaleDetail route={route} />
```
 */
const ScaleDetail = ({route}) => {
  const styles = useDynamicValue(dynamicStyles);

  const path = getImagePath(route.params.id);

  return (
    <ScrollView style={styles.viewContainer}>
      <View style={styles.imageContainer}>
        <Image source={path} width={width} />
      </View>
      <Text style={styles.construction}>
        {translate(route.params.construction)}
      </Text>
      <Text style={styles.description}>
        {translate(route.params.description)}
      </Text>
    </ScrollView>
  );
};

const dynamicStyles = new DynamicStyleSheet({
  construction: {
    textAlign: 'center',
    padding: 10,
    color: new DynamicValue(colors.black, colors.white),
  },
  description: {
    paddingTop: 10,
    paddingHorizontal: 20,
    color: new DynamicValue(colors.black, colors.white),
  },
  image: {
    resizeMode: 'contain',
    flex: 1,
  },
  viewContainer: {
    height: '100%',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  },
});

export default ScaleDetail;
