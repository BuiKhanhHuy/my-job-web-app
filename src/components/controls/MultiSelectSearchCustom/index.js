import * as React from 'react';
import { Controller } from 'react-hook-form';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultiSelectSearchCustom = ({ name, control, placeholder = '', options=[] }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          multiple
          limitTags={1}
          id={name}
          options={options}
          disableCloseOnSelect
          onChange={(e, value) =>
            field.onChange(value.map((value) => value?.id
            ))
          }
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
            <li {...props}>
              <Checkbox
                icon={icon}
                checkedIcon={checkedIcon}
                style={{ marginRight: 8 }}
                checked={selected}
              />
              {option.name}
            </li>
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder={placeholder}
              size="small"
              sx={{ backgroundColor: 'white', borderRadius: 1 }}
            />
          )}
        />
      )}
    />
  );
};
export default MultiSelectSearchCustom;
