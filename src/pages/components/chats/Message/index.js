import React from 'react';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import Moment from 'react-moment';
import 'moment/locale/vi';

import { ChatContext } from '../../../../context/ChatProvider';

const Message = ({ userId, text, avatarUrl, createdAt }) => {
  const { currentAccount  } = React.useContext(ChatContext);

  return (
    <>
      {`${currentAccount?.userId}` === `${userId}` ? (
        <div className="d-flex flex-row justify-content-end">
          <div>
            <p
              className="small p-2 me-3 mb-1 text-white rounded-3"
              style={{ backgroundColor: '#441da0' }}
            >
              {text}
            </p>
            <p className="small me-3 mb-3 rounded-3 text-muted">
              <Moment fromNow>{createdAt?.seconds * 1000}</Moment>
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
        <div className="d-flex flex-row justify-content-start">
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
              className="small p-2 ms-3 mb-1 rounded-3"
              style={{ backgroundColor: '#f5f6f7' }}
            >
              {text}
            </p>
            <p className="small ms-3 mb-3 rounded-3 text-muted float-end">
              <Moment fromNow>{createdAt?.seconds * 1000}</Moment>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Message;
