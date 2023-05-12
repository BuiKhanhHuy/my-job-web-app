import React from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  Card,
  CircularProgress,
  FormControlLabel,
  Grid,
  Link,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faFile, faFilePdf } from '@fortawesome/free-regular-svg-icons';
import errorHandling from '../../utils/errorHandling';
import { CV_TYPES, REGEX_VATIDATE } from '../../configs/constants';

import TextFieldCustom from '../controls/TextFieldCustom';
import jobSeekerProfileService from '../../services/jobSeekerProfileService';

const ApplyForm = ({ handleApplyJob }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoadingResumes, setIsLoadingResumes] = React.useState(false);

  const [resumes, setResumes] = React.useState([]);

  const schema = yup.object().shape({
    fullName: yup
      .string()
      .required('Họ và tên là bắt buộc.')
      .max(100, 'Họ và tên vượt quá độ dài cho phép.'),
    email: yup
      .string()
      .required('Email là bắt buộc.')
      .email('Email không hợp lệ.')
      .max(100, 'Email vượt quá độ dài cho phép.'),
    phone: yup
      .string()
      .required('Số điện thoại là bắt buộc.')
      .matches(REGEX_VATIDATE.phoneRegExp, 'Số điện thoại không hợp lệ.')
      .max(15, 'Số điện thoại vượt quá độ dài cho phép.'),
  });

  const { control, setValue, handleSubmit } = useForm({
    defaultValues: {
      fullName: currentUser.fullName,
      email: currentUser.email,
      phone: currentUser?.jobSeekerProfilePhone || '',
      resume: '',
    },
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    const getOnlineProfile = async (jobSeekerProfileId, params) => {
      setIsLoadingResumes(true);
      try {
        const resData = await jobSeekerProfileService.getResumes(
          jobSeekerProfileId,
          params
        );

        setResumes(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingResumes(false);
      }
    };

    getOnlineProfile(currentUser?.jobSeekerProfileId);
  }, [currentUser]);

  return (
    <>
      <form id="modal-form" onSubmit={handleSubmit(handleApplyJob)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack spacing={1} justifyContent="center">
              {isLoadingResumes ? (
                <CircularProgress color="secondary" sx={{ margin: '0 auto' }} />
              ) : (
                <RadioGroup
                  aria-labelledby="resume"
                  defaultValue={() => {
                    let defaultResumes = resumes.filter(
                      (value) => value.type === CV_TYPES.cvWebsite
                    );
                    if (defaultResumes.length > 0) {
                      setValue('resume', `${defaultResumes[0].id}`)
                      return defaultResumes[0].id;
                    } else if (resumes.length > 0) {
                      setValue('resume', `${resumes[0].id}`)
                      return resumes[0].id;
                    }
                  }}
                  name="resume"
                  onChange={(event) => setValue('resume', event.target.value)}
                >
                  <Stack spacing={1}>
                    {resumes.map((value) => (
                      <Card sx={{ p: 1 }} variant="outlined" key={value.id}>
                        <Stack direction="row" sx={{ width: '100%' }}>
                          <Stack>
                            <FormControlLabel
                              value={value.id}
                              control={<Radio />}
                              sx={{ mr: 1 }}
                            />
                          </Stack>
                          <Stack flex={1}>
                            <Typography variant="h6" sx={{ fontSize: 17 }}>
                              {value?.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ fontStyle: 'italic' }}
                            >
                              {value.type === CV_TYPES.cvWebsite ? (
                                <>
                                  <FontAwesomeIcon
                                    icon={faFile}
                                    style={{ marginRight: 1 }}
                                    color="#441da0"
                                  />{' '}
                                  Hồ sơ trực tuyến
                                </>
                              ) : value.type === CV_TYPES.cvUpload ? (
                                <>
                                  <FontAwesomeIcon
                                    icon={faFilePdf}
                                    style={{ marginRight: 1 }}
                                    color="red"
                                  />{' '}
                                  Hồ sơ đính kèm
                                </>
                              ) : (
                                ''
                              )}
                            </Typography>
                          </Stack>
                          <Stack justifyContent="center">
                            <Link
                              target="_blank"
                              href={
                                value.type === CV_TYPES.cvWebsite
                                  ? `/ung-vien/ho-so-tung-buoc/${value.slug}`
                                  : `/ung-vien/ho-so-dinh-kem/${value.slug}`
                              }
                              style={{
                                textDecoration: 'none',
                              }}
                            >
                              <Typography
                                sx={{ fontWeight: 'bold', cursor: 'pointer' }}
                                color="#441da0"
                              >
                                <FontAwesomeIcon icon={faEye} /> Xem hồ sơ
                              </Typography>
                            </Link>
                          </Stack>
                        </Stack>
                      </Card>
                    ))}
                  </Stack>
                </RadioGroup>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustom
              name="fullName"
              title="Họ và tên"
              showRequired={true}
              placeholder="Nhập họ và tên"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustom
              name="email"
              title="Email"
              showRequired={true}
              placeholder="Nhập email"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldCustom
              name="phone"
              title="Số điện thoại"
              showRequired={true}
              placeholder="Nhập số điện thoại"
              control={control}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography color="GrayText" variant="caption">
              Lưu ý: Họ tên, email, số điện thoại cần chính xác để nhà tuyển
              dụng liên hệ với bạn.
            </Typography>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ApplyForm;
