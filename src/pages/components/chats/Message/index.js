import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import { ChatContext } from '../../../../context/ChatProvider';
import { formatMessageDate } from '../../../../utils/dateHelper';

const Message = ({ userId, text, avatarUrl, createdAt }) => {
  const { currentUserChat } = React.useContext(ChatContext);

  return (
    <>
      {`${currentUserChat?.userId}` === `${userId}` ? (
        <div
          className="d-flex flex-row align-self-end justify-content-end"
          style={{ maxWidth: '80%' }}
        >
          <div>
            <p
              className="small p-2 me-3 mb-1 text-white"
              style={{
                backgroundColor: '#441da0',
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                borderBottomLeftRadius: 6,
              }}
            >
              {text}
            </p>
            <p className="small me-3 mb-3 rounded-3 text-muted">
              {createdAt?.seconds
                ? formatMessageDate(createdAt?.seconds * 1000)
                : 'Đang gửi ...'}
            </p>
          </div>
          <img
            src={avatarUrl}
            alt="avatar 1"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'contain',
            }}
          />
        </div>
      ) : (
        <div
          className="d-flex flex-row justify-content-start"
          style={{
            maxWidth: '80%',
          }}
        >
          <img
            src={avatarUrl}
            alt="avatar 1"
            style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              objectFit: 'contain',
            }}
          />
          <div>
            <p
              className="small p-2 ms-3 mb-1"
              style={{
                backgroundColor: '#f5f6f7',
                borderTopLeftRadius: 6,
                borderTopRightRadius: 6,
                borderBottomRightRadius: 6,
              }}
            >
              {text}
            </p>
            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
              {createdAt?.seconds
                ? formatMessageDate(createdAt?.seconds * 1000)
                : 'Đang gửi ...'}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
