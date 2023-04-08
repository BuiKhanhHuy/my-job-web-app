import React from 'react';
import { Card } from '@mui/material';
import SavedResumeCard from '../../components/employers/SavedResumeCard';

const SavedProfilePage = () => {
  return (
    <Card sx={{ p: 3 }}>
      {/* Start: Saved Resume Card */}
      <SavedResumeCard title="Hồ sơ đã lưu"/>
      {/* End: Saved Resume Card */}
    </Card>
  );
};

export default SavedProfilePage;
