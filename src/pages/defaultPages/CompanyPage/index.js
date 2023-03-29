import React from 'react';
import { Box, Button, Card, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

import CompanySearch from '../../components/defaults/CompanySearch';
import Companies from '../../../components/Companies';
import SingleSelectSearchCustom from '../../../components/controls/SingleSelectSearchCustom';

const CompanyPage = () => {
  const { control } = useForm();
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
        <Card sx={{ px: 4 }} variant="outlined">
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
              md: 'row',
              lg: 'row',
              xl: 'row',
            }}
            sx={{ py: 4 }}
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="h5" gutterBottom>
                Công Ty Nổi Bật{' '}
                <span style={{ color: 'GrayText', fontWeight: 'bold' }}>
                  (449)
                </span>
              </Typography>
            </Box>
            <Box
              sx={{ width: { xs: '100%', sm: 300, md: 300, lg: 300, xl: 300 } }}
            >
              <SingleSelectSearchCustom
                name="city"
                placeholder="Tất cả tỉnh thành"
                control={control}
              />
            </Box>
          </Stack>

          {/* Start: companies */}
          <Companies />
          {/* End: companies */}
          
          <Stack sx={{ pt: 4, pb: 3 }} direction="row" justifyContent="center">
            <Button variant="contained" >
              Xem thêm
            </Button>
          </Stack>
        </Card>
      </Box>
    </Box>
  );
};

export default CompanyPage;
