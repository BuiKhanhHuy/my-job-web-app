import {
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';

import {
  FacebookShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  EmailShareButton,
  EmailIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from 'react-share';
import CloseIcon from '@mui/icons-material/Close';

const SocialNetworkSharingPopup = (props) => {
  const { setOpenPopup, open } = props;

  return (
    <Dialog onClose={() => setOpenPopup(false)} open={open}>
      <DialogTitle sx={{ p: 1.5 }} id="responsive-dialog-title">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5">Chia sẻ qua</Typography>
          <IconButton
            color="error"
            onClick={() => setOpenPopup(false)}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <List sx={{ pt: 0 }}>
        <ListItem>
          <Stack direction="row" spacing={1}>
            <FacebookShareButton
              url={'https://www.example.com'}
              quote={'Dummy text!'}
              hashtag="#muo"
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>

            <FacebookMessengerShareButton
              url={'https://www.example.com'}
              appId=""
              redirectUri=""
              to=""
            >
              <FacebookMessengerIcon size={32} round />
            </FacebookMessengerShareButton>

            <LinkedinShareButton
              url={'https://www.example.com'}
              quote={'Dummy text!'}
              hashtag="#muo"
            >
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>

            <TwitterShareButton
              url={'https://www.example.com'}
              quote={'Dummy text!'}
              hashtag="#muo"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>

            <EmailShareButton
              url={'https://www.example.com'}
              subject="Tiêu đề"
              body="Body nè!"
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
          </Stack>
        </ListItem>
      </List>
    </Dialog>
  );
};

SocialNetworkSharingPopup.propTypes = {
  setOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default SocialNetworkSharingPopup;
