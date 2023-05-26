import React from 'react';
import { Box, Card, Divider, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import ProfileCard from '../../components/employers/ProfileCard';

const ProfilePage = () => {
  TabTitle("Tìm kiếm ứng viên")

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5">Tìm kiếm ứng viên</Typography>

      <Divider sx={{ mt: 2, mb: 3 }} />
      <Box>
        {/* Start: Profile card */}
        <ProfileCard />
        {/* End: Profile card */}
      </Box>
    </Card>
  );
};

export default ProfilePage;
