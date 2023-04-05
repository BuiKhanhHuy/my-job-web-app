import React from 'react';
import FsLightbox from 'fslightbox-react';

const FsLightboxCustom = ({ src }) => {
 
  return <FsLightbox toggler={src} sources={[src]} />;
};

export default FsLightboxCustom;
