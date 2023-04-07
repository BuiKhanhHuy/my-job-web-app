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
