/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import Image from 'mui-image';

const MuiImageCustom = (props) => {
  return (
    <Image
      fit="contain"
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

export default React.memo(MuiImageCustom);
