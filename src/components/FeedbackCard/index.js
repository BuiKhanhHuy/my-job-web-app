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
        p: 3,
        py: 3,
        mb: 1,
        boxShadow: (theme) => theme.customShadows.card,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.customShadows.large,
        },
      }}
    >
      <Stack sx={{ mb: 3 }} direction="row" justifyContent="center">
        <MuiImageCustom
          sx={{
            borderRadius: '50%',
            border: (theme) => `4px solid ${theme.palette.primary.light}`,
            boxShadow: (theme) => theme.customShadows.medium,
          }}
          width={120}
          height={120}
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
          color: (theme) => theme.palette.primary.main,
          mb: 2,
        }}
      >
        {fullName}
      </Typography>
      <Typography textAlign="center" sx={{ mb: 2 }}>
        <FontAwesomeIcon 
          icon={faQuoteLeft} 
          fontSize={30} 
          color={(theme) => theme.palette.warning.main}
          style={{ opacity: 0.8 }} 
        />
      </Typography>
      <Box>
        <Typography
          variant="body2"
          display="block"
          gutterBottom
          sx={{
            textAlign: 'center',
            color: (theme) => theme.palette.text.secondary,
            px: 2,
            lineHeight: 1.8,
            fontStyle: 'italic',
            height: '120px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '4',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {content}
        </Typography>
      </Box>
    </Card>
  );
};

const Loading = () => (
  <Card
    sx={{
      alignItems: 'center',
      p: 3,
      py: 3,
      mb: 1,
      boxShadow: (theme) => theme.customShadows.card,
    }}
  >
    <Skeleton
      variant="circular"
      width={120}
      height={120}
      sx={{ 
        margin: '0 auto',
        mb: 3,
        backgroundColor: (theme) => theme.palette.grey[200]
      }}
    />
    <Stack sx={{ height: 200, width: '100%' }}>
      <Skeleton 
        height={30}
        width="60%"
        sx={{ 
          margin: '0 auto',
          mb: 2,
          backgroundColor: (theme) => theme.palette.grey[200]
        }}
      />
      <Skeleton 
        height={20}
        width="40%"
        sx={{ 
          margin: '0 auto',
          mb: 3,
          backgroundColor: (theme) => theme.palette.grey[200]
        }}
      />
      <Skeleton 
        height={100}
        sx={{ 
          backgroundColor: (theme) => theme.palette.grey[200]
        }}
      />
    </Stack>
  </Card>
);

FeedbackCard.Loading = Loading;

export default FeedbackCard;
