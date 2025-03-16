import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { ROUTES } from "../../../../configs/constants";
import toastMessages from "../../../../utils/toastMessages";
import errorHandling from "../../../../utils/errorHandling";
import BackdropLoading from "../../../../components/loading/BackdropLoading";

import FormPopup from "../../../../components/controls/FormPopup";
import AccountForm from "../AccountForm";
import UpdatePasswordForm from "../UpdatePasswordForm";
import { updateUserInfo, removeUserInfo } from "../../../../redux/userSlice";
import authService from "../../../../services/authService";
import tokenService from "../../../../services/tokenService";
import AvatarCard from "../AvatarCard";

const AccountCard = ({ title, sx }) => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [serverErrors, setServerErrors] = React.useState(null);

  const handleUpdateAccount = (data) => {
    dispatch(updateUserInfo(data))
      .unwrap()
      .then(() =>
        toastMessages.success("Cập nhật thông tin tài khoản thành công.")
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
        toastMessages.success("Đổi mật khẩu thành công.");

        let path = ROUTES.AUTH.LOGIN;
        const accessToken = tokenService.getAccessTokenFromCookie();
        const backend = tokenService.getProviderFromCookie();
        dispatch(removeUserInfo({ accessToken, backend }))
          .unwrap()
          .then(() => {
            nav(path);
          })
          .catch((err) => {
            toastMessages.error("Đã xảy ra lỗi!");
          });
      } catch (error) {
        errorHandling(error, setServerErrors);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    update(data);
  };

  return (
    <>
      <Box
        sx={{
          background: "#fff",
          borderRadius: 3,
          boxShadow: (theme) => theme.customShadows.card,
          p: 3,
          ...sx
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            </Stack>
          </Box>

          <Divider sx={{ my: 0, borderColor: "grey.500" }} />

          <Box sx={{ px: { xs: 0, sm: 2 } }}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <AvatarCard />
              </Grid>

              <Grid item xs={12}>
                <Box>
                  <AccountForm handleUpdate={handleUpdateAccount} />
                </Box>

                <Box>
                  <Typography
                    sx={{
                      color: "primary.main",
                      mt: 2,
                      textAlign: "right",
                      "&:hover": {
                        color: "primary.dark",
                        textDecoration: "underline",
                      },
                    }}
                    variant="subtitle2"
                  >
                    <span
                      style={{ cursor: "pointer" }}
                      onClick={() => setOpenPopup(true)}
                    >
                      Thay đổi mật khẩu
                    </span>
                  </Typography>
                </Box>

                <Stack sx={{ mt: 4 }} direction="row" justifyContent="center">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveOutlinedIcon />}
                    type="submit"
                    form="account-form"
                    sx={{
                      px: 4,
                      py: 1,
                      fontSize: "0.9rem",
                      background: (theme) => theme.palette.primary.gradient,
                      "&:hover": {
                        background: (theme) => theme.palette.primary.gradient,
                        opacity: 0.9,
                        boxShadow: (theme) => theme.customShadows.medium,
                      },
                    }}
                  >
                    Cập nhật
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Box>

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

      {isFullScreenLoading && <BackdropLoading />}
    </>
  );
};

export default AccountCard;
