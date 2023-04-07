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
