import moment from 'moment-timezone';
import 'moment/locale/vi';

export const formatMessageDate = (timestamp) => {
  return moment(timestamp).calendar(null, {
    sameDay: '[Hôm nay] LT',
    lastDay: '[Hôm qua] LT',
    lastWeek: 'DD/MM/YYYY LT',
    sameElse: 'DD/MM/YYYY LT',
  });
};
