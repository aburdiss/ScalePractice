import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Pressable,
  View,
  Linking,
  Image,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import LicensesLink from '../LicensesLink';
import { colors } from '../../../../Model/Model';

import { useDarkMode } from '../../../../utils';

/**
 * @function LicensesListItem
 * @component
 * @memberof Licenses
 * @description A styled list item that contains links to the authors of the
 * various softwares used throughout the app, and the users who contributed
 * to them.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * Created 12/17/20
 * @param {string} props.image The url of the image to display.
 * @param {string} props.userUrl The url of the author of this software.
 * @param {string} props.username The username of the author of the software
 * using this license.
 * @param {string} props.name The name of the author of the software using this
 * license.
 * @param {string} props.version The version number of the software using this
 * license.
 * @param {string} props.licenses The text to render inside the main section
 * of this license link.
 * @param {string} props.repository The url of the Github repository to link
 * to.
 * @param {string} props.licenseUrl The url to the currently referenced
 * license.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @date 1/30/25
 * @version 1.0.3
 *
 * @example
 * <LicensesListItem {...item} />
 */
export default function LicensesListItem({
  image,
  userUrl,
  username,
  name,
  version,
  licenses,
  repository,
  licenseUrl,
}: {
  image: string;
  userUrl: string;
  username: string;
  name: string;
  version: string;
  licenses: string;
  repository: string;
  licenseUrl: string;
}) {
  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    card: {
      overflow: 'hidden',
      flexDirection: 'row',
      backgroundColor: DARKMODE ? colors.systemGray6Dark : colors.white,
      alignItems: 'center',
      paddingLeft: 12,
    },
    item: {
      paddingVertical: 12,
      paddingRight: 12,
      marginLeft: 12,
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      maxWidth: '100%',
      flexWrap: 'wrap',
      borderBottomColor: DARKMODE
        ? colors.systemGray5Dark
        : colors.systemGray5Light,
      borderBottomWidth: 1,
    },
    name: {
      color: DARKMODE ? colors.white : colors.black,
      fontWeight: 'bold',
      fontSize: 16,
    },
    image: {
      aspectRatio: 1,
      width: 58,
      borderRadius: 29,
      backgroundColor: 'white',
    },

    text: {
      color: colors.systemGray,
      marginTop: 3,
    },
  });

  let title = name;
  if (username) {
    if (title.toLowerCase() != username.toLowerCase()) {
      title += ` by ${username}`;
    }
  }

  return (
    <View>
      <View>
        <View style={styles.card}>
          {image && (
            <Pressable
              onPress={() => Linking.openURL(userUrl)}
              style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
            >
              <Image source={{ uri: image }} style={styles.image} />
            </Pressable>
          )}
          <Pressable
            onPress={() => Linking.openURL(repository)}
            style={({ pressed }) => ({
              opacity: pressed ? 0.7 : 1,
              ...styles.item,
            })}
          >
            {/* eslint-disable-next-line react-native/no-inline-styles */}
            <View style={{ maxWidth: '90%' }}>
              <Text style={styles.name}>{title}</Text>
              <LicensesLink style={styles.text} url={licenseUrl}>
                {licenses}
              </LicensesLink>
              <Text style={styles.text}>{version}</Text>
            </View>
            <Ionicons
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ alignSelf: 'center' }}
              color={DARKMODE ? colors.purpleDark : colors.purpleLight}
              size={24}
              name={'chevron-forward'}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

LicensesListItem.propTypes = {
  image: PropTypes.string,
  userUrl: PropTypes.string,
  username: PropTypes.string,
  name: PropTypes.string,
  version: PropTypes.string,
  licenses: PropTypes.string,
  repository: PropTypes.string,
  licenseUrl: PropTypes.string,
};
