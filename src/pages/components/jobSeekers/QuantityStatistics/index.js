import React from 'react';
import { Box, Grid } from '@mui/material';

import NumberCard from '../../../../components/NumberCard';

const QuantityStatistics = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
          <NumberCard
            color="#f44336"
            backgroundColor="rgba(244, 67, 54, 0.1)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
          <NumberCard
            color="#29b6f6"
            backgroundColor="rgba(41, 182, 246, 0.1)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
          <NumberCard
            color="#FCA34D"
            backgroundColor="rgba(252, 163, 77, 0.1)"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={3} xl={3}>
          <NumberCard
            color="#66BB6A"
            backgroundColor="rgba(102, 187, 106, 0.1)"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuantityStatistics;
