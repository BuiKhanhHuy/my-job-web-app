/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import { createSlice } from '@reduxjs/toolkit';

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    resume: {
      isReloadResume: false,
    },
  },
  reducers: {
    reloadResume: (state) => {
      state.resume.isReloadResume = !state.resume.isReloadResume;
    },
  },
});

const { reducer } = profileSlice;
const { reloadResume } = profileSlice.actions;

export default reducer;
export { reloadResume };
