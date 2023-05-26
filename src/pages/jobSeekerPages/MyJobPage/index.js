import * as React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Grid, Stack, Tab, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import SavedJobCard from '../../components/jobSeekers/SavedJobCard';
import AppliedJobCard from '../../components/jobSeekers/AppliedJobCard';
import SuggestedJobPostCard from '../../components/defaults/SuggestedJobPostCard';
import JobPostNotificationCard from '../../components/jobSeekers/JobPostNotificationCard';
import { useSearchParams } from 'react-router-dom';

const MyJobPage = () => {
  TabTitle("Trang quản trị Việc làm của tôi")

  const [searchParams] = useSearchParams();
  const [value, setValue] = React.useState(searchParams.get("tab") || "1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={12} md={7} lg={8} xl={8} item>
        <Stack spacing={2}>
          <Card sx={{ p: 1 }}>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList
                    onChange={handleChange}
                    aria-label="my job"
                    variant="scrollable"
                    allowScrollButtonsMobile
                  >
                    <Tab
                      label="Việc làm đã lưu"
                      sx={{ textTransform: 'capitalize' }}
                      value="1"
                    />
                    <Tab
                      label="Việc làm đã ứng tuyển"
                      sx={{ textTransform: 'capitalize' }}
                      value="2"
                    />
                    <Tab
                      label="Thông báo việc làm"
                      sx={{ textTransform: 'capitalize' }}
                      value="3"
                    />
                  </TabList>
                </Box>
                <TabPanel
                  value="1"
                  sx={{ px: { xs: 0, sm: 1, md: 2, lg: 2, xl: 2 } }}
                >
                  {/* Start: SavedJobCard */}
                  <SavedJobCard />
                  {/* End: SavedJobCard */}
                  <Box mt={1}>
                    <Typography color="gray" variant="caption">
                      Lưu ý: Bạn không xem được việc làm đã hết thời hạn đăng
                      tuyển hoặc tạm ngưng nhận hồ sơ.
                    </Typography>
                  </Box>
                </TabPanel>
                <TabPanel
                  value="2"
                  sx={{ px: { xs: 0, sm: 1, md: 2, lg: 2, xl: 2 } }}
                >
                  {/* Start: AppliedJobCard */}
                  <AppliedJobCard />
                  {/* End: AppliedJobCard */}
                </TabPanel>
                <TabPanel
                  value="3"
                  sx={{ px: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 } }}
                >
                  {/* Start: JobPostNotificationCard */}
                  <JobPostNotificationCard />
                  {/* End: JobPostNotificationCard */}
                </TabPanel>
              </TabContext>
            </Box>
          </Card>
        </Stack>
      </Grid>
      <Grid xs={12} sm={12} md={5} lg={4} xl={4} item>
        <Stack spacing={2}>
          <Card sx={{ p: { xs: 1, sm: 1, md: 2, lg: 2, xl: 2 } }}>
            <Stack>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Việc làm phù hợp</Typography>
              </Box>
              <Box>
                {/* Start: SuggestedJobPostCard */}
                <SuggestedJobPostCard fullWidth={true} />
                {/* End: SuggestedJobPostCardf */}
              </Box>
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MyJobPage;
