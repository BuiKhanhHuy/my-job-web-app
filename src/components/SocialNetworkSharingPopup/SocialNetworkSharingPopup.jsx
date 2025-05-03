/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

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
  const {
    setOpenPopup,
    open,
    facebook,
    facebookMessenger = null,
    linkedin = null,
    twitter = null,
    email = null,
  } = props;

  return (
    <Dialog 
      onClose={() => setOpenPopup(false)} 
      open={open}
      PaperProps={{
        sx: {
          width: '320px',
          borderRadius: '16px',
          boxShadow: (theme) => theme.customShadows.large,
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          p: 2.5,
          pb: 1.5,
          borderBottom: (theme) => `1px solid ${theme.palette.grey[100]}`
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" sx={{ fontWeight: 600 }}>Chia sẻ qua</Typography>
          <IconButton
            onClick={() => setOpenPopup(false)}
            size="small"
            sx={{
              color: 'grey.500',
              '&:hover': {
                color: 'error.main',
                bgcolor: 'error.background',
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </DialogTitle>

      <List sx={{ pt: 1, pb: 2, px: 1 }}>
        <ListItem>
          <Stack 
            direction="row" 
            spacing={2} 
            justifyContent="center" 
            width="100%"
          >
            {facebook && (
              <FacebookShareButton
                url={facebook?.url || ''}
                quote={facebook?.quote || ''}
                hashtag={facebook?.hashtag || ''}
              >
                <FacebookIcon 
                  size={40} 
                  round 
                  bgStyle={{
                    fill: '#1877F2'
                  }}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </FacebookShareButton>
            )}

            {facebookMessenger && (
              <FacebookMessengerShareButton
                url={facebookMessenger?.url || ''}
                appId=""
                redirectUri={facebookMessenger?.url || ''}
                to={facebookMessenger?.to || ''}
              >
                <FacebookMessengerIcon 
                  size={40} 
                  round 
                  bgStyle={{
                    fill: '#0099FF'
                  }}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </FacebookMessengerShareButton>
            )}

            {linkedin && (
              <LinkedinShareButton
                url={linkedin?.url || ''}
                title={linkedin?.title || ''}
                summary={linkedin?.summary || ''}
                source={linkedin?.source || ''}
              >
                <LinkedinIcon 
                  size={40} 
                  round 
                  bgStyle={{
                    fill: '#0A66C2'
                  }}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </LinkedinShareButton>
            )}

            {twitter && (
              <TwitterShareButton
                url={twitter?.url || ''}
                title={twitter?.title || ''}
                via={twitter?.via || ''}
                hashtags={twitter?.hashtags || []}
                related={twitter?.related || []}
              >
                <TwitterIcon 
                  size={40} 
                  round 
                  bgStyle={{
                    fill: '#1DA1F2'
                  }}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </TwitterShareButton>
            )}

            {email && (
              <EmailShareButton
                url={email?.url || ""}
                subject={email?.subject || ""}
                body={email?.body || ""}
              >
                <EmailIcon 
                  size={40} 
                  round 
                  bgStyle={{
                    fill: '#EA4335'
                  }}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'scale(1.1)'
                    }
                  }}
                />
              </EmailShareButton>
            )}
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
