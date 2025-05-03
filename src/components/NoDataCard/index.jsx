/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { SVG_IMAGES } from '../../configs/constants';
import SvgIcon from '../SvgIcon';

const NoDataCard = ({
  title = 'Không có dữ liệu',
  content,
  buttonText,
  onClick,
  svgKey = 'ImageSvg1',
}) => {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        p: 3,
        minHeight: 200,
      }}
    >
      <Box sx={{ width: { xs: 150, sm: 200 } }}>
        <SvgIcon src={SVG_IMAGES[svgKey]} />
      </Box>
      <Typography variant="h6" align="center">
        {title}
      </Typography>
      {content && (
        <Typography variant="body2" align="center" color="text.secondary">
          {content}
        </Typography>
      )}
      {buttonText && (
        <Button variant="contained" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </Stack>
  );
};

export default NoDataCard;
