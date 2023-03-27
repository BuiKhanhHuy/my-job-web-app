import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Divider, Typography } from '@mui/material';
import CategoryCard from '../../components/defaults/CategoryCard';

const JobsByCareerPage = () => {
  console.log('rednder')
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4">Việc làm theo Ngành nghề</Typography>
      <Divider sx={{ mt: 1, mb: 4 }} />
      <CategoryCard options={allConfig?.careerOptions || []} />
    </Container>
  );
};

export default JobsByCareerPage;
