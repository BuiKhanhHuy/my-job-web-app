import React from 'react';
import { Controller } from 'react-hook-form';
import {
  Stack,
  Alert,
  Box,
  Button,
  Typography,
} from '@mui/material';
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
        <Typography variant="subtitle2" gutterBottom>
          {title} {showRequired && <span style={{ color: 'red' }}>*</span>}
        </Typography>
      )}
      <Stack spacing={1} direction="column">
        {selectedFile && (
          <Alert icon={<FilePresentIcon fontSize="inherit" />} severity="info">
            {selectedFile?.name}
          </Alert>
        )}
        <Box>
          <Button
            variant="contained"
            color="info"
            startIcon={<FileUploadIcon />}
            sx={{ textTransform: 'inherit' }}
            component="label"
            onClick={handleInputClick}
          >
            Tải file
          </Button>
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

export default FileUploadCustom;
