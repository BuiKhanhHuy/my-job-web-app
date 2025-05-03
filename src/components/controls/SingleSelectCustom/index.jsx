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
import { Autocomplete, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const SingleSelectCustom = ({
  name,
  control,
  options = [],
  title = null,
  showRequired = false,
  placeholder = '',
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
            <Autocomplete
              fullWidth
              id={field.name}
              clearOnBlur
              options={options}
              autoHighlight={false}
              getOptionLabel={(option) => option.name}
              value={options.find((o) => o.id === field.value) || null}
              onChange={(e, value) => field.onChange(value?.id || null)}
              renderInput={(params) => (
                <TextField  error={fieldState.invalid} {...params} size="small" placeholder={placeholder} />
              )}
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

export default SingleSelectCustom;
