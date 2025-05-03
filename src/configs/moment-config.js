import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/vi';

// Config plugins
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(tz);
dayjs.extend(customParseFormat);

// Set default locale to Vietnamese
dayjs.locale('vi');

// Set default timezone to Asia/Ho_Chi_Minh
dayjs.tz.setDefault('Asia/Ho_Chi_Minh');

export default dayjs; 