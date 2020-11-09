import React from 'react';
import { View, Text, SectionList, Linking, StyleSheet, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';


const RESOURCES = [
  {
    id: '0',
    type: 'link',
    value: 'More Apps by Alexander Burdiss',
    link: 'https://play.google.com/store/apps/developer?id=Alexander+Burdiss',
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

const ItemSeparator = () => {
  return (
    <View style={styles.listItemSeparator} />
  );
}

const TextListItem = ({ item }) => {
  return (
    <View style={styles.listRowContainer}>
      <Text>{item.value}</Text>
    </View>
  );
}

const LinkListItem = ({ item }) => {
  return (
    <Pressable
      onPress={() => {
        Linking.openURL(item.link);
      }}
    >
      <View style={styles.listRowContainer}>
        <Text style={styles.linkText}>{item.value}</Text>
        <Ionicons name={'chevron-forward-outline'} size={30} color={'purple'} />
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
      />
    </View>
  );
};

export default More;

const styles = StyleSheet.create({
  listItemSeparator: {
    height: 0.5,
    width: '100%',
    backgroundColor: '#C8C8C8',
  },
  listHeader: {
    textTransform: 'uppercase',
    paddingLeft: 15,
    paddingTop: 30,
    paddingBottom: 5,
  },
  listRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 8,
    height: 45,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: 'gray',
  },
  linkText: {
    color: 'purple',
  }
});
