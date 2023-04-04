import * as React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import Header from '../components/commons/Header';
import Footer from '../components/commons/Footer';

const DefaultLayout = () => {
  return (
    <Box>
      <Header />
      <Container maxWidth="lg" >
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

export default DefaultLayout;
