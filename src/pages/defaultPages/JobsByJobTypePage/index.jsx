/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Divider, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CategoryCard from '../../components/defaults/CategoryCard';

const JobsByJobTypePage = () => {
  TabTitle("Việc làm theo hình thức làm việc")
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4">Việc làm theo Hình thức là việc</Typography>
      <Divider sx={{ mt: 1, mb: 4 }} />
      <CategoryCard
        options={allConfig?.jobTypeOptions || []}
        type={'JOB_TYPE'}
      />
    </Container>
  );
};

export default JobsByJobTypePage;
