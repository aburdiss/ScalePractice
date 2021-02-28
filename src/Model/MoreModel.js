import DeviceInfo from 'react-native-device-info';

const GOOGLE_PLAY_LINK =
  'https://play.google.com/store/apps/developer?id=Alexander+Burdiss';
const APPLE_STORE_LINK =
  'https://apps.apple.com/us/developer/alexander-burdiss/id1496727055';
const AMAZON_STORE_LINK =
  'https://www.amazon.com/s?i=mobile-apps&rh=p_4%3AAlexander+Burdiss';

export const SETTINGS = [
  {
    id: '0',
    type: 'switch',
    value: 'Repeat Scales',
    setting: 'repeat',
  },
];

export const RESOURCES = [
  {
    id: '0',
    type: 'link',
    value: 'More Apps by Alexander Burdiss',
    image: require('../../img/BrassRoutinesIcon.png'),
    link:
      DeviceInfo.getBrand() === 'Apple'
        ? APPLE_STORE_LINK
        : DeviceInfo.getBrand() === 'Amazon'
        ? AMAZON_STORE_LINK
        : GOOGLE_PLAY_LINK,
  },
  {
    id: '1',
    type: 'link',
    value: 'Visit Ars Nova Publishing',
    image: require('../../img/ANPLogo.png'),
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
    id: '16',
    type: 'navigate',
    value: 'Acknowledgements',
    component: 'Acknowledgements',
  },
  {
    id: '15',
    type: 'navigate',
    value: 'Licenses',
    component: 'Licenses',
  },
  {
    id: '5',
    type: 'link',
    value: 'Send Feedback',
    link: 'mailto:aburdiss@icloud.com',
  },
];
