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
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { FormLabel, Typography } from '@mui/material';
import FormControl from '@mui/material/FormControl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const RadioCustom = ({
  name,
  control,
  title = '',
  showRequired = false,
  options = [],
}) => {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <FormControl>
              <FormLabel id={name}>
                <Typography variant="subtitle2" gutterBottom color="black">
                  {title}{' '}
                  {showRequired && <span style={{ color: 'red' }}>*</span>}
                </Typography>
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby={name}
                name={name}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              >
                {options.map((value) => (
                  <FormControlLabel
                    key={value.id}
                    value={value.id}
                    control={<Radio />}
                    label={value.name}
                  />
                ))}
              </RadioGroup>
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
            </FormControl>
          </>
        )}
      />
    </div>
  );
};

export default RadioCustom;
