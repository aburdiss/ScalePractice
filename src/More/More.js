import React from 'react';
import {View, Text, SectionList} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {
  DynamicStyleSheet,
  DynamicValue,
  useDynamicValue,
} from 'react-native-dynamic';

import {LinkListItem, TextListItem} from './MoreListItems';
import {colors} from '../Model/Model';
import {RESOURCES, ABOUT} from '../Model/MoreModel';
import {translate} from '../Translations/TranslationModel';

/**
 * @description A view with links to additional resources and settings for the
 * app.
 * @author Alexander Burdiss
 * @since 10/10/20
 */
const More = () => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View>
      <SectionList
        sections={[
          {title: translate('Resources'), data: RESOURCES},
          {title: translate('About'), data: ABOUT},
        ]}
        keyExtractor={(item, index) => index}
        renderItem={({item}) =>
          item.type === 'link' ? (
            <LinkListItem item={item} />
          ) : (
            <TextListItem item={item} />
          )
        }
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.listHeader}>{title}</Text>
        )}
        style={styles.sectionList}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const dynamicStyles = new DynamicStyleSheet({
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
});

export default More;
