import React from 'react';
import { Card, Grid } from '@mui/material';

import ProfileCard from '../../components/employers/ProfileCard';

const ProfilePage = () => {
  return (
    <Card sx={{ p: 3, boxShadow: 0 }}>
      {/* Start: Profile card */}
      <ProfileCard />
      {/* End: Profile card */}
    </Card>
  );
};

export default ProfilePage;
