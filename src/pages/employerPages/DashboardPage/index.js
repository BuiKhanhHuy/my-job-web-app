import React from 'react';
import { Grid } from '@mui/material';

import QuantityStatistics from '../../components/jobSeekers/QuantityStatistics';

const DashboardPage = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {/* Start: Quantity statistics */}
        <QuantityStatistics />
        {/* End: Quantity statistics */}
      </Grid>
      <Grid item xs={6}>
        {/* Start: Quantity statistics */}
        <QuantityStatistics />
        {/* End: Quantity statistics */}
      </Grid>
      <Grid item xs={6}>
        {/* Start: Quantity statistics */}
        <QuantityStatistics />
        {/* End: Quantity statistics */}
      </Grid>
    </Grid>
  );
};

export default DashboardPage;
