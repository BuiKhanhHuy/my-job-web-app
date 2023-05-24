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
