import React, { useContext } from 'react';
import { Text, View, SectionList, StyleSheet } from 'react-native';
import { StatisticsContext } from '../../Model/Statistics';
import { translate } from '../../Translations/TranslationModel';
import { TextListItem } from '../../Components';
import { colors } from '../../Model/Model';
import { useDarkMode, useIdleScreen } from '../../utils';
import { formatStatisticsDataForList } from './utils/formatStatisticsDataForList';

/**
 * @function Statistics
 * @component
 * @description The Statistics page in the app. This page displays statistics
 * about practice sessions to the user
 * @returns {JSX.Element} JSX render instructions
 *
 * @copyright 2023 Alexander Burdiss
 * @author Alexander Burdiss
 * @since 9/4/23
 * @version 1.0.0
 * @example
 * <Statistics />
 */
export default function Statistics() {
  const statistics = useContext(StatisticsContext);
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = StyleSheet.create({
    disclaimer: {
      color: DARKMODE ? colors.white : colors.black,
      paddingTop: 20,
    },
    disclaimerContainer: { paddingHorizontal: 20 },
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
        ListHeaderComponent={
          <View style={styles.disclaimerContainer}>
            <Text style={styles.disclaimer}>
              {translate('Statistics Disclaimer 1')}
            </Text>
            <Text style={styles.disclaimer}>
              {translate('Statistics Disclaimer 2')}
            </Text>
          </View>
        }
        sections={[
          {
            title: translate('Scales'),
            data: formatStatisticsDataForList(statistics.scales),
          },
          {
            title: translate('Arpeggios'),
            data: formatStatisticsDataForList(statistics.arpeggios),
          },
        ]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TextListItem item={item} translate={false} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
}
