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
import { TextField, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const MultilineTextFieldCustom = ({
  name,
  control,
  title = null,
  showRequired = false,
  placeholder = '',
  disabled = false,
  maxRows = 10,
  minRows = 4
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
            <TextField
              fullWidth
            //   size="small"
              id={field.name}
              placeholder={placeholder}
              defaultValue=""
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.invalid}
              disabled={disabled}
              multiline
              maxRows={maxRows}
              minRows={minRows}
              variant="outlined"
            />
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

export default MultilineTextFieldCustom;
