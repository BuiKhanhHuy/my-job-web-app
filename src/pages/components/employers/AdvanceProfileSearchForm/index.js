import React from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Stack, Typography } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
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
import { useSelector } from 'react-redux';
import MultiSelectCustom from '../../../../components/controls/MultiSelectCustom';

const AdvanceProfileSearchForm = () => {
  const { allConfig } = useSelector((state) => state.config);

  const { control, watch, reset, handleSubmit } = useForm({
    defaultValues: {
      name: '',
    },
  });
  const a = watch();
  console.log(a);

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">Bộ lọc nâng cao: </Typography>
        <Button
          variant="outlined"
          color="error"
          size="small"
          onClick={() => reset()}
        >
          Xóa lọc
        </Button>
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon icon={faBriefcase} style={{ marginRight: 3 }} />{' '}
            Ngành nghề
          </Typography>
        </Box>
        <MultiSelectCustom
          name="careers"
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
        <MultiSelectCustom
          name="experiences"
          control={control}
          options={allConfig?.experienceOptions || []}
          placeholder="Tất cả kinh nghiệm"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon icon={faUsers} style={{ marginRight: 3 }} /> Cấp
            bậc
          </Typography>
        </Box>
        <MultiSelectCustom
          name="positions"
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
        <MultiSelectCustom
          name="academicsLevel"
          control={control}
          options={allConfig?.academicLevelOptions || []}
          placeholder="Tất cả học vấn"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon icon={faBuilding} style={{ marginRight: 3 }} /> Nơi
            làm việc
          </Typography>
        </Box>
        <MultiSelectCustom
          name="typeOfWorkPlaces"
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
        <MultiSelectCustom
          name="jobTypes"
          control={control}
          options={allConfig?.jobTypeOptions || []}
          placeholder="Tất cả hình thức làm việc"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon icon={faVenusMars} style={{ marginRight: 3 }} />{' '}
            Giới tính
          </Typography>
        </Box>
        <SingleSelectCustom
          name="gender"
          control={control}
          options={allConfig?.genderOptions || []}
          placeholder="Tất cả giới tính"
        />
      </Stack>
      <Stack spacing={1}>
        <Box>
          <Typography variant="subtitle2">
            <FontAwesomeIcon icon={faPeopleRoof} style={{ marginRight: 3 }} />{' '}
            Tình trạng hôn nhân
          </Typography>
        </Box>
        <SingleSelectCustom
          name="maritalStatus"
          control={control}
          options={allConfig?.maritalStatusOptions || []}
          placeholder="Tất cả tình trạng hôn nhân"
        />
      </Stack>
    </Stack>
  );
};

export default AdvanceProfileSearchForm;
