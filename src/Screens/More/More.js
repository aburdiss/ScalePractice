import React, { useContext } from 'react';
import { View, Text, SectionList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  SwitchListItem,
  LinkListItem,
  TextListItem,
  InternalListItem,
} from '../../Components';
import { colors } from '../../Model/Model';
import { RESOURCES, ABOUT, SETTINGS } from '../../Model/MoreModel';
import { PreferencesContext } from '../../Model/Preferences';
import { translate } from '../../Translations/TranslationModel';
import { useDarkMode, useIdleScreen } from '../../utils';

/**
 * @description A view with links to additional resources and settings for the
 * app.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 1.1.0
 *
 * @example
 * <More />
 */
const More = () => {
  useIdleScreen();

  const DARKMODE = useDarkMode();
  const styles = {
    javascriptBackground: {
      backgroundColor: colors.black,
      height: 20,
      width: 20,
      marginLeft: 7,
      marginTop: 3,
      zIndex: -1,
      position: 'absolute',
    },
    listItemSeparator: {
      height: 0.5,
      width: '100%',
      backgroundColor: DARKMODE
        ? colors.systemGray3Dark
        : colors.systemGray3Light,
    },
    listHeader: {
      textTransform: 'uppercase',
      paddingLeft: 20,
      paddingTop: 30,
      paddingBottom: 10,
      color: colors.systemGray,
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
  };
  const { state, dispatch } = useContext(PreferencesContext);

  return (
    <View>
      <SectionList
        sections={[
          { title: translate('Settings'), data: SETTINGS },
          { title: translate('Resources'), data: RESOURCES },
          { title: translate('About'), data: ABOUT },
        ]}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => {
          switch (item.type) {
            case 'link':
              return <LinkListItem item={item} />;
            case 'text':
              return <TextListItem item={item} />;
            case 'navigate':
              return <InternalListItem item={item} />;
            case 'switch':
              return (
                <SwitchListItem item={item} state={state} dispatch={dispatch} />
              );
          }
        }}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
        style={styles.sectionList}
        stickySectionHeadersEnabled={false}
        ListFooterComponent={
          <View style={styles.footerContainer} importantForAccessibility="no">
            <View style={styles.iconContainer}>
              <Ionicons
                accessibilityLabel={translate('React Native Icon')}
                style={styles.icon}
                name="logo-react"
                size={24}
                color={colors.reactColor}
              />
              <View>
                <View style={styles.javascriptBackground} />
                <Ionicons
                  accessibilityLabel={translate('JavaScript Icon')}
                  style={styles.icon}
                  name="logo-javascript"
                  size={24}
                  color={colors.javascriptColor}
                />
              </View>
            </View>
            <Text style={styles.footerText}>
              {translate('Made with ❤️ in Dayton, Ohio')}
            </Text>
          </View>
        }
      />
    </View>
  );
};

export default More;
