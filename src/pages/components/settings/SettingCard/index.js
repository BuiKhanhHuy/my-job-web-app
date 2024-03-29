import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import SettingForm from '../SettingForm';
import authService from '../../../../services/authService';
import toastMessages from '../../../../utils/toastMessages';

const Loading = (
  <Grid container>
    <Grid item xs={12}>
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Skeleton height={35} />
          </Grid>
          <Grid item xs={12}>
            <Skeleton height={35} />
          </Grid>
        </Grid>
      </Box>
      <Stack sx={{ mt: 3 }} direction="row" justifyContent="center">
        <Skeleton height={60} width={120} />
      </Stack>
    </Grid>
  </Grid>
);

const SettingCard = ({ title }) => {
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
        toastMessages.success('Cập nhật setting thành công.');
      } catch (error) {
        toastMessages.error('Cập nhật setting thất bại.');
      }
    };

    updateSetting(data);
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
            {isLoadingSettings ? (
              Loading
            ) : (
              <Grid container>
                <Grid item xs={12}>
                  <Box>
                    {/* Start: Setting form */}
                    <SettingForm
                      editData={editData}
                      handleUpdate={handleUpdateUserSetting}
                    />
                    {/* End: Setting form */}
                  </Box>
                  <Stack sx={{ mt: 3 }} direction="row" justifyContent="center">
                    <Button
                      variant="contained"
                      color="primary"
                      startIcon={<SaveOutlinedIcon />}
                      type="submit"
                      form="setting-form"
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
    </>
  );
};

export default SettingCard;
