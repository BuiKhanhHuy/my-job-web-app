/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Controller } from 'react-hook-form';
import { Stack, Box, Typography, Button } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowUpFromBracket,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons';


const FileDropzone = ({ accept, onDrop, values }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept,
    onDrop,
  });

  return (
    <Box
      sx={{
        borderStyle: 'dashed',
        borderWidth: 2,
        borderColor: (theme) => theme.palette.grey[300],
        borderRadius: 3,
        backgroundColor: (theme) => theme.palette.grey[50],
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer',
        py: 6,
        '&:hover': {
          borderColor: (theme) => theme.palette.primary.main,
          backgroundColor: (theme) => theme.palette.primary.background,
        },
      }}
      {...getRootProps({ className: 'dropzone' })}
    >
      <input {...getInputProps()} />
      <Stack
        direction="column"
        alignItems="center"
        spacing={2}
      >
        {!values ? (
          <>
            <Box
              sx={{
                backgroundColor: (theme) => theme.palette.primary.background,
                borderRadius: '50%',
                width: 60,
                height: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: (theme) => theme.palette.primary.main,
              }}
            >
              <FontAwesomeIcon icon={faArrowUpFromBracket} fontSize={24} />
            </Box>
            <Typography 
              variant="h6" 
              sx={{ 
                color: (theme) => theme.palette.grey[800],
                fontWeight: 600 
              }}
            >
              Kéo hồ sơ của bạn vào đây
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Hoặc bạn có thể
            </Typography>
            <Button
              variant="contained"
              size="medium"
              color="primary"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
                boxShadow: (theme) => theme.customShadows.small,
                '&:hover': {
                  boxShadow: (theme) => theme.customShadows.medium,
                }
              }}
            >
              Chọn hồ sơ từ máy bạn
            </Button>
            <Typography 
              variant="caption" 
              sx={{ 
                color: (theme) => theme.palette.grey[500],
                mt: 1 
              }}
            >
              Hỗ trợ định dạng .pdf
            </Typography>
          </>
        ) : (
          <>
            <Typography 
              variant="body1" 
              sx={{ 
                color: (theme) => theme.palette.grey[800],
                fontWeight: 500 
              }}
            >
              {values.length >= 0 && values[0].name}
            </Typography>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              sx={{
                px: 3,
                borderRadius: 2,
              }}
            >
              Đổi tập tin
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
};

const BasicDropzone = ({ control, name, title = '', showRequired = false }) => {
  return (
    <div>
      {title && (
        <Typography 
          variant="subtitle2" 
          gutterBottom
          sx={{
            fontWeight: 600,
            color: (theme) => theme.palette.grey[800],
            mb: 1
          }}
        >
          {title} {showRequired && <span style={{ color: (theme) => theme.palette.error.main }}>*</span>}
        </Typography>
      )}
      <Stack spacing={1} direction="column">
        <Controller
          name={name}
          control={control}
          render={({ field, fieldState }) => (
            <>
              <FileDropzone
                name="file"
                accept="image/*"
                onDrop={field.onChange}
                values={field.value}
              />
              {fieldState.invalid && (
                <Typography
                  variant="caption"
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: (theme) => theme.palette.error.main,
                    mt: 1
                  }}
                >
                  <FontAwesomeIcon icon={faCircleExclamation} />
                  {fieldState.error?.message}
                </Typography>
              )}
            </>
          )}
        />
      </Stack>
    </div>
  );
};

export default BasicDropzone;
