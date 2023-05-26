import React from 'react';
import { Card } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import SavedResumeCard from '../../components/employers/SavedResumeCard';

const SavedProfilePage = () => {
  TabTitle("Quản lý hồ sơ đã lưu")

  return (
    <Card sx={{ p: 3 }}>
      {/* Start: Saved Resume Card */}
      <SavedResumeCard title="Hồ sơ đã lưu"/>
      {/* End: Saved Resume Card */}
    </Card>
  );
};

export default SavedProfilePage;
