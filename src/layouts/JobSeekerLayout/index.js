import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Outlet } from 'react-router-dom';

import { Box, Container } from '@mui/material';

import Header from '../components/commons/Header';
import TabBar from '../components/jobSeekers/TabBar';
import Footer from '../components/commons/Footer';

const JobSeekerLayout = () => {
  const theme = useTheme();

  return (
    <Box>
      <Header />
      <Box
        sx={{
          backgroundColor: theme.palette.mode === 'light' ? 'white' : '#121212',
        }}
      >
        <Container maxWidth="xl">
          <TabBar />
        </Container>
      </Box>
      <Container
        maxWidth="xl"
        sx={{
          my: {
            xs: 1.5,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 4,
          },
          paddingLeft: { xs: 1, sm: 4, md: 6, lg: 8, xl: 8 },
          paddingRight: { xs: 1, sm: 4, md: 6, lg: 8, xl: 8 },
        }}
      >
        <Outlet />
      </Container>
      <Box
        sx={{
          mt: {
            xs: 0,
            sm: 2,
            md: 6,
            lg: 8,
            xl: 10,
          },
          px: {
            xs: 1,
            sm: 5,
            md: 8,
            lg: 10,
            xl: 14,
          },
          py: {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 5,
            xl: 5,
          },
          color: 'white',
          bgcolor: '#441da0',
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
};

export default JobSeekerLayout;
