/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Stack,
  Typography,
} from '@mui/material';
import { ChromePicker } from 'react-color';
import defaultTheme from '../../themeConfigs/defaultTheme';

const DEFAULT_COLORS = [
  defaultTheme.palette.primary.main, // Purple
  '#2196f3', // Blue
  '#4caf50', // Green  
  '#f44336', // Red
  '#ff9800', // Orange
];

const ColorPickerDialog = ({ open, onClose, onColorSelect }) => {
  const [selectedColor, setSelectedColor] = React.useState(defaultTheme.palette.primary.main);
  const [showCustomPicker, setShowCustomPicker] = React.useState(false);

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setShowCustomPicker(false);
  };

  const handleCustomColorChange = (color) => {
    setSelectedColor(color.hex);
  };

  const handleConfirm = () => {
    onColorSelect(selectedColor);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle>
        Chọn màu sắc cho CV của bạn
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
              Màu sắc gợi ý
            </Typography>
            <Stack direction="row" spacing={1} justifyContent="center">
              {DEFAULT_COLORS.map((color) => (
                <Box
                  key={color}
                  onClick={() => handleColorSelect(color)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: 1,
                    bgcolor: color,
                    cursor: 'pointer',
                    border: selectedColor === color ? '3px solid' : '1px solid',
                    borderColor: selectedColor === color ? 'primary.main' : 'grey.300',
                    '&:hover': {
                      opacity: 0.8,
                    },
                  }}
                />
              ))}
              <Box
                onClick={() => setShowCustomPicker(true)}
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 1,
                  background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)',
                  cursor: 'pointer',
                  border: showCustomPicker ? '3px solid' : '1px solid',
                  borderColor: showCustomPicker ? 'primary.main' : 'grey.300',
                  '&:hover': {
                    opacity: 0.8,
                  },
                }}
              />
            </Stack>
          </Box>

          {showCustomPicker && (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <ChromePicker
                color={selectedColor}
                onChange={handleCustomColorChange}
                disableAlpha
              />
            </Box>
          )}

          <Box sx={{ 
            p: 2, 
            bgcolor: 'grey.100', 
            borderRadius: 1,
            border: '1px solid',
            borderColor: 'grey.300'
          }}>
            <Typography variant="subtitle2" gutterBottom>
              Xem trước màu đã chọn
            </Typography>
            <Box sx={{
              width: '100%',
              height: 60,
              bgcolor: selectedColor,
              borderRadius: 1,
              boxShadow: 1
            }} />
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Hủy</Button>
        <Button 
          variant="contained"
          onClick={handleConfirm}
          sx={{
            bgcolor: selectedColor,
            '&:hover': {
              bgcolor: selectedColor,
              opacity: 0.9,
            },
          }}
        >
          Xác nhận
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ColorPickerDialog; 