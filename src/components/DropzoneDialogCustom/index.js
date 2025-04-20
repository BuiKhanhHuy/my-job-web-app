/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { DropzoneDialog } from 'mui-file-dropzone';
import {
  IconButton,
  Typography,
  Stack,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const DropzoneDialogCustom = (props) => {
  const { open, setOpen, handleUpload, title = 'Tiêu đề' } = props;

  const dialogTitle = (title) => (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{title}</Typography>
        <IconButton color="error" onClick={() => setOpen(false)}>
          <CloseIcon />
        </IconButton>
      </Stack>
    </>
  );

  return (
    <DropzoneDialog
      dialogTitle={dialogTitle(title)}
      acceptedFiles={['image/*']}
      submitButtonText="Tải lên"
      cancelButtonText="Hủy"
      maxFileSize={5000000}
      open={open}
      onClose={() => setOpen(false)}
      onSave={(files) => {
        setOpen(false);

        handleUpload(files);
      }}
      showPreviews={true}
      showFileNamesInPreview={false}
      dropzoneText="Kéo và thả tệp vào đây hoặc nhấp vào"
      previewText="Xem trước"
      getFileLimitExceedMessage={(number) =>
        `Giới hạn tải lên là ${number} tệp.`
      }
      getFileAddedMessage={(fileName) =>
        `Tệp ${fileName} đã được thêm thành công.`
      }
      getFileRemovedMessage={(fileName) => `Tệp ${fileName} đã được hủy`}
      {...props}
    />
  );
};

export default DropzoneDialogCustom;
