import React from 'react';

const SvgIcon = ({ src, ...props }) => {
  return (
    <div style={{ display: 'inline-block' }} {...props}>
      <img src={src} alt="" style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default SvgIcon; 