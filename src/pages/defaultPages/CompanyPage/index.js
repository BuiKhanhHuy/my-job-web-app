import React from 'react';
import { Box, Card, Typography } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import CompanySearch from '../../components/defaults/CompanySearch';
import Companies from '../../../components/Companies';

const CompanyPage = () => {
  TabTitle('Kết quả tìm kiếm nhà tuyển dụng')

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Khám Phá Văn Hóa Công ty
        </Typography>
        <Typography>
          Tìm hiểu văn hóa công ty và chọn cho bạn nơi làm việc phù hợp nhất
        </Typography>
      </Box>
      <Box sx={{ mt: 4 }}>
        <CompanySearch />
      </Box>
      <Box sx={{ mt: 4 }}>
        <Card sx={{ px: { xs: 1, sm: 1, md: 2, lg: 4, xl: 4 }  }} variant="outlined">
          {/* Start: companies */}
          <Companies />
          {/* End: companies */}

        </Card>
      </Box>
    </Box>
  );
};

export default CompanyPage;
