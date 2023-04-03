import React from 'react';
import { Card, Divider, Typography } from '@mui/material';
import SavedResumeCard from '../../components/employers/SavedResumeCard';

const SavedProfilePage = () => {
  return (
    <Card sx={{ p: 3, boxShadow: 0 }}>
      <Typography variant="h5">Hồ sơ đã lưu</Typography>

      <Divider sx={{ mt: 2, mb: 3 }} />
      {/* Start: SavedResume card */}
      <SavedResumeCard />
      {/* End: SavedResume card */}
    </Card>
  );
};

export default SavedProfilePage;
