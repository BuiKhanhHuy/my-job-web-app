import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';

const Map = () => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      goongApiAccessToken="q2ehn14wfdLdZkDXejl5d1X6pBxZf0ssca6jrEOo"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
};

export default Map;
