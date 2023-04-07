import React from 'react';

import {
  Box,
  Card,
  Divider,
  Grid,
  Stack,
  Typography,
  Button,
} from '@mui/material';

import BoxProfile from '../../components/jobSeekers/BoxProfile';
import ProfileUpload from '../../components/jobSeekers/ProfileUpload';
import CompanyViewedCard from '../../components/jobSeekers/CompanyViewedCard';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid xs={12} sm={12} md={12} lg={9} xl={9} item>
          <Stack spacing={2}>
            <Card sx={{ p: 3 }}>
              {/* Start: Box profile */}
              <BoxProfile title="MyJob Profile" />
              {/* End: Box profile  */}
            </Card>
            <Card sx={{ p: 3 }}>
              {/* Start: Profile upload */}
              <ProfileUpload title="Hồ sơ trực tuyến" />
              {/* End: Profile upload */}
            </Card>
          </Stack>
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={3} xl={3} item>
          <Stack spacing={2}>
            <Card sx={{ p: 2 }}>
              <Stack>
                <Box>
                  <Typography variant="h6">Ai đã xem hồ sơ của bạn</Typography>
                </Box>
                <Divider sx={{ mt: 2, mb: 3 }} />
                <Box>
                  {/* Start: CompanyViewedCard */}
                  <CompanyViewedCard />
                  {/* End: CompanyViewedCard */}
                </Box>
                <Stack direction="row" justifyContent="center">
                  <Button
                    sx={{ textTransform: 'inherit' }}
                    variant="text"
                    color="primary"
                    component={Link}
                    to="/ung-vien/cong-ty-cua-toi"
                  >
                    Xem chi tiết
                  </Button>
                </Stack>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
