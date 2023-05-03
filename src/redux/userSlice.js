import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import authService from '../services/authService';
import tokenService from '../services/tokenService';

const getUserInfo = createAsyncThunk(
  'user/getUserInfo',
  async (_, thunkAPI) => {
    try {
      const resData = await authService.getUserInfo();

      return resData.data;
    } catch (error) {
      throw error;
    }
  }
);

const updateUserInfo = createAsyncThunk(
  'user/updateUser',
  async (data, thunkAPI) => {
    try {
      const resData = await authService.updateUser(data);

      return resData.data;
    } catch (error) {
      throw error;
    }
  }
);

const removeUserInfo = createAsyncThunk(
  'user/removeUserInfo',
  async (accessToken, thunkAPI) => {
    try {
      await authService.revokToken(accessToken);

      const removeResult =
        tokenService.removeAccessTokenAndRefreshTokenFromCookie();

      if (!removeResult) {
        return Promise.reject("Can't remove token in Cookie");
      }
    } catch (error) {
      throw error;
    }
  }
);

const updateAvatar = createAsyncThunk(
  'user/updateAvatar',
  async (formData, thunkAPI) => {
    try {
      const resData = await authService.updateAvatar(formData);

      return resData.data;
    } catch (error) {
      throw error;
    }
  }
);

const deleteAvatar = createAsyncThunk(
  'user/deleteAvatar',
  async (_, thunkAPI) => {
    try {
      const resData = await authService.deleteAvatar();

      return resData.data;
    } catch (error) {
      throw error;
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticated: false,
    currentUser: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserInfo.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    });

    builder.addCase(updateUserInfo.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    });

    builder.addCase(removeUserInfo.fulfilled, (state) => {
      state.isAuthenticated = false;
      state.currentUser = null;
    });

    builder.addCase(updateAvatar.fulfilled, (state, action) => {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          avatarUrl: action.payload?.avatarUrl || null,
        },
      };
    });

    builder.addCase(deleteAvatar.fulfilled, (state, action) => {
      state.currentUser = {
        ...state.currentUser,
        avatarUrl: action.payload?.avatarUrl || null,
      };
    });
  },
});

const { reducer } = userSlice;

export default reducer;
export {
  getUserInfo,
  updateUserInfo,
  removeUserInfo,
  updateAvatar,
  deleteAvatar,
};
