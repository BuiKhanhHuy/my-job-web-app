import React from 'react';
import { Box, Card } from '@mui/material';

import ProfileDetailCard from '../../components/employers/ProfileDetailCard';

const ProfileDetailPage = () => {
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
