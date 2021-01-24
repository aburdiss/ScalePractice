import DeviceInfo from 'react-native-device-info';

const GOOGLE_PLAY_LINK =
  'https://play.google.com/store/apps/developer?id=Alexander+Burdiss';
const APPLE_STORE_LINK =
  'https://apps.apple.com/us/developer/alexander-burdiss/id1496727055';

export const RESOURCES = [
  {
    id: '0',
    type: 'link',
    value: 'More Apps by Alexander Burdiss',
    link:
      DeviceInfo.getBrand() === 'Apple' ? APPLE_STORE_LINK : GOOGLE_PLAY_LINK,
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

export const ABOUT = [
  {
    id: '3',
    type: 'text',
    value: `© ${new Date().getFullYear()} ` + 'Alexander Burdiss',
  },
  {
    id: '4',
    type: 'text',
    value: 'Special Thanks to Qian Yu',
  },
  {
    id: '5',
    type: 'link',
    value: 'Send Feedback',
    link: 'mailto:aburdiss@icloud.com',
  },
];
