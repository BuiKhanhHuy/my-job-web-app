import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { HashLoader } from 'react-spinners';

const BackdropLoading = ({ bgColor = 'rgba(0, 0, 0, 0.4)' }) => {
  return (
    <Backdrop
      sx={{
        color: '#fff',
        backgroundColor: bgColor,
        position: 'fixed',
      }}
      style={{
        zIndex: 9999,
      }}
      open={true}
    >
      <HashLoader color="#fca34d" size={100} speedMultiplier={2} />
    </Backdrop>
  );
};

export default React.memo(BackdropLoading);
