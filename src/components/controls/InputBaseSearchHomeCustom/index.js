import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { Controller } from 'react-hook-form';
import { IconButton, InputAdornment } from '@mui/material';

const InputBaseSearchHomeCustom = ({
  name,
  control,
  placeholder,
  showSubmitButton = false,
}) => {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        boxShadow: 0,
        p: '3.5px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        backgroundColor: theme.palette.mode === 'light' ? 'white' : '#121212',
      }}
    >
      <SearchIcon color="disabled" />
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <InputBase
            id={field.name}
            sx={{ ml: 1, flex: 1 }}
            placeholder={placeholder}
            inputProps={{ 'aria-label': 'search' }}
            defaultValue=""
            value={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            endAdornment={
              field.value !== '' &&
              field.value !== null && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => field.onChange('')}>
                    <ClearIcon fontSize="inherit" />
                  </IconButton>
                </InputAdornment>
              )
            }
          />
        )}
      />
      {showSubmitButton && (
        <Button variant="contained" type="submit" color="primary">
          Tìm kiếm
        </Button>
      )}
    </Paper>
  );
};

export default InputBaseSearchHomeCustom;
