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
  buttonText = 'Lưu',
  buttonIcon = <SaveIcon />,
  children,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        aria-labelledby="responsive-dialog-title"
        maxWidth="md"
        fullWidth
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: '16px',
            boxShadow: theme.customShadows.card,
            border: `1px solid ${theme.palette.grey[100]}`,
            overflow: 'hidden'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            p: 2.5,
            background: theme.palette.grey[50]
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography 
              variant="h5"
              sx={{
                color: theme.palette.grey[900],
                fontWeight: 600
              }}
            >
              {title}
            </Typography>
            <IconButton
              onClick={() => setOpenPopup(false)}
              sx={{
                color: theme.palette.grey[500],
                '&:hover': {
                  backgroundColor: theme.palette.grey[100]
                }
              }}
            >
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>

        <Divider />

        <DialogContent sx={{ p: 3 }}>
          {children}
        </DialogContent>

        {showDialogAction && (
          <DialogActions 
            sx={{ 
              py: 2.5,
              px: 3,
              background: theme.palette.grey[50]
            }}
          >
            <LoadingButton
              loading={false}
              loadingPosition="start"
              startIcon={buttonIcon}
              variant="contained"
              sx={{
                margin: '0 auto',
                minWidth: 120,
                background: theme.palette.primary.gradient,
                '&:hover': {
                  background: theme.palette.primary.gradient,
                  opacity: 0.9,
                  boxShadow: theme.customShadows.medium
                }
              }}
              type="submit"
              form="modal-form"
            >
              {buttonText}
            </LoadingButton>
          </DialogActions>
        )}
      </Dialog>
    </div>
  );
};

export default React.memo(Popup);
