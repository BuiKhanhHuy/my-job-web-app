/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from "react";
import { Grid, Pagination, Stack } from "@mui/material";

import { SVG_IMAGES, ROLES_NAME } from "../../../../configs/constants";
import NoDataCard from "../../../../components/NoDataCard";
import jobService from "../../../../services/jobService";
import JobPost from "../../../../components/JobPost";
import { useSelector } from "react-redux";

const SuggestedJobPostCard = ({ pageSize = 12, fullWidth = false }) => {
  const { currentUser, isAuthenticated } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = React.useState(true);
  const [jobPosts, setJobPosts] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [parentWidth, setParentWidth] = React.useState(0);
  const [col, setCol] = React.useState(12);

  React.useEffect(() => {
    const handleResize = () => {
      const newWidth = document.getElementById(
        "suggested-job-post-card"
      ).offsetWidth;
      setParentWidth(newWidth);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  React.useEffect(() => {
    if (parentWidth < 600) {
      setCol(12);
    } else if (parentWidth < 900) {
      setCol(6);
    } else if (parentWidth < 1200) {
      setCol(6);
    } else {
      setCol(4);
    }
  }, [parentWidth]);

  React.useEffect(() => {
    const getJobPosts = async () => {
      setIsLoading(true);
      try {
        const resData = await jobService.getSuggestedJobPosts({
          pageSize: pageSize,
          page: page,
        });
        const data = resData.data;

        setCount(data.count);
        setJobPosts(data.results);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated && currentUser?.roleName === ROLES_NAME.JOB_SEEKER) {
      getJobPosts();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div id="suggested-job-post-card">
      <Stack>
        {isLoading ? (
          <Grid container spacing={2}>
            {Array.from(Array(pageSize).keys()).map((item) => (
              <Grid key={item} item xs={col}>
                <JobPost.Loading></JobPost.Loading>
              </Grid>
            ))}
          </Grid>
        ) : jobPosts.length === 0 ? (
          <NoDataCard imgComponentSgv={<SVG_IMAGES.ImageSvg8 />} />
        ) : (
          <>
            <Grid container spacing={2}>
              {jobPosts.map((value) => (
                <Grid item xs={col} key={value.id}>
                  {/* Start: Job post */}
                  <JobPost
                    id={value.id}
                    slug={value.slug}
                    companyImageUrl={value?.companyDict?.companyImageUrl}
                    companyName={value?.companyDict?.companyName}
                    jobName={value?.jobName}
                    cityId={value?.locationDict?.city}
                    deadline={value?.deadline}
                    isUrgent={value?.isUrgent}
                    isHot={value?.isHot}
                    salaryMin={value.salaryMin}
                    salaryMax={value.salaryMax}
                  />
                  {/* End: Job post */}
                </Grid>
              ))}
            </Grid>
            <Stack sx={{mt: 4}}>
              {Math.ceil(count / pageSize) > 1 && (
                <Pagination
                  color="primary"
                  size="medium"
                  variant="text"
                  sx={{ margin: "0 auto" }}
                  count={Math.ceil(count / pageSize)}
                  page={page}
                  onChange={handleChangePage}
                />
              )}
            </Stack>
          </>
        )}
      </Stack>
    </div>
  );
};

export default SuggestedJobPostCard;
