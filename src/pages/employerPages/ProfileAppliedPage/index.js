import React from 'react';
import { Card } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import AppliedResumeCard from '../../components/employers/AppliedResumeCard';

const ProfileAppliedPage = () => {
  TabTitle("Quản lý hồ sơ đã ứng tuyển")

  return (
    <Card sx={{ p: 3 }}>
      {/* Start: Applied Resume Card */}
      <AppliedResumeCard title="Hồ sơ đã ứng tuyển"/>
      {/* End: Applied Resume Card */}
    </Card>
  );
};

export default ProfileAppliedPage;
