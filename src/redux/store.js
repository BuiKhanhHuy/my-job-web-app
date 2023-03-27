import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import configReducer from './configSlice';
import authReducer from './authSlice';

const rootReducer = {
  auth: authReducer,
  user: userReducer,
  config: configReducer,
};

export default configureStore({
  reducer: rootReducer,
});
