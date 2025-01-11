import React from 'react';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, Image, StyleSheet } from 'react-native';
// import { StackScreenProps } from '@react-navigation/stack';

import { colors, getImagePath } from '../../Model/Model';
import { translate } from '../../Translations/TranslationModel';
import { useDarkMode, useIdleScreen } from '../../utils';
// import { ResourcesStackParamList } from '../../Navigation/ResourcesStack';

// type Props = StackScreenProps<ResourcesStackParamList, 'Scale Detail'>;

/**
 * @function ScaleDetail
 * @description A component that renders a detailed image, based on the id
 * given when calling navigation.navigate().
 * @param {Object} props JSX props passed to this React component
 * @param {Object} props.route The Route object provided by React Navigation
 * @returns {JSX.Element} JSX render instructions
 * @author Alexander Burdiss
 * @since 12/15/20
 * @version 2.1.1
 *
 * @example
 * <ScaleDetail route={route} />
 */
export default function ScaleDetail({
  route,
}: {
  route: {
    params: {
      name: string;
      id: number;
      construction: string;
      solfege: string;
      numerals: string;
      description: string;
    };
  };
}) {
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
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
  });

  const path = getImagePath(route.params.id);

  return (
    <ScrollView style={styles.viewContainer}>
      <View style={styles.imageContainer}>
        <Image source={path} style={styles.image} />
      </View>
      <Text style={styles.construction}>
        {translate(route.params.construction)}
      </Text>
      {route.params.solfege && (
        <Text style={styles.construction}>{route.params.solfege}</Text>
      )}
      {route.params.numerals && (
        <Text style={styles.construction}>
          {translate('Relation to Major Scale:')}
          {'\n'}
          {route.params.numerals}
        </Text>
      )}
      <Text style={styles.description}>
        {translate(route.params.description)}
      </Text>
    </ScrollView>
  );
}

ScaleDetail.propTypes = {
  route: PropTypes.object,
};
