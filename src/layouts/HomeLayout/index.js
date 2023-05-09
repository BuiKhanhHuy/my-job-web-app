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
      <Container
        maxWidth="xl"
        sx={{
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <section>
          <TopSlide />
        </section>
      </Container>

      <Container
        maxWidth="xl"
        sx={{
          paddingLeft: { xs: 1, sm: 4, md: 6, lg: 8, xl: 8 },
          paddingRight: { xs: 1, sm: 4, md: 6, lg: 8, xl: 8 },
        }}
      >
        <section>
          <Outlet />
        </section>
      </Container>
      <Box
        sx={{
          mt: 10,
          px: {
            xs: 1,
            sm: 5,
            md: 8,
            lg: 10,
            xl: 14
          },
          py: {
            xs: 2,
            sm: 2,
            md: 2,
            lg: 5,
            xl: 5
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

export default HomeLayout;
