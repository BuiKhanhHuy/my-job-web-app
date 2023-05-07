import React from 'react';
import { Box, Button, IconButton } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';

import { DatePicker } from 'antd';
import locale from '../../../locales/vi_VN';

import dayjs from 'dayjs';
const { RangePicker } = DatePicker;

function getMonthDiff(dateA, dateB) {
  const msPerDay = 86400000; // số milisecond trong một ngày

  // tính số ngày giữa hai ngày
  const daysDiff = Math.round((dateB - dateA) / msPerDay);

  // tính số tháng và ngày còn lại
  const monthDiff = Math.floor(daysDiff / 30);
  const daysRemaining = daysDiff % 30;

  return { months: monthDiff, days: daysRemaining };
}

const RangePickerCustom = ({
  allowSubmit,
  setAllowSubmit,
  selectedDateRange,
  setSelectedDateRange,
}) => {
  const [maxDate, setMaxDate] = React.useState(new Date());

  const disabledDate = React.useCallback(
    (current) => {
      return current && current > maxDate;

      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [maxDate]
  );

  const handleDateRangeChange = (dates) => {
    if (dates !== null && dates.length > 0) {
      const startDate = new Date(dayjs(dates[0]).format('YYYY-MM-DD'));
      const endDate = new Date(dayjs(dates[1]).format('YYYY-MM-DD'));
      const { months, days } = getMonthDiff(startDate, endDate);

      if (months > 1 || (months === 1 && days > 1)) {
        var mDate = new Date(startDate);
        mDate.setMonth(mDate.getMonth() + 1);
        console.log(dates[0]);
        console.log(dayjs(mDate));
        setSelectedDateRange([dates[0], dayjs(mDate)]);

        return;
      }
    }

    setSelectedDateRange(dates);
  };

  function handleCalendarChange(dates, dateStrings) {
    if (
      dates !== null &&
      Array.isArray(dates) &&
      dates.length > 0 &&
      dates[0] !== null
    ) {
      const startDateString = dayjs(dates[0]).format('YYYY-MM-DD');
      const startDate = new Date(startDateString);
      var endDate = new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      if (endDate < new Date()) {
        setMaxDate(endDate);
      } else {
        setMaxDate(new Date());
      }
    }
  }

  const refreshFilter = () => {
    setSelectedDateRange([
      dayjs(new Date()).subtract(1, 'month'),
      dayjs(new Date()),
    ]);
    setMaxDate(new Date());
    setAllowSubmit(!allowSubmit);
  };

  return (
    <>
      <Box width={250}>
        <RangePicker
          disabledDate={disabledDate}
          format={'DD/MM/YYYY'}
          locale={locale}
          value={selectedDateRange}
          onChange={handleDateRangeChange}
          onCalendarChange={handleCalendarChange}
          on
        />
      </Box>
      <IconButton aria-label="refresh" size="small" onClick={refreshFilter}>
        <RefreshIcon fontSize="small" />
      </IconButton>
      <Box>
        <Button
          size="small"
          variant="contained"
          color="primary"
          style={{ textTransform: 'inherit' }}
          disabled={!selectedDateRange}
          onClick={() => setAllowSubmit(!allowSubmit)}
        >
          Áp dụng
        </Button>
      </Box>
    </>
  );
};

export default RangePickerCustom;
