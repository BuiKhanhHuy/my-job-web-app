import React from 'react';
import { Card } from '@mui/material';

import NotificationCard from '../../components/defaults/NotificationCard';

const NotificationPage = () => {
  return (
    <Card sx={{ p: { xs: 2, sm: 2, md: 2, lg: 3, xl: 3 } }}>
      {/* Start: NotificationCard */}
      <NotificationCard title="MyJob thông báo" />
      {/* End: NotificationCard  */}
    </Card>
  );
};

export default NotificationPage;
