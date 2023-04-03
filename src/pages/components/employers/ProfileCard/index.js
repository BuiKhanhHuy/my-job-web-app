import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, Grid, Pagination, Stack, Typography } from '@mui/material';

import NoDataCard from '../../../../components/NoDataCard';
import errorHandling from '../../../../utils/errorHandling';
import toastMessages from '../../../../utils/toastMessages';

import ProfileSearch from '../ProfileSearch';
import JobSeekerProfile from '../../../../components/JobSeekerProfile';
import resumeService from '../../../../services/resumeService';

const ProfileCard = () => {
  const { resumeFilter } = useSelector((state) => state.filter);
  const { pageSize } = resumeFilter;
  const [page, setPage] = React.useState(1);
  const [count, setCount] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [resumes, setResumes] = React.useState([1]);

  React.useEffect(() => {
    const getResumes = async () => {
      setIsLoading(true);

      try {
        const resData = await resumeService.getResumes({
          ...resumeFilter,
          page: page,
        });

        const data = resData.data;

        setCount(data.count);
        setResumes(data?.results || []);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoading(false);
      }
    };

    getResumes();
  }, [resumeFilter, page]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleSave = (slug) => {
    const save = async (slugResume) => {
      try {
        const resData = await resumeService.saveResume(slugResume);
        const isSaved = resData.data.isSaved;

        let resumesNew = [];
        const currentResume = resumes.find(
          (value) => value.slug === slugResume
        );

        for (let i = 0; i < resumes.length && currentResume; i++) {
          if (resumes[i].slug === slugResume) {
            resumesNew.push({
              ...currentResume,
              isSaved: isSaved,
            });
          } else {
            resumesNew.push(resumes[i]);
          }
        }

        setResumes(resumesNew);
        toastMessages.success(
          isSaved ? 'Lưu thành công.' : 'Hủy lưu thành công.'
        );
      } catch (error) {
        errorHandling(error);
      }
    };

    save(slug);
  };

  return (
    <Grid container spacing={3}>
      {/* Start: Profile search */}
      <ProfileSearch />
      {/* End: Profile search */}

      <Grid item xs={12} sm={12} md={12} lg={9} xl={9}>
        <Card sx={{ boxShadow: 0 }}>
          <Stack>
            <Box>
              <Typography
                variant="body1"
                sx={{ fontSize: 18, fontWeight: 'bold' }}
              >
                Kết quả tìm thấy:{' '}
                <span style={{ color: 'red' }}>{count} hồ sơ</span>
              </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
              {isLoading ? (
                <Box>
                  <Grid container spacing={2}>
                    {Array.from(Array(pageSize).keys()).map((value) => (
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={12}
                        xl={12}
                        key={value}
                      >
                        <JobSeekerProfile.Loading />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              ) : resumes.length === 0 ? (
                <NoDataCard title="Không tìm thấy kết quả." />
              ) : (
                <>
                  {/* Start: Job seeker profiles */}
                  <Box>
                    <Stack spacing={4}>
                      <Grid container spacing={2}>
                        {resumes.map((value) => (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            xl={12}
                            key={value.id}
                          >
                            <JobSeekerProfile
                              id={value.id}
                              slug={value.slug}
                              title={value.title}
                              salaryMin={value.salaryMin}
                              salaryMax={value.salaryMin}
                              experience={value.experience}
                              updateAt={value.updateAt}
                              isSaved={value.isSaved}
                              viewEmployerNumber={value.viewEmployerNumber}
                              user={value.userDict}
                              city={value.city}
                              jobSeekerProfile={value.jobSeekerProfileDict}
                              type={value.type}
                              handleSave={handleSave}
                            />
                          </Grid>
                        ))}
                      </Grid>
                      <Stack>
                        {Math.ceil(count / pageSize) > 1 && (
                          <Pagination
                            color="primary"
                            size="medium"
                            variant="outlined"
                            sx={{ margin: '0 auto' }}
                            count={Math.ceil(count / pageSize)}
                            page={page}
                            onChange={handleChangePage}
                          />
                        )}
                      </Stack>
                    </Stack>
                  </Box>
                  {/* End: Job seeker profiles */}
                </>
              )}
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ProfileCard;
