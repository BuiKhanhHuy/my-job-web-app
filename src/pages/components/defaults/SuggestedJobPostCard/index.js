import React from 'react';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

import JobPosts from '../../../../components/JobPosts';

const SuggestedJobPostCard = ({ title, titleIcon }) => {
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
            {titleIcon}
          </Avatar>
        }
        title={
          <Typography variant="h5" sx={{ color: 'white' }}>
            {title}
          </Typography>
        }
        sx={{ backgroundColor: '#441da0', p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 }  }}
      />
      <CardContent>
        <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
          <JobPosts />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SuggestedJobPostCard;
