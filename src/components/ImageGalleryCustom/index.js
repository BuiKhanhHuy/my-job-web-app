import React from 'react';

import 'react-image-gallery/styles/css/image-gallery.css';
import ImageGallery from 'react-image-gallery';

const images = [
  {
    original:
      'https://images.unsplash.com/photo-1678034845441-2c1d777a14f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    thumbnail:
      'https://images.unsplash.com/photo-1678034845441-2c1d777a14f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    original:
      'https://images.unsplash.com/photo-1678101576346-a11386e6e128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
    thumbnail:
      'https://images.unsplash.com/photo-1678101576346-a11386e6e128?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
  },
  {
    original:
      'https://images.unsplash.com/photo-1678048632412-f18bbbd3662a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
    thumbnail:
      'https://images.unsplash.com/photo-1678048632412-f18bbbd3662a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
  },
];

const ImageGalleryCustom = () => {
  return <ImageGallery showPlayButton={false} items={images} />;
};

export default ImageGalleryCustom;
