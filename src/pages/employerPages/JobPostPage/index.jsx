/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Card } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import JobPostCard from '../../components/employers/JobPostCard';

const JobPostPage = () => {
  TabTitle("Quản lý tin tuyển dụng")

  return (
    <Card sx={{ p: 3 }}>
      <JobPostCard />
    </Card>
  );
};

export default JobPostPage;
