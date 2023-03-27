import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';

import { ROLES_NAME } from '../../../../configs/constants';
import toastMessages from '../../../../utils/toastMessages';
import errorHandling from '../../../../utils/errorHandling';
import BackdropLoading from '../../../../components/loading/BackdropLoading';

import FormPopup from '../../../../components/controls/FormPopup';
import AccountForm from '../AccountForm';
import UpdatePasswordForm from '../UpdatePasswordForm';
import { updateUserInfo, removeUserInfo } from '../../../../redux/userSlice';
import authService from '../../../../services/authService';
import tokenService from '../../../../services/tokenService';
import AvatarCard from '../AvatarCard';

const AccountCard = ({ title }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState(null);

  const handleUpdateAccount = (data) => {
    dispatch(updateUserInfo(data))
      .unwrap()
      .then(() =>
        toastMessages.success('Cập nhật thông tin tài khoản thành công.')
      )
      .catch((error) => {
        errorHandling(error, setServerErrors);
      });
  };

  const handleUpdatePassword = (data) => {
    const update = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await authService.changePassword(data);

        setOpenPopup(false);
        toastMessages.success('Đổi mật khẩu thành công.');

        let path = '';
        switch (currentUser.roleName) {
          case ROLES_NAME.EMPLOYER:
            path = '/dang-nhap-nha-tuyen-dung';
            break;
          case ROLES_NAME.JOB_SEEKER:
            path = '/dang-nhap-ung-vien';
            break;
          default:
            path = '/';
        }
        const accessToken = tokenService.getAccessTokenFromCookie();
        dispatch(removeUserInfo(accessToken))
          .unwrap()
          .then(() => {
            nav(path);
          })
          .catch((err) => {
            toastMessages.error('Đã xảy ra lỗi!');
          });
      } catch (error) {
        errorHandling(error.setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    update(data);
  };

  return (
    <>
      <Box>
        <Stack>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">{title}</Typography>
            </Stack>
          </Box>
          <Divider sx={{ mt: 2, mb: 3 }} />
          <Box sx={{ px: 1 }}>
            <Grid container>
              <Grid item xs={12}>
                {/* Start: Avatar card */}
                <AvatarCard />
                {/* End: Avatar card */}
              </Grid>
              <Grid item xs={12}>
                <Box>
                  {/* Start: Account form */}
                  <AccountForm handleUpdate={handleUpdateAccount} />
                  {/* End: Account form */}
                </Box>
                <Box>
                  <Typography
                    sx={{ color: '#441da0', mt: 1.5, textAlign: 'right' }}
                    variant="subtitle2"
                    gutterBottom
                  >
                    <span
                      style={{ cursor: 'pointer' }}
                      onClick={() => setOpenPopup(true)}
                    >
                      Thay đổi mật khẩu
                    </span>
                  </Typography>
                </Box>
                <Stack sx={{ mt: 3 }} direction="row" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveOutlinedIcon />}
                    type="submit"
                    form="account-form"
                  >
                    Cập nhật
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>

      {/* Start: form  */}
      <FormPopup
        title="Cập nhật mật khẩu"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <UpdatePasswordForm
          handleUpdatePassword={handleUpdatePassword}
          serverErrors={serverErrors}
        />
      </FormPopup>
      {/* End: form */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default AccountCard;
