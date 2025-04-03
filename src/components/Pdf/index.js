import React from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { zoomPlugin } from '@react-pdf-viewer/zoom';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import '@react-pdf-viewer/zoom/lib/styles/index.css';
import { SpecialZoomLevel } from '@react-pdf-viewer/core';
import Button from '@mui/material/Button';
import { Box, Chip, Grid, IconButton, Stack } from '@mui/material';
import ZoomOutOutlinedIcon from '@mui/icons-material/ZoomOutOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import toSlug from '../../utils/customData';

const Pdf = ({ fileUrl, title = '' }) => {
  const zoomPluginInstance = zoomPlugin();
  const getFilePluginInstance = getFilePlugin({
    fileNameGenerator: (file) => {
      return `MyJob_CV-${toSlug(title)}`;
    },
  });

  const { Download } = getFilePluginInstance;
  const { ZoomIn, ZoomOut, Zoom } = zoomPluginInstance;

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Stack
        spacing={2}
        sx={{ border: 1, borderColor: '#e0e0e0', borderRadius: 2 }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{
            bgcolor: '#441da0',
            p: 2,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          }}
        >
          <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <ZoomOut>
                  {(props) => (
                    <IconButton
                      aria-label="zoom-out"
                      color="warning"
                      onClick={props.onClick}
                    >
                      <ZoomOutOutlinedIcon />
                    </IconButton>
                  )}
                </ZoomOut>
                <Zoom>
                  {(props) => (
                    <Chip
                      sx={{ color: 'white' }}
                      size="small"
                      onClick={() => props.onZoom(SpecialZoomLevel.ActualSize)}
                      label="Kích thước chuẩn của tệp"
                      color="warning"
                    />
                  )}
                </Zoom>
                <ZoomIn>
                  {(props) => (
                    <IconButton
                      aria-label="zoom-in"
                      color="warning"
                      onClick={props.onClick}
                    >
                      <ZoomInOutlinedIcon />
                    </IconButton>
                  )}
                </ZoomIn>
              </Stack>
            </Grid>
            <Grid item xs={4}>
              <Stack direction="row" justifyContent="flex-end">
                <Download>
                  {(props) => (
                    <Button
                      sx={{
                        boxShadow: (theme) => theme.customShadows.medium,
                        color: 'white',
                        textTransform: 'inherit',
                        '&:hover': {
                          transform: 'scale(1.03)',
                        },
                        transition: 'all 0.2s ease-in-out',
                      }}
                      variant="contained"
                      color="warning"
                      onClick={props.onClick}
                      startIcon={<FileDownloadIcon />}
                    >
                      Tải xuống
                    </Button>
                  )}
                </Download>
              </Stack>
            </Grid>
          </Grid>
        </Stack>
        <Box sx={{ height: '100%', maxHeight: 800, overflowY: 'auto' }}>
          <Viewer
            fileUrl={fileUrl}
            plugins={[zoomPluginInstance, getFilePluginInstance]}
            defaultScale={1.2}
          />
        </Box>
      </Stack>
    </Worker>
  );
};

export default Pdf;
