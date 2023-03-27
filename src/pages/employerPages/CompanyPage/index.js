import React from 'react';
import { Box, Card, Tab } from '@mui/material';

import CompanyCard from '../../components/employers/CompanyCard';
import CompanyImageCard from '../../components/employers/CompanyImageCard';
import { TabContext, TabList, TabPanel } from '@mui/lab';

const CompanyPage = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Card sx={{ p: 2, boxShadow: 0 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="company tabs">
            <Tab label="Thông tin công ty" value="1" />
            <Tab label="Đa phương tiện" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {/* Start: Company card */}
          <CompanyCard title="Thông tin công ty" />
          {/* End: Company card */}
        </TabPanel>
        <TabPanel value="2">
          {/* Start: Company image card */}
          <CompanyImageCard title="Hình ảnh công ty" />
          {/* End: Company image card */}
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default CompanyPage;
