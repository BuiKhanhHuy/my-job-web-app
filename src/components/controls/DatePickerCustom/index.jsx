/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from '../../../configs/moment-config';
import { Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const DatePickerCustom = ({
  name,
  control,
  title = null,
  showRequired = false,
  minDate = null,
  maxDate = null,
}) => {
  const parseDate = (date) => {
    if (!date) return null;
    try {
      const parsedDate = dayjs(date);
      return parsedDate.isValid() ? parsedDate : null;
    } catch {
      return null;
    }
  };

  return (
    <div>
      {title && (
        <Typography variant="subtitle2" gutterBottom>
          {title} {showRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <div>
              <DatePicker
                maxDate={parseDate(maxDate)}
                minDate={parseDate(minDate)}
                format="DD-MM-YYYY"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '1.4375em',
                    py: 2.5,
                  },
                  width: '100%',
                }}
                value={parseDate(field.value)}
                onChange={(newValue) => {
                  const date = parseDate(newValue);
                  const localDate = date ? dayjs.tz(date, 'Asia/Ho_Chi_Minh').startOf('day') : null;
                  field.onChange(localDate ? localDate.format('YYYY-MM-DD') : null);
                }}
                slotProps={{
                  textField: {
                    error: fieldState.invalid,
                    helperText: fieldState.error?.message,
                  },
                }}
                timezone="Asia/Ho_Chi_Minh"
                referenceDate={dayjs().tz('Asia/Ho_Chi_Minh')}
              />
            </div>

            {fieldState.invalid && (
              <span
                style={{
                  color: 'red',
                  fontSize: 13,
                  marginTop: 1,
                  marginLeft: 1,
                }}
              >
                <FontAwesomeIcon icon={faCircleExclamation} />{' '}
                {fieldState.error?.message}
              </span>
            )}
          </>
        )}
      />
    </div>
  );
};

export default DatePickerCustom;
