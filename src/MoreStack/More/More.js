import React, { useContext } from 'react';
import { View, Text, SectionList } from 'react-native';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  SwitchListItem,
  LinkListItem,
  TextListItem,
  InternalListItem,
} from '../../Components/ListItems/SwitchListItem/SwitchListItem';
import { colors } from '../../Model/Model';
import { RESOURCES, ABOUT, SETTINGS } from '../../Model/MoreModel';
import { translate } from '../../Translations/TranslationModel';
import { PreferencesContext } from '../../Model/Preferences';
import { useIdleScreen } from '../../utils/useIdleScreen/useIdleScreen';

/**
 * @description A view with links to additional resources and settings for the
 * app.
 * @author Alexander Burdiss
 * @since 10/10/20
 * @version 1.1.0
 *
 * @component
 * @example
 * ```jsx
<More />
```
 */
const More = () => {
  useIdleScreen();

  const styles = useDynamicValue(dynamicStyles);
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

const dynamicStyles = new DynamicStyleSheet({
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
    backgroundColor: new DynamicValue(
      colors.systemGray3Light,
      colors.systemGray3Dark,
    ),
  },
  listHeader: {
    textTransform: 'uppercase',
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    color: new DynamicValue(colors.systemGray, colors.systemGray),
  },
  sectionList: {
    height: '100%',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
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

export default More;
