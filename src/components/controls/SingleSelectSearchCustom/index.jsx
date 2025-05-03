/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SingleSelectSearchCustom = ({
  placeholder = '',
  name,
  control,
  options = [],
}) => {
  const theme = useTheme();

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
          onChange={(e, value) => field.onChange(value?.id || '')}
          renderInput={(params) => (
            <TextField
              {...params}
              size="small"
              placeholder={placeholder}
              sx={{ backgroundColor: theme.palette.mode === 'light' ? 'white' : '#121212', borderRadius: 1 }}
            />
          )}
        />
      )}
    />
  );
};

export default SingleSelectSearchCustom;
