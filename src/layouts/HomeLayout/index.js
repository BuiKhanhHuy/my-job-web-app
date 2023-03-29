import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Header from '../components/commons/Header';
import SubHeader from '../components/commons/SubHeader';
import TopSlide from '../components/commons/TopSlide';
import Footer from '../components/commons/Footer';

const HomeLayout = () => {
  return (
    <Box>
      <Header />
      <SubHeader />
      <Container maxWidth="xl">
        <section>
          <TopSlide />
        </section>
        <section>
          <Outlet />
        </section>
      </Container>
      <Box
        sx={{
          mt: 10,
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

export default HomeLayout;
