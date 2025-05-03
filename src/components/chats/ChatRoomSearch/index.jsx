/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { TextField } from '@mui/material';

const ChatRoomSearch = ({ value, setValue, placeholder }) => {
  return (
    <TextField
      fullWidth
      id="filled-search"
      type="search"
      variant="outlined"
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default ChatRoomSearch;
