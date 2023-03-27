import * as React from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Card, Grid, Stack, Tab, Typography } from '@mui/material';

const MyCompanyPage = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container spacing={2}>
      <Grid xs={12} sm={12} md={7} lg={8} xl={8} item>
        <Stack spacing={2}>
          <Card sx={{ p: 2  }}>
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
                      label="Nhà tuyển dụng xem hồ sơ"
                      sx={{ textTransform: 'capitalize' }}
                      value="1"
                    />
                    <Tab
                      label="Theo dõi công ty"
                      sx={{ textTransform: 'capitalize' }}
                      value="2"
                    />
                  </TabList>
                </Box>
                <TabPanel value="1">Nhà tuyển dụng xem hồ sơ</TabPanel>
                <TabPanel value="2">Theo dõi công ty</TabPanel>
              </TabContext>
            </Box>
          </Card>
        </Stack>
      </Grid>
      <Grid xs={12} sm={12} md={5} lg={4} xl={4} item>
        <Stack spacing={2}>
          <Card sx={{ p: 2  }}>
            <Stack>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h6">Việc làm bạn sẽ thích</Typography>
              </Box>
              <Box>
                <div>HERE</div>
              </Box>
            </Stack>
          </Card>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default MyCompanyPage;
