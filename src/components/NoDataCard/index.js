import React from 'react';
import { Stack, Typography } from '@mui/material';

import EmptyDataSvg from '../../assets/images/svg-images/empty-data.svg';

const NoDataCard = ({ title = 'Không có dữ liệu' }) => {
  return (
    <Stack justifyContent="center" alignItems="center" spacing={3}>
      <img src={EmptyDataSvg} alt="mySvgImage" style={{ width: '30vh' }} />
      <Typography variant="body1" sx={{ color: '#9e9e9e' }}>
        {title}
      </Typography>
    </Stack>
  );
};

export default NoDataCard;
