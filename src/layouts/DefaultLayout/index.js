import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';

const DefaultLayout = () => {
  return (
    <Box>
      <Header />
      <Container
        maxWidth="lg"
        sx={{
          paddingLeft: { xs: 1, sm: 4, md: 6, lg: 8, xl: 0 },
          paddingRight: { xs: 1, sm: 4, md: 6, lg: 8, xl: 0 },
        }}
      >
        <section>
          <Outlet />
        </section>
      </Container>
      <Box
        sx={{
          mt: {
            xs: 2,
            sm: 10,
            md: 10,
            lg: 10,
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

export default DefaultLayout;
