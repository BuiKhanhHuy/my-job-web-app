import React from 'react';  
import { Box, Card, Divider, Typography } from '@mui/material';

const ProfileAppliedPage = () => {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5">Hồ sơ ứng tuyển</Typography>

      <Divider sx={{ mt: 2, mb: 3 }} />
      <Box>
        {/* Start: Profile card */}
        {/* <ProfileCard /> */}
        {/* End: Profile card */}
      </Box>
    </Card>
  );
};

export default ProfileAppliedPage;
