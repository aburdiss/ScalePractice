import React from 'react';
import PropTypes from 'prop-types';
import { Text, Linking } from 'react-native';
/**
 * @function LicensesLink
 * @component
 * @memberof Licenses
 * @description One link item that opens the main software link in the
 * LicensesListItem component. Text is limited to one line.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * Created 12/17/20
 * @param {Object} props JSX props passed to this React component
 * @param {string} props.url The url to open when the element is tapped.
 * @param {Object} props.style Style to be applied to the element
 * @param {string} props.children Text to be rendered inside this element.
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/30/25
 * @version 1.0.2
 *
 * @example
 * <LicensesLink style={styles.text} url={licenseUrl}>
 *   {licenses}
 * </LicensesLink>
 */
export default function LicensesLink({
  url,
  style,
  children,
}: {
  url: string;
  style: Object;
  children: React.ReactNode;
}) {
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

LicensesLink.propTypes = {
  url: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};
