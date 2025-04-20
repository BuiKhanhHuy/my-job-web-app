/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAllowVerifyEmail: false,
    email: '',
    roleName: '',
  },
  reducers: {
    updateVerifyEmail: (state, action) => {
      state.isAllowVerifyEmail = action.payload?.isAllowVerifyEmail;
      state.email = action.payload?.email;
      state.roleName = action.payload?.roleName;
    },
  },
});

const { actions, reducer } = authSlice;
const { updateVerifyEmail } = actions;

export default reducer;
export { updateVerifyEmail };
