import React from 'react';
import { Box, Card, Skeleton, Stack, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import MuiImageCustom from '../MuiImageCustom';

const FeedbackCard = ({ id, avatarUrl, fullName, content }) => {
  return (
    <Card
      sx={{
        alignItems: 'center',
        p: 1,
        py: 1,
        mb: 0.5,
        boxShadow: 3,
      }}
    >
      <Stack sx={{ my: 2 }} direction="row" justifyContent="center">
        <MuiImageCustom
          sx={{ borderRadius: '50%' }}
          width={110}
          height={110}
          src={avatarUrl}
        />
      </Stack>
      <Typography
        variant="h6"
        component="h6"
        gutterBottom={true}
        sx={{
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        {fullName}
      </Typography>
      <Typography textAlign="center">
        <FontAwesomeIcon icon={faQuoteLeft} fontSize={25} color="#fca34d" />
      </Typography>
      <Box>
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          sx={{ textAlign: 'justify', color: '#757575', px: 1 }}
          style={{
            height: '135px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '1',
            WebkitBoxOrient: 'horizontal',
          }}
        >
          {content }
        </Typography>
      </Box>
    </Card>
  );
};

const Loading = () => (
  <>
    <Card
      sx={{
        alignItems: 'center',
        p: 1,
        py: 1,
        mb: 0.5,
        boxShadow: 3,
      }}
    >
      <Skeleton
        variant="circular"
        width={110}
        height={110}
        style={{ margin: '0 auto' }}
      />
      <Stack sx={{ height: 200 }}>
        <Skeleton />
        <Skeleton />
        <Skeleton sx={{ flex: 1 }} />
      </Stack>
    </Card>
  </>
);

FeedbackCard.Loading = Loading;

export default FeedbackCard;
