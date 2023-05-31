import React from 'react';
import { useSelector } from 'react-redux';

import useFirebaseFireStore from '../hooks/useFirebaseFireStore';

export const ChatContext = React.createContext();

const ChatProvider = ({ children }) => {
  const { isAuthenticated, currentUser } = useSelector((state) => state.user);
  const { id: userId } = currentUser;
  const [selectedRoomId, setSelectedRoomId] = React.useState('');

  const chatRoomsCondition = React.useMemo(() => {
    return {
      fieldName: 'members',
      operator: 'array-contains',
      compareValue: userId,
    };
  }, [userId]);
 
  const chatRooms = useFirebaseFireStore('chatRooms', chatRoomsCondition);

  return (
    <ChatContext.Provider
      value={{
        chatRooms: chatRooms,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export default ChatProvider;
