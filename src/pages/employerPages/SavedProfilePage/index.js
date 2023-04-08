import React from 'react';
import { Box, Card, Divider, Typography } from '@mui/material';
import SavedResumeCard from '../../components/employers/SavedResumeCard';

const SavedProfilePage = () => {
  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="h5">Hồ sơ đã lưu</Typography>

      <Divider sx={{ mt: 2, mb: 3 }} />
      <Box>
        {/* Start: Saved Resume Card */}
        <SavedResumeCard />
        {/* End: Saved Resume Card */}
      </Box>
    </Card>
  );
};

export default SavedProfilePage;
