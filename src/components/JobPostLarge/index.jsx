/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  Box,
  Card,
  Skeleton,
  Stack,
  Typography,
  Tooltip,
  Divider,
} from "@mui/material";
import {
  faCalendarDays,
  faCircleDollarToSlot,
  faLocationDot,
  faBolt,
  faFire,
  faClock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { salaryString } from "../../utils/customData";
import MuiImageCustom from "../MuiImageCustom";
import { formatRoute } from "../../utils/funcUtils";
import { ROUTES } from "../../configs/constants";
import TimeAgo from '../TimeAgo';

const JobPostLarge = ({
  id,
  slug,
  companyImageUrl,
  companyName,
  jobName,
  cityId,
  deadline,
  isUrgent,
  isHot,
  salaryMin,
  salaryMax,
}) => {
  const theme = useTheme();
  const nav = useNavigate();
  const { allConfig } = useSelector((state) => state.config);

  return (
    <Card
      variant="outlined"
      sx={{
        boxShadow: 0,
        cursor: "pointer",
        px: 2,
        pt: 2,
        pb: 1,
        transition: "all 0.3s ease",
        borderRadius: 2.5,
        border: `1px solid ${theme.palette.divider}`,
        position: "relative",
        overflow: "hidden",
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.common.white
            : theme.palette.grey[900],
        ...(isUrgent && {
          "&::after": {
            content: '""',
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "4px",
            background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.secondary.light})`,
          },
        }),
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: theme.customShadows.large,
          borderColor: isUrgent
            ? theme.palette.secondary.main
            : theme.palette.primary.main,
          backgroundColor:
            theme.palette.mode === "light"
              ? isUrgent
                ? theme.palette.secondary.backgroundHover
                : "rgba(68, 29, 160, 0.02)"
              : theme.palette.grey[800],
        },
      }}
      onClick={() => nav(`/${formatRoute(ROUTES.JOB_SEEKER.JOB_DETAIL, slug)}`)}
    >
      <Stack spacing={1.5}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box sx={{ position: "relative" }}>
            <MuiImageCustom
              width={100}
              height={100}
              src={companyImageUrl}
              sx={{
                border: 1,
                borderRadius: 2.5,
                borderColor: theme.palette.grey[200],
                p: 1,
                backgroundColor: theme.palette.common.white,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: theme.customShadows.medium,
                },
              }}
            />
            {isUrgent && (
              <Tooltip title="Tuyển gấp" placement="top">
                <Box
                  sx={{
                    position: "absolute",
                    top: -6,
                    right: -6,
                    backgroundColor: theme.palette.warning.main,
                    borderRadius: "50%",
                    width: 28,
                    height: 28,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: `0 0 12px ${theme.palette.warning.main}80`,
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": {
                        transform: "scale(1)",
                        boxShadow: `0 0 0 0 ${theme.palette.warning.main}80`,
                      },
                      "70%": {
                        transform: "scale(1.05)",
                        boxShadow: `0 0 0 10px ${theme.palette.warning.main}00`,
                      },
                      "100%": {
                        transform: "scale(1)",
                        boxShadow: `0 0 0 0 ${theme.palette.warning.main}00`,
                      },
                    },
                  }}
                >
                  <FontAwesomeIcon
                    icon={faBolt}
                    style={{
                      fontSize: "14px",
                      color: theme.palette.common.white,
                    }}
                  />
                </Box>
              </Tooltip>
            )}
          </Box>

          <Stack flex={1} spacing={0.75}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
            >
              <Box flex={1}>
                <Typography
                  sx={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: theme.palette.grey[900],
                    lineHeight: 1.3,
                    mb: 0.5,
                  }}
                >
                  {jobName}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: theme.palette.primary.main,
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {companyName}
                </Typography>
              </Box>

              {isHot && (
                <Box
                  sx={{
                    backgroundColor: theme.palette.hot.background,
                    padding: "4px 10px",
                    borderRadius: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    boxShadow: `0 0 12px ${theme.palette.hot.main}40`,
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": {
                        transform: "scale(1)",
                        boxShadow: `0 0 0 0 ${theme.palette.hot.main}40`,
                      },
                      "70%": {
                        transform: "scale(1.05)",
                        boxShadow: `0 0 0 10px ${theme.palette.hot.main}00`,
                      },
                      "100%": {
                        transform: "scale(1)",
                        boxShadow: `0 0 0 0 ${theme.palette.hot.main}00`,
                      },
                    },
                  }}
                >
                  <FontAwesomeIcon
                    icon={faFire}
                    style={{
                      fontSize: "14px",
                      color: theme.palette.hot.main,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "bold",
                      color: theme.palette.hot.main,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Hot
                  </Typography>
                </Box>
              )}
            </Stack>

            {/* Info Cards Section */}
            <Stack direction="row" spacing={1.5} sx={{ mt: 0.75 }}>
              <Box
                sx={{
                  backgroundColor: theme.palette.primary.background,
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 0.75,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleDollarToSlot}
                  style={{
                    fontSize: "16px",
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: theme.palette.primary.main,
                  }}
                >
                  {salaryString(salaryMin, salaryMax)}
                </Typography>
              </Box>

              <Box
                sx={{
                  backgroundColor: theme.palette.info.background,
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 0.75,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                }}
              >
                <FontAwesomeIcon
                  icon={faLocationDot}
                  style={{
                    fontSize: "16px",
                    color: theme.palette.info.main,
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: theme.palette.info.main,
                  }}
                >
                  {allConfig?.cityDict[cityId] || (
                    <span style={{ fontStyle: "italic", opacity: 0.7 }}>
                      Chưa cập nhật
                    </span>
                  )}
                </Typography>
              </Box>

              <Box
                sx={{
                  backgroundColor: theme.palette.success.background,
                  borderRadius: 1.5,
                  px: 1.5,
                  py: 0.75,
                  display: "flex",
                  alignItems: "center",
                  gap: 0.75,
                }}
              >
                <FontAwesomeIcon
                  icon={faCalendarDays}
                  style={{
                    fontSize: "16px",
                    color: theme.palette.success.main,
                  }}
                />
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 13,
                    color: theme.palette.success.main,
                  }}
                >
                  {dayjs(deadline).format("DD/MM/YYYY")}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Divider sx={{ mt: 1, mb: 0.75, borderColor: theme.palette.grey[400] }} />

      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.8,
            color: theme.palette.grey[600],
          }}
        >
          <FontAwesomeIcon
            icon={faClock}
            style={{ fontSize: "14px" }}
            color={theme.palette.grey[400]}
          />
          <Typography
            sx={{
              fontWeight: 500,
              fontSize: 13,
              color: theme.palette.grey[600],
            }}
            variant="body2"
          >
            Còn{" "}
            <TimeAgo date={deadline} type="fromNow" />
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

const Loading = () => (
  <>
    <Card sx={{ p: 1, boxShadow: 0 }}>
      <Stack direction="row" spacing={2}>
        <Box>
          <Skeleton variant="rounded" width={100} height={100} />
        </Box>
        <Box flex={1} justifyContent="center" spacing={0.8}>
          <Typography variant="subtitle2">
            <Skeleton height={40} />
          </Typography>
          <Typography variant="subtitle2">
            <Skeleton height={30} />
          </Typography>
          <Typography variant="body1">
            <Skeleton height={25} />
          </Typography>
        </Box>
      </Stack>
    </Card>
  </>
);

JobPostLarge.Loading = Loading;

export default JobPostLarge;
