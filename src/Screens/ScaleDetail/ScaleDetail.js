import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';

import { colors, getImagePath } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';
import { useDarkMode, useIdleScreen } from '../../utils';

/**
 * @description A component that renders a detailed image, based on the id
 * given when calling navigation.navigate().
 * @author Alexandder Burdiss
 * @since 12/15/20
 * @version 2.1.0
 * @param {Object} props.route The Route object provided by React Navigation
 *
 * @example
 * <ScaleDetail route={route} />
 */
const ScaleDetail = ({ route }) => {
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = {
    construction: {
      textAlign: 'center',
      padding: 10,
      color: DARKMODE ? colors.white : colors.black,
    },
    description: {
      paddingTop: 10,
      paddingHorizontal: 20,
      color: DARKMODE ? colors.white : colors.black,
    },
    image: {
      width: '100%',
      height: 200,
      resizeMode: 'contain',
    },
    imageContainer: {
      flex: 1,
      alignItems: 'center',
    },
    viewContainer: {
      height: '100%',
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
  };

  const path = getImagePath(route.params.id);

  return (
    <ScrollView style={styles.viewContainer}>
      <View style={styles.imageContainer}>
        <Image source={path} style={styles.image} />
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

export default ScaleDetail;
