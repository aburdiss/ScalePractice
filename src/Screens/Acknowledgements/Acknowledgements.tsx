import React from 'react';
import { SectionList, Text, View, StyleSheet } from 'react-native';

import TextListItem from '../../Components/ListItems/TextListItem';

import { colors } from '../../Model/Model';
import { TRANSLATIONS } from '../../Model/AcknowledgementsModel';
import { translate } from '../../Translations/TranslationModel';
import { useDarkMode, useIdleScreen } from '../../utils';

/**
 * @function Acknowledgements
 * @component
 * @description A View that displays the people who directly assisted with
 * this project
 * Created 10/25/2022
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2025 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 1/30/25
 * @version 1.1.0
 *
 * @example
 * <Acknowledgements />
 */
export default function Acknowledgements() {
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    listHeader: {
      textTransform: 'uppercase',
      paddingLeft: 20,
      paddingTop: 30,
      paddingBottom: 10,
      color: DARKMODE ? colors.systemGray : colors.systemGray,
    },
    sectionList: {
      height: '100%',
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
    iconContainer: {
      flexDirection: 'row',
    },
    icon: {
      paddingHorizontal: 5,
    },
    footerContainer: {
      paddingTop: 30,
      alignItems: 'center',
    },
    footerText: {
      color: colors.systemGray,
      paddingTop: 10,
      paddingBottom: 30,
    },
  });

  return (
    <View style={styles.sectionList}>
      <SectionList
        sections={[{ title: translate('Translations'), data: TRANSLATIONS }]}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => <TextListItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}
