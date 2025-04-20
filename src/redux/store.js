/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import configReducer from './configSlice';
import authReducer from './authSlice';
import filterReducer from './filterSlice';
import profileReducer from './profileSlice';

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  config: configReducer,
  filter: filterReducer,
  profile: profileReducer,
};

export default configureStore({
  reducer: rootReducer,
});
