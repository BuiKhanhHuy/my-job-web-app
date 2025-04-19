import dayjs from "dayjs";
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import DevicesIcon from "@mui/icons-material/Devices";
import { ReactComponent as ImageSvg1 } from "../assets/images/svg-images/empty-data.svg";
import { ReactComponent as ImageSvg2 } from "../assets/images/svg-images/online-gallery.svg";
import { ReactComponent as ImageSvg3 } from "../assets/images/svg-images/empty-street.svg";
import { ReactComponent as ImageSvg4 } from "../assets/images/svg-images/dreamer.svg";
import { ReactComponent as ImageSvg5 } from "../assets/images/svg-images/small_town.svg";
import { ReactComponent as ImageSvg6 } from "../assets/images/svg-images/working_remotely.svg";
import { ReactComponent as ImageSvg7 } from "../assets/images/svg-images/country_side.svg";
import { ReactComponent as ImageSvg8 } from "../assets/images/svg-images/thoughts.svg";
import { ReactComponent as ImageSvg9 } from "../assets/images/svg-images/browsing_online.svg";
import { ReactComponent as ImageSvg10 } from "../assets/images/svg-images/note_list.svg";
import { ReactComponent as ImageSvg11 } from "../assets/images/svg-images/profile_data.svg";
import { ReactComponent as ImageSvg12 } from "../assets/images/svg-images/my_documents.svg";
import { ReactComponent as ImageSvg13 } from "../assets/images/svg-images/opinion.svg";
import { ReactComponent as ImageSvg14 } from "../assets/images/svg-images/letter.svg";
import { ReactComponent as ImageSvg15 } from "../assets/images/svg-images/sad.svg";

const ENV = process.env.REACT_APP_NODE_ENV || "development";

const PLATFORM = "WEB";

const APP_NAME = "MyJob";

const HOST_NAME = {
  MYJOB: process.env.REACT_APP_MYJOB_HOST_NAME || "127.0.0.1",
  EMPLOYER_MYJOB: process.env.REACT_APP_EMPLOYER_MYJOB_HOST_NAME || "localhost",
};

const AUTH_PROVIDER = {
  FACEBOOK: "facebook",
  GOOGLE: "google-oauth2",
};

const AUTH_CONFIG = {
  // BACKEND
  CLIENT_ID: process.env.REACT_APP_MYJOB_SERVER_CLIENT_ID,
  CLIENT_SECRECT: process.env.REACT_APP_MYJOB_SERVER_CLIENT_SECRECT,
  BACKEND_KEY: "backend",
  ACCESS_TOKEN_KEY: "access_token",
  REFRESH_TOKEN_KEY: "refresh_token",
  PASSWORD_KEY: "password",
  CONVERT_TOKEN_KEY: "convert_token",

  // FACEBOOK AUTH
  FACEBOOK_CLIENT_ID: process.env.REACT_APP_FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: process.env.REACT_APP_FACEBOOK_CLIENT_SECRET,

  // GOOGLE AUTH
  GOOGLE_CLIENT_ID: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.REACT_APP_GOOGLE_CLIENT_SECRET,

  // GOONG
  GOONGAPI_KEY: process.env.REACT_APP_GOONGAPI_KEY,
  GOONGAPI_ACCESS_TOKEN: process.env.REACT_APP_GOONGAPI_ACCESS_TOKEN,

  // Dialogflow chatbot
  JOB_SEEKER_BOT: {
    AGENT_ID:
      process.env.JOB_SEEKER_BOT_AGENT_ID || "",
    CHAT_TITLE: "MyJob AI",
    CHAT_ICON: require("../assets/icons/job_seeker_chatbot_icon.gif"),
  },
  EMPLOYER_BOT: {
    AGENT_ID: process.env.EMPLOYER_BOT_AGENT_ID || "",
    CHAT_TITLE: "MyJob AI",
    CHAT_ICON: require("../assets/icons/employer_chatbot_icon.gif"),
  },
};

const ROLES_NAME = {
  ADMIN: "ADMIN",
  EMPLOYER: "EMPLOYER",
  JOB_SEEKER: "JOB_SEEKER",
};

const HOME_FILTER_CAREER = [
  {
    id: 34,
    name: "IT - Phần mềm",
    titleIcon: <DevicesIcon color="secondary" />,
  },
  {
    id: 33,
    name: "IT - Phần cứng/Mạng",
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
  cvWebsite: "WEBSITE",
  cvUpload: "UPLOAD",
};

const DATE_OPTIONS = {
  yesterday: dayjs().add(-1, "day"),
  today: dayjs(),
  tomorrow: dayjs().add(1, "day"),
  dayCustom: (num) => dayjs().add(num, "day"),
};

const IMAGES = {
  getLogo: (size, mode) => {
    return require(`../assets/logo/${mode}-logo-${size}.png`);
  },
  getTextLogo: (mode) => {
    return require(`../assets/logo/${mode}-text-logo.png`);
  },
  coverImageDefault: require("../assets/images/cover-image-default.webp"),
  chPlayDownload: require("../assets/images/app-android-download.png"),
  appStoreDownload: require("../assets/images/app-ios-download.png"),
  notificationImageDefault: require("../assets/images/noti-img-default.png"),
};

const ABOUT_IMAGES = {
  AROUND_JOB_POST: require("../assets/images/about-images/around-job-post.png"),
  JOB_POST_NOTIFICATION: require("../assets/images/about-images/job-notification-img.png"),
  JOB_POST: require("../assets/images/about-images/job-post-img.png"),
  PROFILE: require("../assets/images/about-images/profile-img.png"),
};

const ICONS = {
  INSTAGRAM: require("../assets/icons/instagram-icon.png"),
  FACEBOOK: require("../assets/icons/facebook-icon.png"),
  FACEBOOK_MESSENGER: require("../assets/icons/facebook-messenger-icon.png"),
  LINKEDIN: require("../assets/icons/linkedin-icon.png"),
  TWITTER: require("../assets/icons/twitter-icon.png"),
  YOUTUBE: require("../assets/icons/youtube-icon.png"),
  LOCATION_MARKER: require("../assets/icons/location-marker.gif"),
  JOB_SEEKER_CHATBOT_ICON: require("../assets/icons/job_seeker_chatbot_icon.gif"),
  EMPLOYER_CHATBOT_ICON: require("../assets/icons/employer_chatbot_icon.gif"),
};

const LINKS = {
  CHPLAY_LINK: "https://play.google.com/store/",
  APPSTORE_LINK: "https://www.apple.com/app-store/",
  CERTIFICATE_LINK: "http://online.gov.vn/",
  INSTAGRAM_LINK: "https://www.instagram.com/huybk2/",
  FACEBOOK_LINK: "https://www.facebook.com/bkhuy/",
  FACEBOOK_MESSENGER_LINK: "https://www.facebook.com/bkhuy/",
  LINKEDIN_LINK: "https://www.linkedin.com/in/huy-khanh-10041b20b/",
  TWITTER_LINK: "https://twitter.com/HuyBuiKhanh",
  YOUTUBE_LINK: "https://www.youtube.com/channel/UCn49BvcP1w1mamaOSGTKVZw",
};

const LOADING_IMAGES = {
  LOADING_SPINNER: require("../assets/images/loading/loading-spinner.gif"),
};

const FEEDBACK_IMAGES = {
  "1star": require("../assets/images/feedbacks/1star.gif"),
  "2star": require("../assets/images/feedbacks/2star.gif"),
  "3star": require("../assets/images/feedbacks/3star.gif"),
  "4star": require("../assets/images/feedbacks/4star.gif"),
  "5star": require("../assets/images/feedbacks/5star.gif"),
};

const LOGO_IMAGES = {
  LOGO_WITH_BG: require("../assets/logo/logo-with-bg.jpg"),
};

const BANNER_TYPES = {
  HOME: "HOME",
  MAIN_JOB_RIGHT: "MAIN_JOB_RIGHT",
};

const JOB_POST_STATUS_BG_COLOR = {
  1: "warning",
  2: "error",
  3: "success",
};

const ROUTES = {
  AUTH: {
    EMAIL_VERIFICATION: "email-verification-required",
    LOGIN: "dang-nhap",
    REGISTER: "dang-ky",
    FORGOT_PASSWORD: "quen-mat-khau",
    RESET_PASSWORD: "cap-nhat-mat-khau/:token",
  },
  ERROR: {
    NOT_FOUND: "*",
    FORBIDDEN: "forbidden",
  },
  JOB_SEEKER: {
    HOME: "",
    JOBS: "viec-lam",
    JOB_DETAIL: "viec-lam/:slug",
    COMPANY: "cong-ty",
    COMPANY_DETAIL: "cong-ty/:slug",
    ABOUT_US: "ve-chung-toi",
    JOBS_BY_CAREER: "viec-lam-theo-nganh-nghe",
    JOBS_BY_CITY: "viec-lam-theo-tinh-thanh",
    JOBS_BY_TYPE: "viec-lam-theo-hinh-thuc-lam-viec",
    DASHBOARD: "bang-dieu-khien",
    PROFILE: "ho-so",
    STEP_PROFILE: "ho-so-tung-buoc/:slug",
    ATTACHED_PROFILE: "ho-so-dinh-kem/:slug",
    MY_JOB: "viec-lam-cua-toi",
    MY_COMPANY: "cong-ty-cua-toi",
    NOTIFICATION: "thong-bao",
    ACCOUNT: "tai-khoan",
    CHAT: "ket-noi-voi-nha-tuyen-dung",
  },
  EMPLOYER: {
    INTRODUCE: "gioi-thieu",
    SERVICE: "dich-vu",
    PRICING: "bao-gia",
    SUPPORT: "ho-tro",
    BLOG: "blog-tuyen-dung",
    DASHBOARD: "",
    JOB_POST: "tin-tuyen-dung",
    APPLIED_PROFILE: "ho-so-ung-tuyen",
    SAVED_PROFILE: "ho-so-da-luu",
    PROFILE: "danh-sach-ung-vien",
    PROFILE_DETAIL: "chi-tiet-ung-vien/:slug",
    COMPANY: "cong-ty",
    NOTIFICATION: "thong-bao",
    ACCOUNT: "tai-khoan",
    SETTING: "cai-dat",
    CHAT: "ket-noi-voi-ung-vien",
  },
};

export {
  ENV,
  PLATFORM,
  APP_NAME,
  HOST_NAME,
  AUTH_PROVIDER,
  AUTH_CONFIG,
  ROLES_NAME,
  HOME_FILTER_CAREER,
  REGEX_VATIDATE,
  CV_TYPES,
  BANNER_TYPES,
  DATE_OPTIONS,
  IMAGES,
  ABOUT_IMAGES,
  LOADING_IMAGES,
  FEEDBACK_IMAGES,
  LOGO_IMAGES,
  LINKS,
  ICONS,
  JOB_POST_STATUS_BG_COLOR,
  ROUTES,
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
  ImageSvg15,
};
