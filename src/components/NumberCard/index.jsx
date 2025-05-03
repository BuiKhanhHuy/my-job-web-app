/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Box, Card, Typography } from '@mui/material';

const NumberCard = ({ color, backgroundColor }) => {
  return (
    <Card
      sx={{ p: 1.5, borderColor: color, backgroundColor: backgroundColor }}
      variant="outlined"
    >
      <Box sx={{ p: 1 }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: color }}>
          2
        </Typography>
      </Box>
      <Box>
        <Typography variant="button">Nhà tuyển dụng xem hồ sơ</Typography>
      </Box>
    </Card>
  );
};

export default NumberCard;
