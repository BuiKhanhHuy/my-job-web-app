import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Stack, TextField, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

import { ChatContext } from '../../../../context/ChatProvider';
import Message from '../Message';
import { ImageSvg14, ROLES_NAME } from '../../../../configs/constants';
import NoDataCard from '../../../../components/NoDataCard';
import useFirebaseFireStore from '../../../../hooks/useFirebaseFireStore';
import { addDocument } from '../../../../services/firebaseService';
import ChatInfo from '../../../../components/chats/ChatInfo';

const ChatWindow = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentAccount } = React.useContext(ChatContext);
  const { selectedRoom } = React.useContext(ChatContext);
  const inputRef = React.useRef(null);
  const messageListRef = React.useRef(null);
  const [inputValue, setInputValue] = React.useState('');

  console.log('TRONG CHAT WINDOW currentAccount: ', currentAccount);
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() !== '') {
      addDocument('messages', {
        text: inputValue,
        userId: `${currentAccount?.userId}`,
        roomId: selectedRoom.id,
      });

      setInputValue('');

      if (inputRef?.current) {
        setTimeout(() => {
          inputRef.current.focus();
        });
      }
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      handleOnSubmit(event);
    }
  };

  const condition = React.useMemo(
    () => ({
      fieldName: 'roomId',
      operator: '==',
      compareValue: selectedRoom.id,
    }),
    [selectedRoom.id]
  );

  const messages = useFirebaseFireStore('messages', condition, 'asc');

  React.useEffect(() => {
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [messages]);

  return (
    <Stack direction="column" justifyContent="space-around">
      {selectedRoom?.id ? (
        <Box>
          <Box sx={{ height: '80vh', overflowY: 'auto' }}>
            {messages.length === 0 ? (
              currentUser?.roleName === ROLES_NAME.JOB_SEEKER ? (
                <ChatInfo
                  avatarUrl={selectedRoom?.user?.avatarUrl}
                  title={selectedRoom?.user?.name}
                  subTitle={selectedRoom?.user?.company?.companyName}
                />
              ) : (
                <ChatInfo
                  avatarUrl={selectedRoom?.user?.avatarUrl}
                  title={selectedRoom?.user?.name}
                  subTitle={selectedRoom?.user?.email}
                />
              )
            ) : (
              <Box p={2} ref={messageListRef}>
                {messages.map((value) => (
                  <Message
                    key={value.id}
                    userId={value?.userId}
                    text={value?.text}
                    avatarUrl={
                      `${currentAccount?.userId}` === `${value?.userId}`
                        ? currentAccount?.avatarUrl
                        : selectedRoom?.user?.avatarUrl
                    }
                    createdAt={value?.createdAt}
                  />
                ))}
              </Box>
            )}
          </Box>

          <Box p={2} component="form" onSubmit={(e) => handleOnSubmit(e)}>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box flex={1}>
                <TextField
                  inputRef={inputRef}
                  fullWidth
                  placeholder={'Nhập nội dung tại đây ...'}
                  defaultValue=""
                  value={inputValue}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  multiline
                  maxRows={5}
                  variant="outlined"
                />
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SendIcon />}
                  type="submit"
                >
                  Gửi
                </Button>
              </Box>
            </Stack>
          </Box>
        </Box>
      ) : (
        <Stack justifyContent="center">
          <NoDataCard
            title="Bạn không có cuộc trò chuyện nào..."
            imgComponentSgv={<ImageSvg14 />}
          />
        </Stack>
      )}
    </Stack>
  );
};

export default ChatWindow;
