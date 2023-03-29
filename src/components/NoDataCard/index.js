import React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';

import { IMAGE_SVG } from '../../configs/constants';

const NoDataCard = ({
  children,
  title = 'Không có dữ liệu',
  img = IMAGE_SVG.img1,
}) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ py: 4 }}
    >
      <img src={img} alt="mySvgImage" style={{ width: '25vh' }} />
      <Typography variant="body1" sx={{ color: '#9e9e9e' }}>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Stack>
  );
};

export default NoDataCard;
