import '@goongmaps/goong-js/dist/goong-js.css';
import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from '@goongmaps/goong-map-react';

const CompanyImageCard = ({ title }) => {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 13,
  });

  return (
    <>
      <ReactMapGL
        {...viewport}
        
        goongApiAccessToken="q2ehn14wfdLdZkDXejl5d1X6pBxZf0ssca6jrEOo"
        mapStyle="https://tiles.goong.io/assets/goong_map_web.json"
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
      />{' '}
    </>
  );
  // return (
  // <Box>
  //   <Stack>
  //     <Box>
  //       <Stack
  //         direction="row"
  //         justifyContent="space-between"
  //         alignItems="center"
  //       >
  //         <Typography variant="h6">{title}</Typography>
  //         <Fab
  //           size="small"
  //           color="primary"
  //           aria-label="edit"
  //           // onClick={handleShowAdd}
  //         >
  //           {/* <AddIcon sx={{ color: 'white', fontSize: 30 }} /> */}
  //         </Fab>
  //       </Stack>
  //     </Box>
  //     <Divider sx={{ mt: 2, mb: 3 }} />
  //     <Box sx={{ px: 1 }}></Box>
  //   </Stack>
  // </Box>
  // );
};

export default CompanyImageCard;
