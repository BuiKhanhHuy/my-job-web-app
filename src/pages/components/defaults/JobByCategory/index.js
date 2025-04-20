/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Grid, Stack, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

import { searchJobPost } from "../../../../redux/filterSlice";
import { ROUTES } from "../../../../configs/constants";

const maxItem = 6;

const JobByCategory = () => {
  const { allConfig } = useSelector((state) => state.config);
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { jobPostFilter } = useSelector((state) => state.filter);

  const careerOptions = allConfig?.careerOptions || [];
  const cityOptions = allConfig?.cityOptions || [];
  const jobTypeOptions = allConfig?.jobTypeOptions || [];

  const handleFilter = (id, type) => {
    switch (type) {
      case "CARRER":
        dispatch(searchJobPost({ ...jobPostFilter, careerId: id }));
        break;
      case "CITY":
        dispatch(searchJobPost({ ...jobPostFilter, cityId: id }));
        break;
      case "JOB_TYPE":
        dispatch(searchJobPost({ ...jobPostFilter, jobTypeId: id }));
        break;
      default:
        break;
    }
    nav(`/${ROUTES.JOB_SEEKER.JOBS}`);
  };

  return (
    <Grid container spacing={4}>
      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Stack
          spacing={2.5}
          sx={{
            p: 3,
            height: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              borderBottom: "2px solid",
              borderColor: "primary.main",
              pb: 1,
            }}
          >
            Việc làm theo nghề nghiệp
          </Typography>
          <Stack spacing={1.5}>
            {careerOptions?.slice(0, maxItem).map((item) => (
              <Typography
                sx={{
                  cursor: "pointer",
                  py: 0.5,
                  px: 1.5,
                  borderRadius: 1,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "primary.background",
                    color: "primary.main",
                    transform: "translateX(8px)",
                  },
                }}
                key={item.id}
                onClick={() => handleFilter(item.id, "CARRER")}
              >
                {item.name}
              </Typography>
            ))}
            {careerOptions.length > maxItem && (
              <Typography
                variant="subtitle2"
                sx={{
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "primary.main",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    color: "primary.dark",
                  },
                }}
                component={Link}
                to={`/${ROUTES.JOB_SEEKER.JOBS_BY_CAREER}`}
              >
                Xem tất cả nghề nghiệp <FontAwesomeIcon icon={faChevronRight} />
              </Typography>
            )}
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Stack
          spacing={2.5}
          sx={{
            p: 3,
            height: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              borderBottom: "2px solid",
              borderColor: "primary.main",
              pb: 1,
            }}
          >
            Việc làm theo khu vực
          </Typography>
          <Stack spacing={1.5}>
            {cityOptions?.slice(0, maxItem).map((item) => (
              <Typography
                sx={{
                  cursor: "pointer",
                  py: 0.5,
                  px: 1.5,
                  borderRadius: 1,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "primary.background",
                    color: "primary.main",
                    transform: "translateX(8px)",
                  },
                }}
                key={item.id}
                onClick={() => handleFilter(item.id, "CITY")}
              >
                {item.name}
              </Typography>
            ))}
            {cityOptions.length > maxItem && (
              <Typography
                variant="subtitle2"
                sx={{
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "primary.main",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
                component={Link}
                to={`/${ROUTES.JOB_SEEKER.JOBS_BY_CITY}`}
              >
                Xem tất cả khu vực <FontAwesomeIcon icon={faChevronRight} />
              </Typography>
            )}
          </Stack>
        </Stack>
      </Grid>

      <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
        <Stack
          spacing={2.5}
          sx={{
            p: 3,
            height: "100%",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "primary.main",
              borderBottom: "2px solid",
              borderColor: "primary.main",
              pb: 1,
            }}
          >
            Việc làm theo hình thức làm việc
          </Typography>
          <Stack spacing={1.5}>
            {jobTypeOptions?.slice(0, maxItem).map((item) => (
              <Typography
                sx={{
                  cursor: "pointer",
                  py: 0.5,
                  px: 1.5,
                  borderRadius: 1,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "primary.background",
                    color: "primary.main",
                    transform: "translateX(8px)",
                  },
                }}
                key={item.id}
                onClick={() => handleFilter(item.id, "JOB_TYPE")}
              >
                {item.name}
              </Typography>
            ))}
            {jobTypeOptions.length > maxItem && (
              <Typography
                variant="subtitle2"
                sx={{
                  mt: 1,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "primary.main",
                  fontWeight: 600,
                  cursor: "pointer",
                  textDecoration: "none",
                  "&:hover": {
                    color: "primary.main",
                  },
                }}
                component={Link}
                to={`/${ROUTES.JOB_SEEKER.JOBS_BY_TYPE}`}
              >
                Xem tất cả hình thức làm việc{" "}
                <FontAwesomeIcon icon={faChevronRight} />
              </Typography>
            )}
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );
};

export default JobByCategory;
