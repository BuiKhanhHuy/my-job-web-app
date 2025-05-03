import React from 'react';
import dayjs from '../../configs/moment-config';

const TimeAgo = ({ date, type = 'fromNow', format = 'DD/MM/YYYY HH:mm' }) => {
  const [timeString, setTimeString] = React.useState('');

  React.useEffect(() => {
    if (!date) return;

    const updateTime = () => {
      const dayjsDate = dayjs(date);
      if (type === 'fromNow') {
        setTimeString(dayjsDate.fromNow(true));
      } else {
        setTimeString(dayjsDate.format(format));
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, [date, type]);

  if (!date) return null;

  return <span>{timeString}</span>;
};

export default TimeAgo; 