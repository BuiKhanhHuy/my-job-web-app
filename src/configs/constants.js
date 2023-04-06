import dayjs from 'dayjs';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DevicesIcon from '@mui/icons-material/Devices';
import ImageSvg1 from '../assets/images/svg-images/empty-data.svg';
import ImageSvg2 from '../assets/images/svg-images/online-gallery.svg';
import ImageSvg3 from '../assets/images/svg-images/empty-street.svg';
import ImageSvg4 from '../assets/images/svg-images/dreamer.svg';
import ImageSvg5 from '../assets/images/svg-images/small_town.svg';
import ImageSvg6 from '../assets/images/svg-images/blooming.svg';
import ImageSvg7 from '../assets/images/svg-images/country_side.svg';

const AUTH_PROVIDER = {
  FACEBOOK: 'facebook',
  GOOGLE: 'google-oauth2'
}

const AUTH_CONFIG = {
  // BACKEND
  CLIENT_ID: 'Vf4qQABzoS9TdZ8PQiSKowMbojNVygTZsAySqLXp',
  CLIENT_SECRECT:
    'SnvEBr7AvsoNNHouoF4TqZdvyjYeO16gk6RdF6IAek6GwkGGwK0jWTuWgo1ffzZmd6IIQUYLLfOTzRtCeyjYDfrm0bMcmAnPentRlHo3W9xmxbnKnNwXJ75Atj3m1yxr',
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
  PASSWORD_KEY: 'password',
  CONVERT_TOKEN_KEY: 'convert_token',

  // FACEBOOK AUTH
  FACEBOOK_CLIENT_ID: "503591871851468",
  FACEBOOK_CLIENT_SECRET: "87054023f865721b313376d492bb4c04",

  // GOOGLE AUTH
  GOOGLE_CLIENT_ID: "138562701986-5pm1ojcmu4chrhakorjn57mt1qb0go0o.apps.googleusercontent.com",
  GOOGLE_CLIENT_SECRET: "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",

  // GOONG
  GOONGAPI_KEY: 'UMRiT4CiOH9UU9Ju9L1YJLSYZM5EQberRoSsyfDW',
  GOONGAPI_ACCESS_TOKEN: 'q2ehn14wfdLdZkDXejl5d1X6pBxZf0ssca6jrEOo',

  // BING MAP
  BING_MAPS_KEY:
    'Av0DmLVNRE8m7HZGSTySLkyPaLX3Gg3b3cdt7I0ArXWxSmtKwqCpsUW6OE21t2z2',
};

const ROLES_NAME = {
  ADMIN: 'ADMIN',
  EMPLOYER: 'EMPLOYER',
  JOB_SEEKER: 'JOB_SEEKER',
};

const HOME_FILTER_CAREER = [
  {
    id: 37,
    name: 'IT - Phần mềm',
    titleIcon: <DevicesIcon color="secondary" />,
  },
  {
    id: 38,
    name: 'IT - Phần cứng',
    titleIcon: <DeveloperBoardIcon color="secondary" />,
  },
];

const REGEX_VATIDATE = {
  phoneRegExp:
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
  urlRegExp:
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

const IMAGE_SVG = {
  img1: ImageSvg1,
  img2: ImageSvg2,
  img3: ImageSvg3,
  img4: ImageSvg4,
  img5: ImageSvg5,
  img6: ImageSvg6,
  img7: ImageSvg7,
};

export {
  AUTH_PROVIDER,
  AUTH_CONFIG,
  ROLES_NAME,
  HOME_FILTER_CAREER,
  REGEX_VATIDATE,
  CV_TYPES,
  DATE_OPTIONS,
  IMAGES,
  LINKS,
  ICONS,
  IMAGE_SVG,
};
