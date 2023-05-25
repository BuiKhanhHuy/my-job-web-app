import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ImageSvg1 } from '../../configs/constants';

const NoDataCard = ({
  children,
  title = 'Không có dữ liệu',
  imgComponentSgv = <ImageSvg1 />,
  childrend,
}) => {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      spacing={3}
      sx={{ py: 4 }}
    >
      <div>{imgComponentSgv}</div>
      <Typography
        variant="caption"
        sx={{ color: '#9e9e9e', textAlign: 'center' }}
      >
        {title}
      </Typography>
      <Box>{children}</Box>
    </Stack>
  );
};

export default NoDataCard;
