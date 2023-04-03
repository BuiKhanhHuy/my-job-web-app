import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'filter',
  initialState: {
    jobPostFilter: {
      kw: '',
      careerId: '',
      cityId: '',
      positionId: '',
      experienceId: '',
      typeOfWorkplaceId: '',
      jobTypeId: '',
      genderId: '',
      page: 1,
      pageSize: 30,
    },
    companyFilter: {
      kw: '',
      cityId: '',
      page: 1,
      pageSize: 12,
    },
    resumeFilter: {
      kw: '',
      cityId: '',
      careerId: '',
      experienceId: '',
      positionId: '',
      academicLevelId: '',
      typeOfWorkplaceId: '',
      jobTypeId: '',
      genderId: '',
      maritalStatusId: '',
      page: 1,
      pageSize: 10,
    },
  },
  reducers: {
    searchJobPost: (state, action) => {
      state.jobPostFilter = action.payload;
    },
    resetSearchJobPostFilter: (state) => {
      state.jobPostFilter = {
        kw: '',
        careerId: '',
        cityId: '',
        positionId: '',
        experienceId: '',
        typeOfWorkplaceId: '',
        jobTypeId: '',
        genderId: '',
        page: 1,
        pageSize: 30,
      };
    },
    searchCompany: (state, action) => {
      state.companyFilter = action.payload;
    },
    resetSearchCompany: (state) => {
      state.companyFilter = {
        kw: '',
        cityId: '',
        page: 1,
        pageSize: 12,
      };
    },
    searchResume: (state, action) => {
      state.resumeFilter = action.payload;
    },
    resetSearchResume: (state) => {
      state.resumeFilter = {
        kw: '',
        cityId: '',
        careerId: '',
        experienceId: '',
        positionId: '',
        academicLevelId: '',
        typeOfWorkplaceId: '',
        jobTypeId: '',
        genderId: '',
        maritalStatusId: '',
        page: 1,
        pageSize: 10,
      };
    },
  },
});

const { reducer } = userSlice;
const {
  searchJobPost,
  resetSearchJobPostFilter,
  searchCompany,
  resetSearchCompany,
  searchResume,
  resetSearchResume
} = userSlice.actions;

export default reducer;
export {
  searchJobPost,
  resetSearchJobPostFilter,
  searchCompany,
  resetSearchCompany,
  searchResume,
  resetSearchResume
};
