import React from 'react';
import { Stack, Typography } from '@mui/material';

import { IMAGE_SVG } from '../../configs/constants';

const NoDataCard = ({ title = 'Không có dữ liệu', img=IMAGE_SVG.img1 }) => {
  return (
    <Stack justifyContent="center" alignItems="center" spacing={3} sx={{py: 4}}>
      <img src={img} alt="mySvgImage" style={{ width: '30vh' }} />
      <Typography variant="body1" sx={{ color: '#9e9e9e' }}>
        {title}
      </Typography>
    </Stack>
  );
};

export default NoDataCard;
