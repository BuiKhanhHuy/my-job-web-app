import React from "react";
import { useSelector } from "react-redux";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";

import { ImageSvg4 } from "../../configs/constants";
import NoDataCard from "../NoDataCard";
import Company from "../Company";
import companyService from "../../services/companyService";

const Companies = () => {
  const { companyFilter } = useSelector((state) => state.filter);
  const { pageSize } = companyFilter;
  const [isLoading, setIsLoading] = React.useState(true);
  const [companies, setCompanies] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    const getCompanies = async () => {
      setIsLoading(true);
      try {
        const resData = await companyService.getCompanies({
          ...companyFilter,
          page: page,
        });

        const data = resData.data;

        setCount(data.count);
        setCompanies(data?.results || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getCompanies();
  }, [companyFilter, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Stack
        direction={{
          xs: "column",
          sm: "row",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        sx={{ pb: 3 }}
        justifyContent="space-between"
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "text.primary",
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            Công ty nổi bật
            <Box
              component="span"
              sx={{
                color: "primary.main",
                fontWeight: 600,
                backgroundColor: "primary.background",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "0.9em",
              }}
            >
              {count} công ty
            </Box>
          </Typography>
        </Box>
      </Stack>

      <Stack spacing={2}>
        {isLoading ? (
          <Grid container spacing={2}>
            {Array.from(Array(12).keys()).map((value) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={value.id}>
                <Company.Loading />
              </Grid>
            ))}
          </Grid>
        ) : companies.length === 0 ? (
          <NoDataCard
            title="Hiện chưa tìm công ty phù hợp với tiêu chí của bạn"
            imgComponentSgv={<ImageSvg4 />}
          />
        ) : (
          <>
            <Grid container spacing={2}>
              {companies.map((value) => (
                <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={value.id}>
                  <Company
                    id={value.id}
                    slug={value.slug}
                    companyImageUrl={value.companyImageUrl}
                    companyCoverImageUrl={value.companyCoverImageUrl}
                    companyName={value.companyName}
                    employeeSize={value.employeeSize}
                    fieldOperation={value.fieldOperation}
                    city={value.locationDict?.city}
                    followNumber={value.followNumber}
                    jobPostNumber={value.jobPostNumber}
                    isFollowed={value.isFollowed}
                  />
                </Grid>
              ))}
            </Grid>
            <Stack sx={{ py: 2 }}>
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
    </>
  );
};

export default Companies;
