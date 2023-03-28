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
        sx={{ backgroundColor: '#441da0' }}
      />
      <CardContent>
        <Box sx={{ p: 2 }}>
          <JobPosts />
        </Box>
      </CardContent>
    </Card>
  );
};

export default SuggestedJobPostCard;
