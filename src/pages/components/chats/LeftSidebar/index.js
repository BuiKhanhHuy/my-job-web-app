import React from 'react';
import { Box, Skeleton, Stack, Typography } from '@mui/material';
import MuiImageCustom from '../../../../components/MuiImageCustom';

const LoadingComponentItem = () => {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Box>
        <Skeleton variant="circular" width={54} height={54} />
      </Box>
      <Stack flex={1} spacing={1}>
        <Skeleton variant="rounded" />
        <Skeleton variant="rounded" />
      </Stack>
    </Stack>
  );
};

const LeftSidebar = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Box>
      <Box sx={{ maxHeight: '85vh', overflowY: 'auto' }}>
        {false ? (
          <Stack spacing={2}>
            {Array.from(Array(12).keys()).map((value) => (
              <LoadingComponentItem key={value} />
            ))}
          </Stack>
        ) : [1].length === 0 ? (
          'Không có du lieu'
        ) : (
          <Box>
            {[1, 2, 3].map((value) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key={value.id}
                sx={{
                  p: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#ede7f6',
                  },
                }}
              >
                <Box>
                  <MuiImageCustom
                    width={54}
                    height={54}
                    sx={{
                      borderRadius: 50,
                      border: 1,
                      borderColor: '#e0e0e0',
                      p: 0.25,
                    }}
                    src={
                      'https://cdn1.vieclam24h.vn/images/default/2022/08/02/images/165941441315.jpeg'
                    }
                  />
                </Box>
                <Stack flex={1} width={'50%'}>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'pointer',
                    }}
                  >
                    {'TA Team'}
                  </span>

                  <Typography
                    variant="caption"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'pointer',
                    }}
                  >
                    {'KMS Technology Vietnam'}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

const EmployerSidebar = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <Box>
      <Box sx={{ maxHeight: '85vh', overflowY: 'auto' }}>
        {false ? (
          <Stack spacing={2}>
            {Array.from(Array(12).keys()).map((value) => (
              <LoadingComponentItem key={value} />
            ))}
          </Stack>
        ) : [1].length === 0 ? (
          'Không có du lieu'
        ) : (
          <Box>
            {[1, 2, 3].map((value) => (
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                key={value.id}
                sx={{
                  p: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#ede7f6',
                  },
                }}
              >
                <Box>
                  <MuiImageCustom
                    width={54}
                    height={54}
                    sx={{
                      borderRadius: 50,
                      border: 1,
                      borderColor: '#e0e0e0',
                      p: 0.25,
                    }}
                    src={
                      'https://res.cloudinary.com/dtnpj540t/image/upload/v1685042727/my-job/avatar/2023/5/13427.jpg'
                    }
                  />
                </Box>
                <Stack flex={1} width={'50%'}>
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: 15,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'pointer',
                    }}
                  >
                    {'Bùi Khánh Huy'}
                  </span>

                  <Typography
                    variant="caption"
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'pointer',
                    }}
                  >
                    {'khuy220@gmail.com'}
                  </Typography>
                </Stack>
              </Stack>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
};

LeftSidebar.Employer = EmployerSidebar;

export default LeftSidebar;
