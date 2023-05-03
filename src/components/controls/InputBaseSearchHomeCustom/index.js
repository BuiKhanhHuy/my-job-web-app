import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import { Controller } from 'react-hook-form';

const InputBaseSearchHomeCustom = ({
  name,
  control,
  onHandleSubmit = null,
  placeholder,
  showSubmitButton = false,
}) => {
  const theme = useTheme();

  return (
    <Paper
      component="form"
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
          />
        )}
      />
      {showSubmitButton && (
        <Button variant="contained" color="primary" onClick={onHandleSubmit}>
          Tìm kiếm
        </Button>
      )}
    </Paper>
  );
};

export default InputBaseSearchHomeCustom;
