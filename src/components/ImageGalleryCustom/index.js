import React from 'react';

import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

const ImageGalleryCustom = (props) => {
  const { images } = props;

  return <ImageGallery showPlayButton={false} items={images} />;
};

export default ImageGalleryCustom;
