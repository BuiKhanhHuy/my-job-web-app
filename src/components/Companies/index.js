import React from 'react';

import { Grid } from '@mui/material';

import Company from '../Company';

const Companies = () => {
  return (
    <Grid container spacing={2}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9 ].map((value) => (
        <Grid item xs={12} sm={12} md={6} lg={4} xl={4}>
          <Company />
        </Grid>
      ))}
    </Grid>
  );
};

export default Companies;
