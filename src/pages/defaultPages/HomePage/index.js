import * as React from 'react';
import { useSelector } from 'react-redux';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from '@mui/material';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';

import { HOME_FILTER_CAREER, ROLES_NAME } from '../../../configs/constants';
import TopCompanyCarousel from '../../../components/TopCompanyCarousel';
import CareerCarousel from '../../../components/CareerCarousel';
import FeedbackCarousel from '../../../components/FeedbackCarousel';
import JobByCategory from '../../components/defaults/JobByCategory';
import FilterJobPostCard from '../../components/defaults/FilterJobPostCard';
import SuggestedJobPostCard from '../../components/defaults/SuggestedJobPostCard';

export default function HomePage() {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);

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
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                <AccessTimeIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: 'white' }}>
                Việc làm tuyển gấp
              </Typography>
            }
            sx={{
              backgroundColor: '#441da0',
              p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
            }}
          />
          <CardContent>
            <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <FilterJobPostCard
                params={{
                  isUrgent: true,
                }}
              />
            </Box>
          </CardContent>
        </Card>
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

      {isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER && (
        <Box sx={{ mt: 10 }}>
          {/* Start: Viec lam goi y */}
          <Card variant="outlined">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                  <TipsAndUpdatesIcon color="secondary" />
                </Avatar>
              }
              title={
                <Typography variant="h5" sx={{ color: 'white' }}>
                  Việc làm gợi ý
                </Typography>
              }
              sx={{
                backgroundColor: '#441da0',
                p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
              }}
            />
            <CardContent>
              <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
                {/* Start: SuggestedJobPostCard */}
                <SuggestedJobPostCard />
                {/* End: SuggestedJobPostCard */}
              </Box>
            </CardContent>
          </Card>
          {/* End: Viec lam goi y */}
        </Box>
      )}

      <Box sx={{ mt: 10 }}>
        {/* Start: Viec lam nganh */}
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                {HOME_FILTER_CAREER[0].titleIcon}
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: 'white' }}>
                {`Việc làm ngành ${HOME_FILTER_CAREER[0].name}`}
              </Typography>
            }
            sx={{
              backgroundColor: '#441da0',
              p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
            }}
          />
          <CardContent>
            <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <FilterJobPostCard
                params={{
                  careerId: HOME_FILTER_CAREER[0].id,
                }}
              />
            </Box>
          </CardContent>
        </Card>
        {/* End: Viec lam nganh */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/* Start: Viec lam nganh */}
        <Card variant="outlined">
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: 'white' }} aria-label="recipe">
                {HOME_FILTER_CAREER[1].titleIcon}
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: 'white' }}>
                {`Việc làm ngành ${HOME_FILTER_CAREER[1].name}`}
              </Typography>
            }
            sx={{
              backgroundColor: '#441da0',
              p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
            }}
          />
          <CardContent>
            <Box sx={{ p: { xs: 0, sm: 0, md: 0, lg: 2, xl: 2 } }}>
              <FilterJobPostCard
                params={{
                  careerId: HOME_FILTER_CAREER[1].id,
                }}
              />
            </Box>
          </CardContent>
        </Card>
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
            <Box
              sx={{
                py: { xs: 1, sm: 1, md: 2, lg: 4, xl: 4 },
                px: { xs: 1, sm: 1, md: 2, lg: 6, xl: 6 },
              }}
            >
              <JobByCategory />
            </Box>
          </CardContent>
        </Card>
        {/* End: Job by category */}
      </Box>
    </>
  );
}
