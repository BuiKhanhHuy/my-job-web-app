import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import * as React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Box, Typography, Paper } from "@mui/material";
import { ICONS } from "../../configs/constants";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: ICONS.LOCATION_MARKER,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [56, 56],
  iconAnchor: [28, 60],
  popupAnchor: [0, -60],
  shadowSize: [41, 41]
});

const Map = ({ title, subTitle, latitude, longitude }) => {
  if (!latitude || !longitude) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          height: '250px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: 2,
          border: '1px dashed #ced4da'
        }}
      >
        <Typography 
          sx={{ 
            color: '#9e9e9e', 
            fontStyle: 'italic', 
            fontSize: '0.875rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          <LocationOnIcon fontSize="small" />
          Chưa thể xác định vị trí trên bản đồ
        </Typography>
      </Box>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        overflow: "hidden", 
        height: "250px", 
        borderRadius: 2,
      }}
    >
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]}>
          <Popup>
            <Typography variant="subtitle2" fontWeight="bold">{title}</Typography>
            <Typography variant="body2">{subTitle}</Typography>
          </Popup>
        </Marker>
      </MapContainer>
    </Paper>
  );
};

export default Map;
