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
    <Card sx={{ p: 2 }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="company tabs">
            <Tab label="Thông tin công ty" />
            <Tab label="Đa phương tiện" />
          </TabList>
        </Box>
        <TabPanel value={0}>
          {/* Start: Company card */}
          <CompanyCard />
          {/* End: Company card */}
        </TabPanel>
        <TabPanel value={1}>
          {/* Start: Company image card */}
          <CompanyImageCard />
          {/* End: Company image card */}
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default CompanyPage;
