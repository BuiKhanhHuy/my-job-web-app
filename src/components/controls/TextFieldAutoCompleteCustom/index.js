import React from 'react';
import { Controller } from 'react-hook-form';
import { Autocomplete, TextField, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';

const TextFieldAutoCompleteCustom = ({
  name,
  control,
  title = null,
  showRequired=false,
  placeholder = '',
  disabled = false,
  options,
  loading,
  handleSelect,
}) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div>
      {title && (
        <Typography variant="subtitle2" gutterBottom>
          {title} {showRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Controller
        control={control}
        name={name}
        defaultValue=""
        render={({ field, fieldState }) => (
          <>
            <Autocomplete
              freeSolo
              id={field.name}
              disabled={disabled}
              open={open}
              onOpen={() => {
                setOpen(true);
              }}
              onClose={() => {
                setOpen(false);
              }}
              getOptionLabel={(option) =>
                option?.description || field.value || ''
              }
              options={options}
              loading={loading}
              onChange={handleSelect}
              inputValue={field.value}
              onInputChange={(e, newValue) => field.onChange(newValue || '')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="small"
                  placeholder={placeholder}
                  InputProps={{
                    ...params.InputProps,
                  }}
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

export default TextFieldAutoCompleteCustom;
