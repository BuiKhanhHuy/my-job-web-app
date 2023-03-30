import React from 'react';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SingleSelectSearchCustom = ({
  placeholder = '',
  name,
  control,
  options = [],
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          fullWidth
          id={field.name}
          options={options}
          autoHighlight={false}
          getOptionLabel={(option) => option.name}
          value={options.find((o) => o.id === field.value) || null}
          onChange={(e, value) => field.onChange(value.id)}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder={placeholder}
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
          )}
        />
      )}
    />
  );
};

export default SingleSelectSearchCustom;
