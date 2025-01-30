import React from 'react';
import { StyleSheet, View } from 'react-native';

import LicensesList from './Components/LicensesList';
import { colors } from '../../Model/Model';
import { licenseData } from './licenseData';

import { useIdleScreen, useDarkMode } from '../../utils';

/**
 * @namespace Licenses
 * @description A group of Components and Functions used to show Licenses for
 * all the packages I use in this application.
 */

/**
 * @function Licenses
 * @component
 * @memberof Licenses
 * @description A wrapper for the LicensesList component that processes the
 * data and passes it in.
 * Created 2/1/2021
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/30/25
 * @version 1.2.1
 *
 * @example
 * <Licenses />
 */
export default function Licenses() {
  useIdleScreen();

  const DARKMODE = useDarkMode();

  const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: DARKMODE ? colors.black : colors.systemGray2Light,
    },
  });

  return (
    <View style={styles.wrapper}>
      <LicensesList licenses={licenseData} />
    </View>
  );
}
