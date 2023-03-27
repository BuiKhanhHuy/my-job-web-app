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
