import React from 'react';
import { Controller } from 'react-hook-form';
import { Autocomplete, IconButton, TextField, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import { Clear } from '@mui/icons-material';

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
              onChange={(e, value) => field.onChange(value?.id || "" )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder={placeholder}
                />
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
