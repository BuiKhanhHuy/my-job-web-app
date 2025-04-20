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
import { Stack, Alert, Box, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FilePresentIcon from '@mui/icons-material/FilePresent';

const FileUploadCustom = ({
  control,
  name,
  title = '',
  showRequired = false,
}) => {
  const [selectedFile, setSelectedFile] = React.useState(null);
  const inputRef = React.useRef(null);

  const handleInputClick = (e) => {
    e.preventDefault();
    inputRef.current.click();
  };

  const handleFileChange = (event, onChange) => {
    const file = event.target.files[0];
    setSelectedFile(file || null);

    onChange(file);
  };

  return (
    <div>
      {title && (
        <Typography 
          variant="subtitle2" 
          gutterBottom 
          sx={{
            fontWeight: 500,
            color: 'text.primary',
            mb: 1
          }}
        >
          {title} {showRequired && <span style={{ color: 'error.main' }}>*</span>}
        </Typography>
      )}
      <Stack spacing={2} direction="column">
        <Box
          sx={{
            border: '2px dashed',
            borderColor: 'grey.200',
            borderRadius: 2,
            p: 3,
            textAlign: 'center',
            bgcolor: 'grey.50',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'primary.background'
            }
          }}
          onClick={handleInputClick}
        >
          {!selectedFile ? (
            <>
              <FileUploadIcon 
                sx={{ 
                  fontSize: 40, 
                  color: 'primary.main',
                  mb: 1
                }} 
              />
              <Typography variant="subtitle1" sx={{ color: 'text.primary', mb: 0.5 }}>
                Kéo thả file vào đây hoặc
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  textTransform: 'none',
                  boxShadow: 'none'
                }}
              >
                Chọn file
              </Button>
              <Typography variant="caption" sx={{ display: 'block', mt: 1, color: 'text.secondary' }}>
                Chỉ chấp nhận file PDF
              </Typography>
            </>
          ) : (
            <Alert 
              icon={<FilePresentIcon fontSize="inherit" />} 
              severity="success"
              sx={{
                '& .MuiAlert-message': {
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }
              }}
            >
              <Typography variant="body2">
                {selectedFile?.name}
              </Typography>
              <Button
                size="small"
                color="error"
                variant="text"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                }}
                sx={{ ml: 2 }}
              >
                Xóa
              </Button>
            </Alert>
          )}
        </Box>
      </Stack>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <input
              name={name}
              hidden
              accept=".pdf"
              type="file"
              ref={inputRef}
              onChange={(e) => handleFileChange(e, field.onChange)}
            />
            {fieldState.invalid && (
              <Typography
                variant="caption"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                  color: 'error.main',
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
    </div>
  );
};

export default FileUploadCustom;
