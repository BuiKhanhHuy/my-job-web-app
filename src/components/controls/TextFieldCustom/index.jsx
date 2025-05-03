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
import { InputAdornment, TextField, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const TextFieldCustom = ({
  name,
  control,
  title = null,
  showRequired = false,
  placeholder = '',
  helperText = '',
  disabled = false,
  icon = null,
  type = 'text',
}) => {
  // Format display number with comma
  const formatDisplay = (value) => {
    if (type !== 'number' || !value) return value;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              id={field.name}
              placeholder={placeholder}
              defaultValue=""
              value={formatDisplay(field.value)}
              onChange={(e) => {
                const value = e.target.value.replace(/,/g, '');
                if (type === 'number' && !/^\d*$/.test(value)) return;
                field.onChange(value);
              }}
              onBlur={field.onBlur}
              error={fieldState.invalid}
              disabled={disabled}
              helperText={!fieldState.invalid ? helperText : ''}
              InputProps={{
                inputProps: {
                  inputMode: type === 'number' ? 'numeric' : 'text',
                },
                startAdornment: icon && (
                  <InputAdornment position="start">{icon}</InputAdornment>
                ),
              }}
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

export default TextFieldCustom;
