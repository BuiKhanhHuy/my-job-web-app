import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';

import JobPosts from '../../../../components/JobPosts';

const SavedJobCard = ({ title }) => {
  return (
    <Box>
      <Stack>
        <Box>
          <Typography variant="h6">{title}</Typography>
        </Box>
        <Divider sx={{ mt: 2, mb: 3 }} />
        <Box sx={{ px: 1 }}>
            <JobPosts />
        </Box>
      </Stack>
    </Box>
  );
};

export default SavedJobCard;
