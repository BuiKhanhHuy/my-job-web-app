import React from 'react';
import { Outlet } from 'react-router-dom';

import { Box, Container } from '@mui/material';

import Header from '../components/commons/Header';
import TabBar from '../components/jobSeekers/TabBar';
import Footer from '../components/commons/Footer';

const JobSeekerLayout = () => {
  return (
    <Box>
      <Header />
      <Box sx={{ backgroundColor: 'white' }}>
        <Container maxWidth="xl">
          <TabBar />
        </Container>
      </Box>
      <Container maxWidth="xl" sx={{ my: 4 }}>
        <Outlet />
      </Container>
      <Box
        sx={{
          mt: 8,
          px: 14,
          py: 5,
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
