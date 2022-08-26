import React from "react";
import { SectionList, Text, View } from "react-native";

import { TextListItem } from "../../Components";

import { colors } from "../../Model/Model";
import { TRANSLATIONS } from "../../Model/AcknowledgementsModel";
import { translate } from "../../Translations/TranslationModel";
import { useDarkMode, useIdleScreen } from "../../utils";

/**
 * @description A View that displays the people who directly assisted with
 * this project
 * @author Alexander Burdiss
 * @since 2/20/21
 * @version 1.1.0
 *
 * @example
 * <Acknowledgements />
 */
const Acknowledgements = () => {
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = {
    listHeader: {
      textTransform: "uppercase",
      paddingLeft: 20,
      paddingTop: 30,
      paddingBottom: 10,
      color: DARKMODE ? colors.systemGray : colors.systemGray,
    },
    sectionList: {
      height: "100%",
      backgroundColor: DARKMODE ? colors.black : colors.systemGray6Light,
    },
    iconContainer: {
      flexDirection: "row",
    },
    icon: {
      paddingHorizontal: 5,
    },
    footerContainer: {
      paddingTop: 30,
      alignItems: "center",
    },
    footerText: {
      color: colors.systemGray,
      paddingTop: 10,
      paddingBottom: 30,
    },
  };

  return (
    <View style={styles.sectionList}>
      <SectionList
        sections={[{ title: translate("Translations"), data: TRANSLATIONS }]}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => <TextListItem item={item} />}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

export default Acknowledgements;
