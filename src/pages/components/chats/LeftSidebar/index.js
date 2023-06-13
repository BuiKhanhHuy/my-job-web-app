import React from 'react';
import { Box, Button, Skeleton, Stack, Typography } from '@mui/material';

import { ChatContext } from '../../../../context/ChatProvider';
import MuiImageCustom from '../../../../components/MuiImageCustom';
import ChatRoomSearch from '../../../../components/chats/ChatRoomSearch';
import { useDebounce } from '../../../../hooks';

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
  const { chatRooms, setSelectedRoomId } = React.useContext(ChatContext);
  // const [isLoading, setIsLoading] = React.useState(true);
  const [searchText, setSearchText] = React.useState('');

  const deboundedTextValue = useDebounce(searchText, 500);

  const handleSelectRoom = (chatRoomId) => {
    setSelectedRoomId(chatRoomId);
  };

  React.useEffect(() => {
    console.log('==> Bắn API Search: ', deboundedTextValue);
  }, [deboundedTextValue]);

  return (
    <Box>
      <Stack spacing={2}>
        <Box>
          <ChatRoomSearch
            value={searchText}
            setValue={setSearchText}
            placeholder="Tên công ty, tên nhà tuyển dụng, ..."
          />
        </Box>
        <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {false ? (
            <Stack spacing={2}>
              {Array.from(Array(12).keys()).map((value) => (
                <LoadingComponentItem key={value} />
              ))}
            </Stack>
          ) : chatRooms.length === 0 ? (
            <Typography variant="caption">
              Chưa có cuộc trò chuyện nào
            </Typography>
          ) : (
            <Stack spacing={1}>
              <Box>
                {chatRooms.map((value) => (
                  <Stack
                    onClick={() => handleSelectRoom(value.id)}
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
                        src={`${value?.user?.avatarUrl}`}
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
                        {`${value?.user?.name}`}
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
                        {`${value?.user?.company?.companyName}` || '---'}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Box>
              {/* <Stack direction="row" justifyContent="center" mt={1}>
                <Button
                  color="primary"
                  variant="outlined"
                  sx={{ textTransform: 'inherit' }}
                  size="small"
                >
                  Xem thêm
                </Button>
              </Stack> */}
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

const EmployerSidebar = () => {
  const { chatRooms, setSelectedRoomId } = React.useContext(ChatContext);
  const [searchText, setSearchText] = React.useState('');

  const deboundedTextValue = useDebounce(searchText, 500);

  const handleSelectRoom = (chatRoomId) => {
    setSelectedRoomId(chatRoomId);
  };

  React.useEffect(() => {
    console.log('==> Bắn API Search: ', deboundedTextValue);
  }, [deboundedTextValue]);

  return (
    <Box>
      <Stack spacing={2}>
        <Box>
          <ChatRoomSearch
            value={searchText}
            setValue={setSearchText}
            placeholder="Họ tên ứng viên ..."
          />
        </Box>
        <Box sx={{ maxHeight: '80vh', overflowY: 'auto' }}>
          {false ? (
            <Stack spacing={2}>
              {Array.from(Array(12).keys()).map((value) => (
                <LoadingComponentItem key={value} />
              ))}
            </Stack>
          ) : chatRooms.length === 0 ? (
            <Typography variant="caption">
              Chưa có cuộc trò chuyện nào
            </Typography>
          ) : (
            <Stack spacing={1}>
              <Box>
                {chatRooms.map((value) => (
                  <Stack
                    onClick={() => handleSelectRoom(value.id)}
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
                        src={`${value?.user?.avatarUrl}`}
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
                        {`${value?.user?.name}` || '---'}
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
                        {`${value?.user?.email}` || '---'}
                      </Typography>
                    </Stack>
                  </Stack>
                ))}
              </Box>
              {/* <Stack direction="row" justifyContent="center" mt={1}>
                <Button
                  color="primary"
                  variant="outlined"
                  sx={{ textTransform: 'inherit' }}
                  size="small"
                >
                  Xem thêm
                </Button>
              </Stack> */}
            </Stack>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

LeftSidebar.Employer = EmployerSidebar;

export default LeftSidebar;
