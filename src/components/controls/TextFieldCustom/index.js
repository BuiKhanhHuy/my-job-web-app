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
  // const formatSalary = (value) => {
  //   return Number(value).toLocaleString();
  // };

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
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              error={fieldState.invalid}
              disabled={disabled}
              helperText={!fieldState.invalid ? helperText : ''}
              InputProps={{
                inputProps: {
                  // min: 0,  
                  type: type,
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
