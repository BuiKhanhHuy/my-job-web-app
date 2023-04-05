import * as React from 'react';
import BingMapsReact from 'bingmaps-react';

import { AUTH_CONFIG } from '../../configs/constants';

const Map = ({ title, subTitle, latitude, longitude }) => {
  const pushPin = {
    center: {
      latitude: latitude,
      longitude: longitude,
    },
    options: {
      title: title || '',
      description: subTitle || '',
    },
  };

  return latitude && longitude ? (
    <BingMapsReact
      bingMapsKey={AUTH_CONFIG.BING_MAPS_KEY}
      height="250px"
      mapOptions={{
        navigationBarMode: 'square',
      }}
      width="100%"
      viewOptions={{
        center: { latitude: latitude, longitude: longitude },
        mapTypeId: 'road',
      }}
      pushPinsWithInfoboxes={[pushPin]}
    />
  ) : (
    <span style={{ color: '#9e9e9e', fontStyle: 'italic' }}>
      Chưa thể xác định vị trí trên bản đồ
    </span>
  );
};

export default Map;
