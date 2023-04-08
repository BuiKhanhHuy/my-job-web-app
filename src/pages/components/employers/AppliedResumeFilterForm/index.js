import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Box, Grid, Stack, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faBriefcase,
  faMagicWandSparkles,
  faUsers,
  faGraduationCap,
  faBuilding,
  faPersonDigging,
  faVenusMars,
  faPeopleRoof,
} from '@fortawesome/free-solid-svg-icons';
import SingleSelectCustom from '../../../../components/controls/SingleSelectCustom';

const AppliedResumeFilterForm = ({ handleFilter, filterData }) => {
  const { allConfig } = useSelector((state) => state.config);
  const { control, handleSubmit, reset } = useForm();

  React.useEffect(() => {
    reset((formValues) => ({
      ...formValues,
      ...filterData,
    }));
  }, [filterData, reset]);

  return (
    <>
      <form id="modal-form" onSubmit={handleSubmit(handleFilter)}>
        <Grid item xs={12}>
          <Stack spacing={2}>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Tỉnh/Thành phố
                </Typography>
              </Box>
              <SingleSelectCustom
                name="cityId"
                control={control}
                options={allConfig?.cityOptions || []}
                showRequired={true}
                placeholder="Chọn Tỉnh/Thành phố"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faBriefcase}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Ngành nghề
                </Typography>
              </Box>
              <SingleSelectCustom
                name="careerId"
                control={control}
                options={allConfig?.careerOptions || []}
                placeholder="Tất cả ngành nghề"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faMagicWandSparkles}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Kinh nghiệm
                </Typography>
              </Box>
              <SingleSelectCustom
                name="experienceId"
                control={control}
                options={allConfig?.experienceOptions || []}
                placeholder="Tất cả kinh nghiệm"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon icon={faUsers} style={{ marginRight: 3 }} />{' '}
                  Cấp bậc
                </Typography>
              </Box>
              <SingleSelectCustom
                name="positionId"
                control={control}
                options={allConfig?.positionOptions || []}
                placeholder="Tất cả cấp bậc"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faGraduationCap}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Học vấn
                </Typography>
              </Box>
              <SingleSelectCustom
                name="academicLevelId"
                control={control}
                options={allConfig?.academicLevelOptions || []}
                placeholder="Tất cả học vấn"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faBuilding}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Nơi làm việc
                </Typography>
              </Box>
              <SingleSelectCustom
                name="typeOfWorkplaceId"
                control={control}
                options={allConfig?.typeOfWorkplaceOptions || []}
                placeholder="Tất cả nơi làm việc"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faPersonDigging}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Hình thức làm việc
                </Typography>
              </Box>
              <SingleSelectCustom
                name="jobTypeId"
                control={control}
                options={allConfig?.jobTypeOptions || []}
                placeholder="Tất cả hình thức làm việc"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faVenusMars}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Giới tính
                </Typography>
              </Box>
              <SingleSelectCustom
                name="genderId"
                control={control}
                options={allConfig?.genderOptions || []}
                placeholder="Tất cả giới tính"
              />
            </Stack>
            <Stack spacing={1}>
              <Box>
                <Typography variant="subtitle2">
                  <FontAwesomeIcon
                    icon={faPeopleRoof}
                    style={{ marginRight: 3 }}
                  />{' '}
                  Tình trạng hôn nhân
                </Typography>
              </Box>
              <SingleSelectCustom
                name="maritalStatusId"
                control={control}
                options={allConfig?.maritalStatusOptions || []}
                placeholder="Tất cả tình trạng hôn nhân"
              />
            </Stack>
          </Stack>
        </Grid>
      </form>
    </>
  );
};

export default AppliedResumeFilterForm;
