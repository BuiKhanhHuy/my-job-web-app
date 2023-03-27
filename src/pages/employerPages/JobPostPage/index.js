import React from 'react';
import { Card } from '@mui/material';

import JobPostCard from '../../components/employers/JobPostCard';

const JobPostPage = () => {
  return (
    <Card sx={{ boxShadow: 0, p: 3 }}>
      <JobPostCard />
    </Card>
  );
};

export default JobPostPage;
