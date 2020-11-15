import React from 'react';
import { View, Text, SectionList, Linking, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import { DynamicStyleSheet, DynamicValue, useDynamicValue } from 'react-native-dynamic'

import { colors } from '../Model';

const GOOGLE_PLAY_LINK = 'https://play.google.com/store/apps/developer?id=Alexander+Burdiss';
const APPLE_STORE_LINK = 'https://apps.apple.com/us/developer/alexander-burdiss/id1496727055';

const RESOURCES = [
  {
    id: '0',
    type: 'link',
    value: 'More Apps by Alexander Burdiss',
    link:
      DeviceInfo.getBrand() === 'Apple' 
        ? APPLE_STORE_LINK 
        : GOOGLE_PLAY_LINK,
  },
  {
    id: '1',
    type: 'link',
    value: 'Visit Ars Nova Publishing',
    link: 'https://www.arsnovapublishing.com/',
  },
  {
    id: '2',
    type: 'link',
    value: 'Visit Band Room Online',
    link: 'https://www.bandroomonline.com/',
  },
];

const ABOUT = [
  {
    id: '3',
    type: 'text',
    value: `© ${new Date().getFullYear()} Alexander Burdiss`,
    link: null,
  },
  {
    id: '4',
    type: 'link',
    value: 'Send Feedback',
    link: 'mailto:aburdiss@gmail.com',
  },
];


/**
 * @description A rendered Text list item. 
 * @author Alexander Burdiss
 * @since 11/15/20
 */
const TextListItem = ({ item }) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <View style={styles.listRowContainer}>
      <Text style={styles.listRowText}>{item.value}</Text>
    </View>
  );
}


/**
 * @description A rendered Link list item with a chevron and purple text
 * @author Alexander Burdiss
 * @since 11/15/20
 */
const LinkListItem = ({ item }) => {
  const styles = useDynamicValue(dynamicStyles);

  return (
    <Pressable
      onPress={() => {
        Linking.openURL(item.link);
      }}
    >
      <View style={styles.listRowContainer}>
        <Text style={styles.linkText}>{item.value}</Text>
        <Ionicons name={'chevron-forward-outline'} size={25} color={styles.linkText.color} />
      </View>
    </Pressable>
  )
}


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
          {title: "Resources", data: RESOURCES},
          {title: "About", data: ABOUT},
        ]}
        keyExtractor={(item, index) => index}
        renderItem={({ item }) => (
          item.type === 'link'
          ? <LinkListItem item={item} />
          : <TextListItem item={item} />
        )}
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
    backgroundColor: new DynamicValue(colors.systemGray3Light, colors.systemGray3Dark),
  },
  listHeader: {
    textTransform: 'uppercase',
    paddingLeft: 20,
    paddingTop: 30,
    paddingBottom: 10,
    color: new DynamicValue(colors.systemGray, colors.systemGray),
  },
  listRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: new DynamicValue(colors.white, colors.systemGray6Dark),
    paddingVertical: 8,
    height: 45,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: new DynamicValue(colors.systemGray5Light, colors.systemGray5Dark),
  },
  listRowText: {
    color: new DynamicValue(colors.black, colors.white),
  },
  linkText: {
    color: new DynamicValue(colors.purpleLight, colors.purpleDark),
  },
  sectionList: {
    height: '100%',
    backgroundColor: new DynamicValue(colors.systemGray6Light, colors.black),
  }
});

export default More;
