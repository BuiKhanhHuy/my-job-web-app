import dayjs from 'dayjs';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import DevicesIcon from '@mui/icons-material/Devices';
import ImageSvg1 from '../assets/images/svg-images/empty-data.svg';
import ImageSvg2 from '../assets/images/svg-images/online-gallery.svg';

const AUTH_CONFIG = {
  CLIENT_ID: '0VdoWiB6AaDGv1OiQeRn5c3BOcxEDMv1t4o8eFTt',
  CLIENT_SECRECT:
    'daVqY2XSmkHfWUM2ufS5tn3vjnJFae77OqAXWQllFVqO3JQgCbz25e7npeGJlTXdXcNHwn1uo6amYm2Yq1zOOcG5uQbvG7xiAq6DWIjAvdmSNJN2xewAOpsk7ulKVqDb',
  ACCESS_TOKEN_KEY: 'access_token',
  REFRESH_TOKEN_KEY: 'refresh_token',
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
};

const IMAGE_SVG = {
  img1: ImageSvg1,
  img2: ImageSvg2,
};

export {
  AUTH_CONFIG,
  ROLES_NAME,
  HOME_FILTER_CAREER,
  REGEX_VATIDATE,
  CV_TYPES,
  DATE_OPTIONS,
  IMAGES,
  IMAGE_SVG,
};
