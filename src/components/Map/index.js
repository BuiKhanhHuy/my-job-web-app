import * as React from 'react';
import BingMapsReact from 'bingmaps-react';

import { AUTH_CONFIG } from '../../configs/constants';
import { Box } from '@mui/material';

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
    <Box overflow="hidden" height="250px" sx={{ borderRadius: 2 }}>
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
    </Box>
  ) : (
    <span style={{ color: '#e0e0e0', fontStyle: 'italic', fontSize: 13, padding: 20 }}>
      Chưa thể xác định vị trí trên bản đồ
    </span>
  );
};

export default Map;
