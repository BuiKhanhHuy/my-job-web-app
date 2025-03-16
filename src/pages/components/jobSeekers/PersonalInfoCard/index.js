import React from "react";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import {
  Box,
  Divider,
  Fab,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

import NoDataCard from "../../../../components/NoDataCard";
import toastMessages from "../../../../utils/toastMessages";
import errorHandling from "../../../../utils/errorHandling";
import BackdropLoading from "../../../../components/loading/BackdropLoading";
import FormPopup from "../../../../components/controls/FormPopup";
import PersonalProfileForm from "../PersonalProfileForm";

import jobSeekerProfileService from "../../../../services/jobSeekerProfileService";
import { getUserInfo } from "../../../../redux/userSlice";

const Loading = (
  <>
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Typography variant="h6" flex={1}>
          <Skeleton />
        </Typography>
        <Box>
          <Skeleton variant="circular" width={50} height={50} />
        </Box>
      </Stack>
    </Box>
    <Box sx={{ px: 1 }}>
      <Box sx={{ py: 2 }}>
        <Skeleton height={5} />
      </Box>
      <Grid container spacing={4}>
        <Grid item xs={6}>
          {Array(8)
            .fill(0)
            .map((item, index) => (
              <Typography component="div" variant="h5" key={index}>
                <Skeleton />
              </Typography>
            ))}
        </Grid>
        <Grid item xs={6}>
          {Array(8)
            .fill(0)
            .map((item, index) => (
              <Typography component="div" variant="h5" key={index}>
                <Skeleton />
              </Typography>
            ))}
        </Grid>
      </Grid>
    </Box>
  </>
);

const item = (title, value) => {
  return (
    <Box
      sx={{
        p: 1,
        backgroundColor: "background.paper",
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: "primary.main",
          fontSize: "0.875rem",
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          color: value ? "text.primary" : "text.disabled",
          fontStyle: value ? "normal" : "italic",
          fontSize: value ? "1rem" : "0.875rem",
        }}
      >
        {value || "Chưa cập nhật"}
      </Typography>
    </Box>
  );
};

const PersonalInfoCard = ({ title }) => {
  const dispatch = useDispatch();
  const { allConfig } = useSelector((state) => state.config);
  const [openPopup, setOpenPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isLoadingProfile, setIsLoadingProfile] = React.useState(true);
  const [isFullScreenLoading, setIsFullScreenLoading] = React.useState(false);
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    const getProfile = async () => {
      setIsLoadingProfile(true);

      try {
        const resData = await jobSeekerProfileService.getProfile();

        setProfile(resData.data);
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    getProfile();
  }, [isSuccess]);

  const handleUpdateProfile = (data) => {
    const updateProfile = async (data) => {
      setIsFullScreenLoading(true);
      try {
        await jobSeekerProfileService.updateProfile(data);

        dispatch(getUserInfo());
        setIsSuccess(!isSuccess);
        setOpenPopup(false);
        toastMessages.success("Cập nhật thông tin cá nhân thành công.");
      } catch (error) {
        errorHandling(error);
      } finally {
        setIsFullScreenLoading(false);
      }
    };

    updateProfile(data);
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderRadius: 3,
          p: 3,
          boxShadow: (theme) => theme.customShadows.card,
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
              {profile && (
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="edit"
                  onClick={() => setOpenPopup(true)}
                  sx={{
                    boxShadow: (theme) => theme.customShadows.medium,
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <EditIcon />
                </Fab>
              )}
            </Stack>
          </Box>
          <Divider sx={{ my: 0, borderColor: 'grey.500' }}/>
          {isLoadingProfile ? (
            Loading
          ) : profile === null ? (
            <NoDataCard />
          ) : (
            <Stack sx={{ px: 1 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                  <Stack spacing={1.5}>
                    {item("Họ và tên", profile?.user?.fullName)}
                    {item("Số điện thoại", profile?.phone)}
                    {item("Giới tính", allConfig.genderDict[profile?.gender])}
                    {item(
                      "Ngày sinh",
                      profile?.birthday
                        ? dayjs(profile.birthday).format("DD/MM/YYYY")
                        : profile?.birthday
                    )}
                    {item(
                      "Tình trạng hôn nhân",
                      allConfig.maritalStatusDict[profile?.maritalStatus]
                    )}
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={6} md={8} lg={8} xl={8}>
                  <Stack spacing={1.5}>
                    {item(
                      "Tỉnh/Thành phố",
                      allConfig.cityDict[profile?.location?.city]
                    )}
                    {item("Quận/Huyện", profile?.location?.districtDict?.name)}
                    {item("Địa chỉ", profile?.location?.address)}
                  </Stack>
                </Grid>
              </Grid>
            </Stack>
          )}
        </Stack>
      </Box>

      {/* Start: form  */}
      <FormPopup
        title="Thông tin cá nhân"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <PersonalProfileForm
          handleUpdateProfile={handleUpdateProfile}
          editData={profile}
        />
      </FormPopup>
      {/* End: form */}

      {/* Start: full screen loading */}
      {isFullScreenLoading && <BackdropLoading />}
      {/* End: full screen loading */}
    </>
  );
};

export default PersonalInfoCard;
