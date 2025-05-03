/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import dayjs from './moment-config';
import DeveloperBoardIcon from "@mui/icons-material/DeveloperBoard";
import DevicesIcon from "@mui/icons-material/Devices";

// Import SVG files
import emptyDataSvg from "../assets/images/svg-images/empty-data.svg";
import onlineGallerySvg from "../assets/images/svg-images/online-gallery.svg";
import emptyStreetSvg from "../assets/images/svg-images/empty-street.svg";
import dreamerSvg from "../assets/images/svg-images/dreamer.svg";
import smallTownSvg from "../assets/images/svg-images/small_town.svg";
import workingRemotelySvg from "../assets/images/svg-images/working_remotely.svg";
import countrySideSvg from "../assets/images/svg-images/country_side.svg";
import thoughtsSvg from "../assets/images/svg-images/thoughts.svg";
import browsingOnlineSvg from "../assets/images/svg-images/browsing_online.svg";
import noteListSvg from "../assets/images/svg-images/note_list.svg";
import profileDataSvg from "../assets/images/svg-images/profile_data.svg";
import myDocumentsSvg from "../assets/images/svg-images/my_documents.svg";
import opinionSvg from "../assets/images/svg-images/opinion.svg";
import letterSvg from "../assets/images/svg-images/letter.svg";
import sadSvg from "../assets/images/svg-images/sad.svg";

// Import các assets
import jobSeekerChatbotIcon from "../assets/icons/job_seeker_chatbot_icon.gif";
import employerChatbotIcon from "../assets/icons/employer_chatbot_icon.gif";
import coverImageDefault from "../assets/images/cover-image-default.webp";
import chPlayDownload from "../assets/images/app-android-download.png";
import appStoreDownload from "../assets/images/app-ios-download.png";
import notificationImageDefault from "../assets/images/noti-img-default.png";
import aroundJobPost from "../assets/images/about-images/around-job-post.png";
import jobPostNotification from "../assets/images/about-images/job-notification-img.png";
import jobPostImg from "../assets/images/about-images/job-post-img.png";
import profileImg from "../assets/images/about-images/profile-img.png";
import instagramIcon from "../assets/icons/instagram-icon.png";
import facebookIcon from "../assets/icons/facebook-icon.png";
import facebookMessengerIcon from "../assets/icons/facebook-messenger-icon.png";
import linkedinIcon from "../assets/icons/linkedin-icon.png";
import twitterIcon from "../assets/icons/twitter-icon.png";
import youtubeIcon from "../assets/icons/youtube-icon.png";
import locationMarker from "../assets/icons/location-marker.gif";
import loadingSpinner from "../assets/images/loading/loading-spinner.gif";
import star1 from "../assets/images/feedbacks/1star.gif";
import star2 from "../assets/images/feedbacks/2star.gif";
import star3 from "../assets/images/feedbacks/3star.gif";
import star4 from "../assets/images/feedbacks/4star.gif";
import star5 from "../assets/images/feedbacks/5star.gif";
import logoWithBg from "../assets/logo/logo-with-bg.jpg";

const ENV = import.meta.env.VITE_NODE_ENV || "development";

const PLATFORM = "WEB";

const APP_NAME = "MyJob";

const HOST_NAME = {
  MYJOB:  import.meta.env.VITE_MYJOB_HOST_NAME,
  EMPLOYER_MYJOB:  import.meta.env.VITE_EMPLOYER_MYJOB_HOST_NAME,
};

const AUTH_PROVIDER = {
  FACEBOOK: "facebook",
  GOOGLE: "google-oauth2",
};

const AUTH_CONFIG = {
  // BACKEND
  CLIENT_ID: import.meta.env.VITE_MYJOB_SERVER_CLIENT_ID,
  CLIENT_SECRECT: import.meta.env.VITE_MYJOB_SERVER_CLIENT_SECRECT,
  BACKEND_KEY: "backend",
  ACCESS_TOKEN_KEY: "access_token",
  REFRESH_TOKEN_KEY: "refresh_token",
  PASSWORD_KEY: "password",
  CONVERT_TOKEN_KEY: "convert_token",

  // FACEBOOK AUTH
  FACEBOOK_CLIENT_ID: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET: import.meta.env.VITE_FACEBOOK_CLIENT_SECRET,

  // GOOGLE AUTH
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,

  // GOONG
  GOONGAPI_KEY: import.meta.env.VITE_GOONGAPI_KEY,

  // Dialogflow chatbot
  JOB_SEEKER_BOT: {
    AGENT_ID: import.meta.env.VITE_JOB_SEEKER_BOT_AGENT_ID || "",
    CHAT_TITLE: "MyJob AI",
    CHAT_ICON: jobSeekerChatbotIcon,
  },
  EMPLOYER_BOT: {
    AGENT_ID: import.meta.env.VITE_EMPLOYER_BOT_AGENT_ID || "",
    CHAT_TITLE: "MyJob AI",
    CHAT_ICON: employerChatbotIcon,
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
    titleIcon: DevicesIcon 
  },
  {
    id: 33,
    name: "IT - Phần cứng/Mạng",
    titleIcon: DeveloperBoardIcon
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
    return new URL(`../assets/logo/${mode}-logo-${size}.png`, import.meta.url).href;
  },
  getTextLogo: (mode) => {
    return new URL(`../assets/logo/${mode}-text-logo.png`, import.meta.url).href;
  },
  coverImageDefault,
  chPlayDownload,
  appStoreDownload,
  notificationImageDefault,
};

const ABOUT_IMAGES = {
  AROUND_JOB_POST: aroundJobPost,
  JOB_POST_NOTIFICATION: jobPostNotification,
  JOB_POST: jobPostImg,
  PROFILE: profileImg,
};

const ICONS = {
  INSTAGRAM: instagramIcon,
  FACEBOOK: facebookIcon,
  FACEBOOK_MESSENGER: facebookMessengerIcon,
  LINKEDIN: linkedinIcon,
  TWITTER: twitterIcon,
  YOUTUBE: youtubeIcon,
  LOCATION_MARKER: locationMarker,
  JOB_SEEKER_CHATBOT_ICON: jobSeekerChatbotIcon,
  EMPLOYER_CHATBOT_ICON: employerChatbotIcon,
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
  LOADING_SPINNER: loadingSpinner,
};

const FEEDBACK_IMAGES = {
  "1star": star1,
  "2star": star2,
  "3star": star3,
  "4star": star4,
  "5star": star5,
};

const LOGO_IMAGES = {
  LOGO_WITH_BG: logoWithBg,
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

// SVG components
const SVG_IMAGES = {
  ImageSvg1: emptyDataSvg,
  ImageSvg2: onlineGallerySvg,
  ImageSvg3: emptyStreetSvg,
  ImageSvg4: dreamerSvg,
  ImageSvg5: smallTownSvg,
  ImageSvg6: workingRemotelySvg,
  ImageSvg7: countrySideSvg,
  ImageSvg8: thoughtsSvg,
  ImageSvg9: browsingOnlineSvg,
  ImageSvg10: noteListSvg,
  ImageSvg11: profileDataSvg,
  ImageSvg12: myDocumentsSvg,
  ImageSvg13: opinionSvg,
  ImageSvg14: letterSvg,
  ImageSvg15: sadSvg,
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
  SVG_IMAGES,
};