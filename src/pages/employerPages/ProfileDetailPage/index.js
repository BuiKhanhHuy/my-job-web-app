/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Box, Card } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import ProfileDetailCard from '../../components/employers/ProfileDetailCard';

const ProfileDetailPage = () => {
  TabTitle("Chi tiết hồ sơ ứng viên")

  return (
    <Card sx={{ p: 3 }}>
      <Box>
        {/* Start: ProfileDetailCard */}
        <ProfileDetailCard />
        {/* End: ProfileDetailCard */}
      </Box>
    </Card>
  );
};

export default ProfileDetailPage;
