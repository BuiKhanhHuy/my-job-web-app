import dayjs from 'dayjs';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DevicesIcon from '@mui/icons-material/Devices';
import { ReactComponent as ImageSvg1 } from '../assets/images/svg-images/empty-data.svg';
import { ReactComponent as ImageSvg2 } from '../assets/images/svg-images/online-gallery.svg';
import { ReactComponent as ImageSvg3 } from '../assets/images/svg-images/empty-street.svg';
import { ReactComponent as ImageSvg4 } from '../assets/images/svg-images/dreamer.svg';
import { ReactComponent as ImageSvg5 } from '../assets/images/svg-images/small_town.svg';
import { ReactComponent as ImageSvg6 } from '../assets/images/svg-images/working_remotely.svg';
import { ReactComponent as ImageSvg7 } from '../assets/images/svg-images/country_side.svg';
import { ReactComponent as ImageSvg8 } from '../assets/images/svg-images/thoughts.svg';
import { ReactComponent as ImageSvg9 } from '../assets/images/svg-images/browsing_online.svg';
import { ReactComponent as ImageSvg10 } from '../assets/images/svg-images/note_list.svg';
import { ReactComponent as ImageSvg11 } from '../assets/images/svg-images/profile_data.svg';
import { ReactComponent as ImageSvg12 } from '../assets/images/svg-images/my_documents.svg';
import { ReactComponent as ImageSvg13 } from '../assets/images/svg-images/opinion.svg';
import { ReactComponent as ImageSvg14 } from '../assets/images/svg-images/letter.svg';
import { ReactComponent as ImageSvg15 } from '../assets/images/svg-images/sad.svg';

const PLATFORM = 'WEB';

const AUTH_PROVIDER = {
  FACEBOOK: 'facebook',
  GOOGLE: 'google-oauth2',
};

const AUTH_CONFIG = {
  // BACKEND
  CLIENT_ID: process.env.REACT_APP_MYJOB_SERVER_CLIENT_ID,
  CLIENT_SECRECT: process.env.REACT_APP_MYJOB_SERVER_CLIENT_SECRECT,
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  PASSWORD_KEY: 'password',
  CONVERT_TOKEN_KEY: 'convert_token',

  // FACEBOOK AUTH
  FACEBOOK_CLIENT_ID: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.REACT_APP_FACEBOOK_CLIENT_SECRET,

  // GOOGLE AUTH
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,

  // GOONG
  GOONGAPI_KEY: process.env.REACT_APP_GOONGAPI_KEY,
  GOONGAPI_ACCESS_TOKEN: process.env.REACT_APP_GOONGAPI_ACCESS_TOKEN,

  // BING MAP
  BING_MAPS_KEY: process.env.REACT_APP_BING_MAPS_KEY,

  // RNKommunicateChat
  CHAT_APP_ID: process.env.REACT_APP_CHAT_APP_ID,
};

const ROLES_NAME = {
  ADMIN: 'ADMIN',
  EMPLOYER: 'EMPLOYER',
  JOB_SEEKER: 'JOB_SEEKER',
};

const HOME_FILTER_CAREER = [
  {
    id: 8,
    name: 'IT - Phần mềm',
    titleIcon: <DevicesIcon color="secondary" />,
  },
  {
    id: 7,
    name: 'IT - Phần cứng',
    titleIcon: <DeveloperBoardIcon color="secondary" />,
  },
];

const REGEX_VATIDATE = {
  phoneRegExp:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  urlRegExp:
    // eslint-disable-next-line no-useless-escape
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
};

const CV_TYPES = {
  cvWebsite: 'WEBSITE',
  cvUpload: 'UPLOAD',
};

const DATE_OPTIONS = {
  yesterday: dayjs().add(-1, 'day'),
  today: dayjs(),
  tomorrow: dayjs().add(1, 'day'),
  dayCustom: (num) => dayjs().add(num, 'day'),
};

const IMAGES = {
  getLogo: (size, mode) => {
    return require(`../assets/logo/${mode}-logo-${size}.png`);
  },
  getTextLogo: (mode) => {
    return require(`../assets/logo/${mode}-text-logo.png`);
  },
  coverImageDefault: require('../assets/images/cover-image-default.webp'),
  chPlayDownload: require('../assets/images/app-android-download.png'),
  appStoreDownload: require('../assets/images/app-ios-download.png'),
  notificationImageDefault: require('../assets/images/noti-img-default.png'),
};

const ABOUT_IMAGES = {
  AROUND_JOB_POST: require('../assets/images/about-images/around-job-post.png'),
  JOB_POST_NOTIFICATION: require('../assets/images/about-images/job-notification-img.png'),
  JOB_POST: require('../assets/images/about-images/job-post-img.png'),
  PROFILE: require('../assets/images/about-images/profile-img.png'),
};

const ICONS = {
  INSTAGRAM: require('../assets/icons/instagram-icon.png'),
  FACEBOOK: require('../assets/icons/facebook-icon.png'),
  FACEBOOK_MESSENGER: require('../assets/icons/facebook-messenger-icon.png'),
  LINKEDIN: require('../assets/icons/linkedin-icon.png'),
  TWITTER: require('../assets/icons/twitter-icon.png'),
  YOUTUBE: require('../assets/icons/youtube-icon.png'),
};

const LINKS = {
  CHPLAY_LINK: 'https://play.google.com/store/',
  APPSTORE_LINK: 'https://www.apple.com/app-store/',
  CERTIFICATE_LINK: 'http://online.gov.vn/',
  INSTAGRAM_LINK: 'https://www.instagram.com/huybk2/',
  FACEBOOK_LINK: 'https://www.facebook.com/bkhuy/',
  FACEBOOK_MESSENGER_LINK: 'https://www.facebook.com/bkhuy/',
  LINKEDIN_LINK: 'https://www.linkedin.com/in/huy-khanh-10041b20b/',
  TWITTER_LINK: 'https://twitter.com/HuyBuiKhanh',
  YOUTUBE_LINK: 'https://www.youtube.com/channel/UCn49BvcP1w1mamaOSGTKVZw',
};

const BANNER_TYPE = {
  HOME: 'HOME',
  MAIN_JOB_RIGHT: 'MAIN_JOB_RIGHT',
};

export {
  PLATFORM,
  AUTH_PROVIDER,
  AUTH_CONFIG,
  ROLES_NAME,
  HOME_FILTER_CAREER,
  REGEX_VATIDATE,
  CV_TYPES,
  DATE_OPTIONS,
  IMAGES,
  ABOUT_IMAGES,
  LINKS,
  ICONS,
  BANNER_TYPE,
  ImageSvg1,
  ImageSvg2,
  ImageSvg3,
  ImageSvg4,
  ImageSvg5,
  ImageSvg6,
  ImageSvg7,
  ImageSvg8,
  ImageSvg9,
  ImageSvg10,
  ImageSvg11,
  ImageSvg12,
  ImageSvg13,
  ImageSvg14,
  ImageSvg15
};
