import React from 'react';
import Image from 'mui-image';

const MuiImageCustom = (props) => {
  return (
    <Image
      fit="cover"
      duration={500}
      easing="ease-in"
      showLoading={false}
      errorIcon={true}
      shift={null}
      distance="100px"
      shiftDuration={600}
      {...props}
    />
  );
};

export default MuiImageCustom;
