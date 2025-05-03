/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import * as React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  Button,
} from "@mui/material";

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SearchIcon from "@mui/icons-material/Search";

import { TabTitle } from "../../../utils/generalFunction";
import {
  HOME_FILTER_CAREER,
  ROLES_NAME,
  ROUTES,
  APP_NAME,
} from "../../../configs/constants";
import TopCompanyCarousel from "../../../components/TopCompanyCarousel";
import CareerCarousel from "../../../components/CareerCarousel";
import FeedbackCarousel from "../../../components/FeedbackCarousel";
import JobByCategory from "../../components/defaults/JobByCategory";
import FilterJobPostCard from "../../components/defaults/FilterJobPostCard";
import SuggestedJobPostCard from "../../components/defaults/SuggestedJobPostCard";

// Import images
import bannerExplore from '../../../assets/images/banner-explore.png';
import bannerExplorePc from '../../../assets/images/banner-explore-pc.png';

export default function HomePage() {
  TabTitle(`Tìm việc nhanh, tuyển dụng hiệu quả tại ${APP_NAME}`);
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const nav = useNavigate();

  const getIcon = (icon) => {
    const Icon = icon;
    return <Icon color="secondary" />
  }

  return (
    <>
      <Box sx={{ mt: 6 }}>
        {/*Start: Top cong ty */}
        <Typography variant="h5" sx={{ mb: 3 }} gutterBottom>
          Các công ty nổi bậc
        </Typography>
        <TopCompanyCarousel />
        {/*End: Top cong ty */}
      </Box>

      <Box sx={{ mt: 10 }}>
        {/*Start: Viec lam tuyen gap */}
        <Card variant="outlined" sx={{ boxShadow: 0 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                <AccessTimeIcon color="secondary" />
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: "white" }}>
                Việc làm tuyển gấp
              </Typography>
            }
            sx={{
              backgroundColor: "#441da0",
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
                <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                  <TipsAndUpdatesIcon color="secondary" />
                </Avatar>
              }
              title={
                <Typography variant="h5" sx={{ color: "#441da0" }}>
                  Việc làm gợi ý
                </Typography>
              }
              sx={{
                backgroundImage: `url(${bannerExplore})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                p: { xs: 0.75, sm: 1, md: 1.5, lg: 1.5, xl: 1.5 },
              }}
            />
            <CardContent sx={{ backgroundColor: "#e0f0ff" }}>
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

      <Box
        sx={{
          borderRadius: 1,
          p: 4,
          mt: 6,
          backgroundImage: `url(${bannerExplorePc})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Stack
          direction={{
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
            xl: "row",
          }}
          justifyContent="space-between"
          spacing={2}
        >
          <Box>
            <Typography fontSize={32} fontWeight="bold" color="white">
              Cần tìm việc làm phù hợp cho bạn?
            </Typography>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SearchIcon />}
              onClick={() => nav(`/${ROUTES.JOB_SEEKER.JOBS}`)}
            >
              Bắt đầu khám phá
            </Button>
          </Box>
        </Stack>
      </Box>

      <Box sx={{ mt: 6 }}>
        {/* Start: Viec lam nganh */}
        <Card variant="outlined" sx={{boxShadow: 0}}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                {getIcon(HOME_FILTER_CAREER[0].titleIcon)}
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: "white" }}>
                {`Việc làm ngành ${HOME_FILTER_CAREER[0].name}`}
              </Typography>
            }
            sx={{
              backgroundColor: "#441da0",
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
        <Card variant="outlined" sx={{ boxShadow: 0 }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: "white" }} aria-label="recipe">
                {getIcon(HOME_FILTER_CAREER[1].titleIcon)}
              </Avatar>
            }
            title={
              <Typography variant="h5" sx={{ color: "white" }}>
                {`Việc làm ngành ${HOME_FILTER_CAREER[1].name}`}
              </Typography>
            }
            sx={{
              backgroundColor: "#441da0",
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
        <Box
          sx={{
            backgroundColor: "background.paper",
            borderRadius: 2,
          }}
        >
          <JobByCategory />
        </Box>
        {/* End: Job by category */}
      </Box>
    </>
  );
}
