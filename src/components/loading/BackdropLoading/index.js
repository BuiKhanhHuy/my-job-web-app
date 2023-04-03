import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { HashLoader } from 'react-spinners';

const BackdropLoading = ({ bgColor = 'rgba(0, 0, 0, 0.4)' }) => {
  return (
    <div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => 9999,
          backgroundColor: bgColor,
        }}
        open={true}
      >
        <HashLoader color="#fca34d" size={100} speedMultiplier={2} />
      </Backdrop>
    </div>
  );
};

export default React.memo(BackdropLoading);
