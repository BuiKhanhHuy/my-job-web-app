import React from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import { LoadingButton } from '@mui/lab';

const Popup = ({
  title,
  openPopup,
  setOpenPopup,
  showDialogAction = true,
  children,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openPopup}
        onClose={setOpenPopup}
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ p: 1.5 }} id="responsive-dialog-title">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5">{title}</Typography>
            <IconButton color="error" onClick={() => setOpenPopup(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
        {showDialogAction && (
          <DialogActions sx={{ py: 2 }}>
            <LoadingButton
              loading={false}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              sx={{ margin: '0 auto' }}
              type="submit"
              form="modal-form"
            >
              Lưu
            </LoadingButton>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default React.memo(Popup);
