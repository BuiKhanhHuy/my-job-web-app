import * as React from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import TopCompanyCarousel from '../../../components/TopCompanyCarousel';
import CareerCarousel from '../../../components/CareerCarousel';
import FeedbackCarousel from '../../../components/FeedbackCarousel';
import JobByCategory from '../../components/defaults/JobByCategory';
import FilterJobPostCard from '../../components/defaults/FilterJobPostCard';
import SuggestedJobPostCard from '../../components/defaults/SuggestedJobPostCard';
import { HOME_FILTER_CAREER } from '../../../configs/constants';

export default function HomePage() {
  return (
    <>
      <Box sx={{ mt: 6 }}>
        {/*Start: Top cong ty */}
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          Các công ty hàng đầu
        </Typography>
        <TopCompanyCarousel />
        {/*End: Top cong ty */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/*Start: Viec lam tuyen gap */}
        <FilterJobPostCard
          title="Việc làm tuyển gấp"
          titleIcon={<AccessTimeIcon color="secondary" />}
          params={{
            isUrgent: true,
          }}
        />
        {/*End: Viec lam tuyen gap */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Cac nganh nghe */}
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          Ngành nghề trọng điểm
        </Typography>
        <CareerCarousel />
        {/* End: Cac nganh nghe */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Viec lam goi y */}
        <SuggestedJobPostCard
          title="Việc làm gợi ý"
          titleIcon={<TipsAndUpdatesIcon color="secondary" />}
        />
        {/* End: Viec lam goi y */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Viec lam nganh */}
        <FilterJobPostCard
          title={`Việc làm ngành ${HOME_FILTER_CAREER[0].name}`}
          titleIcon={HOME_FILTER_CAREER[0].titleIcon}
          params={{
            careerId: HOME_FILTER_CAREER[0].id,
          }}
        />
        {/* End: Viec lam nganh */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Viec lam nganh */}
        <FilterJobPostCard
          title={`Việc làm ngành ${HOME_FILTER_CAREER[1].name}`}
          titleIcon={HOME_FILTER_CAREER[1].titleIcon}
          params={{
            careerId: HOME_FILTER_CAREER[1].id,
          }}
        />
        {/* End: Viec lam nganh */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Feedback */}
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          Người dùng đánh giá
        </Typography>
        <FeedbackCarousel />
        {/* End: Feedback */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Job by category */}
        <Card sx={{ boxShadow: 0 }}>
          <CardContent>
            <Box sx={{ py:  {xs: 1, sm: 1, md: 2, lg: 4, xl: 4}, px: {xs: 1, sm: 1, md: 2, lg: 6, xl: 6} }}>
              <JobByCategory />
            </Box>
          </CardContent>
        </Card>
        {/* End: Job by category */}
      </Box>
    </>
  );
}
