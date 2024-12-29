import React from 'react';
import PropTypes from 'prop-types';
import { Text, Pressable, View, Linking, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../Model/Model';

import { useDarkMode } from '../../utils';

/**
 * @description A styled list item that contains links to the authors of the
 * various softwares used throughout the app, and the users who contributed
 * to them.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @date 12/17/20
 * @version 1.0.2
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
}) {
  const DARKMODE = useDarkMode();
  const styles = {
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
  };

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
              <Link style={styles.text} url={licenseUrl}>
                {licenses}
              </Link>
              <Link style={styles.text}>{version}</Link>
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

/**
 * @description One link item that opens the main software link in the
 * LicensesListItem component. Text is limited to one line.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @since 12/17/20
 * @version 1.0.1
 * @param {string} props.url The url to open when the element is tapped.
 * @param {Object} props.style Style to be applied to the element
 * @param {string} props.children Text to be rendered inside this element.
 *
 * @example
 * <Link style={styles.text} url={licenseUrl}>
 *   {licenses}
 * </Link>
 */
function Link({ url, style, children }) {
  return (
    <Text
      style={style}
      numberOfLines={1}
      onPress={() => url && Linking.openURL(url)}
    >
      {children}
    </Text>
  );
}

Link.propTypes = {
  url: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
