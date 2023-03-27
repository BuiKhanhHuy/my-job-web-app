import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import { PacmanLoader } from 'react-spinners';

const BackdropLoading = () => {
  return (
    <div>
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: (theme) => 9999,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        }}
        open={true}
      >
        <PacmanLoader color="#fca34d" size={30} speedMultiplier={1} />
      </Backdrop>
    </div>
  );
};

export default React.memo(BackdropLoading);
