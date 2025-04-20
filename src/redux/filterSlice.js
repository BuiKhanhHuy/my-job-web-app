/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

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
    searchJobPostWithKeyword: (state, action) => {
      state.jobPostFilter = {
        kw: action?.payload?.kw,
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
  searchJobPostWithKeyword,
  resetSearchJobPostFilter,
  searchCompany,
  resetSearchCompany,
  searchResume,
  resetSearchResume,
} = userSlice.actions;

export default reducer;
export {
  searchJobPost,
  searchJobPostWithKeyword,
  resetSearchJobPostFilter,
  searchCompany,
  resetSearchCompany,
  searchResume,
  resetSearchResume,
};
