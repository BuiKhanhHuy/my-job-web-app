import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import SettingForm from "../SettingForm";
import authService from "../../../../services/authService";
import toastMessages from "../../../../utils/toastMessages";

const Loading = (
  <Grid container spacing={2}>
    <Grid item xs={12}>
      <Box sx={{ p: 2, borderRadius: 2, bgcolor: "background.paper" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Skeleton height={48} sx={{ borderRadius: 1 }} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height={48} sx={{ borderRadius: 1 }} />
          </Grid>
        </Grid>
      </Box>
      <Stack sx={{ mt: 4 }} direction="row" justifyContent="center">
        <Skeleton height={48} width={160} sx={{ borderRadius: 3 }} />
      </Stack>
    </Grid>
  </Grid>
);

const SettingCard = ({ title, sx }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [isLoadingSettings, setIsLoadingSettings] = React.useState(true);
  const [editData, setEditData] = React.useState(null);

  React.useEffect(() => {
    const loadCertificates = async () => {
      setIsLoadingSettings(true);
      try {
        const resData = await authService.getUserSettings();

        setEditData(resData.data);
      } catch (error) {
      } finally {
        setIsLoadingSettings(false);
      }
    };

    loadCertificates();
  }, [currentUser]);

  const handleUpdateUserSetting = (data) => {
    const updateSetting = async (data) => {
      try {
        const resData = await authService.updateUserSettings(data);

        setEditData(resData.data);
        toastMessages.success("Cập nhật setting thành công.");
      } catch (error) {
        toastMessages.error("Cập nhật setting thất bại.");
      }
    };

    updateSetting(data);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: (theme) => theme.customShadows.card,
        p: 3,
        ...sx,
      }}
    >
      <Stack spacing={3}>
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
              }}
            >
              {title}
            </Typography>
          </Stack>
          <Divider sx={{ mt: 3, borderColor: "grey.500" }} />
        </Box>

        <Box>
          {isLoadingSettings ? (
            Loading
          ) : (
            <Grid container>
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: { xs: 0, sm: 2 },
                    borderRadius: 2,
                  }}
                >
                  <SettingForm
                    editData={editData}
                    handleUpdate={handleUpdateUserSetting}
                  />
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
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default SettingCard;
