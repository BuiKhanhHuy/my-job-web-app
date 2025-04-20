/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Box } from '@mui/system';

import AddIcon from '@mui/icons-material/Add';
import { Button, Typography } from '@mui/material';

const EmptyCard = ({ content, labelButton="Thêm mới", onClick }) => {
  return (
    <Box
      sx={{
        p: 2,
        border: 1,
        borderStyle: 'dashed',
        borderColor: 'grey.500',
      }}
    >
      <Typography variant="body1" sx={{ mb: 1 }}>
        {content}
      </Typography>
      <Button variant="contained" startIcon={<AddIcon />} onClick={onClick}>
        {labelButton}
      </Button>
    </Box>
  );
};

export default EmptyCard;
