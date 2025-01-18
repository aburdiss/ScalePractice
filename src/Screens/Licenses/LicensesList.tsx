import React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import LicensesListItem from './LicensesListItem';

/**
 * @description The list of licenses of dependencies used in this app.
 * [Created with help from an online article]{@link https://blog.expo.io/licenses-the-best-part-of-your-app-29e7285b544f}
 * @author Alexander Burdiss
 * @since 12/17/2020
 * @version 1.0.1
 * @param {Array} props.licenses The list of licenses that will be displayed.
 *
 * @example
 * <LicensesList licenses={licenses} />
 */
export default function LicensesList({
  licenses,
}: {
  licenses: {
    key: any;
    image: string;
    userUrl: string;
    username: string;
    name: string;
    version: string;
    licenses: string;
    repository: string;
    licenseUrl: string;
  }[];
}) {
  return (
    <FlatList
      style={styles.list}
      keyExtractor={({ key }) => key}
      data={licenses}
      renderItem={({ item }) => <LicensesListItem {...item} />}
    />
  );
}

LicensesList.propTypes = {
  licenses: PropTypes.arrayOf(PropTypes.object),
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
