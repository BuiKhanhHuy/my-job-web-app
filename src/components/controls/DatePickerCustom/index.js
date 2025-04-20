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

import dayjs from 'dayjs';
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
                maxDate={maxDate}
                minDate={minDate}
                format="DD-MM-YYYY"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    height: '1.4375em',
                    py: 2.5,
                  },
                  width: '100%',
                }}
                value={field.value !== undefined ? dayjs(field.value) : ''}
                onChange={(value) =>
                  field.onChange(dayjs(value).format('YYYY-MM-DD'))
                }
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
