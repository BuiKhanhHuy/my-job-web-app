/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import React from 'react';
import { Grid } from '@mui/material';

import { TabTitle } from '../../../utils/generalFunction';
import EmployerQuantityStatistics from '../../components/employers/EmployerQuantityStatistics';
import RecruitmentChart from '../../components/employers/charts/RecruitmentChart';
import CandidateChart from '../../components/employers/charts/CandidateChart';
import ApplicationChart from '../../components/employers/charts/ApplicationChart';
import HiringAcademicChart from '../../components/employers/charts/HiringAcademicChart';

const DashboardPage = () => {
  TabTitle("Trang quản trị Nhà tuyển dụng")

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Start: EmployerQuantityStatistics */}
          <EmployerQuantityStatistics />
          {/* End: EmployerQuantityStatistics */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: RecruitmentChart */}
          <RecruitmentChart title="BIỂU ĐỒ TUYỂN DỤNG" />
          {/* End: RecruitmentChart */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: CandidateChart */}
          <CandidateChart title="BIỂU ĐỒ ỨNG VIÊN" />
          {/* End: CandidateChart */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: ApplicationChart */}
          <ApplicationChart title="BIỂU ĐỒ TUYỂN DỤNG & ỨNG TUYỂN" />
          {/* End: ApplicationChart */}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* Start: HiringAcademicChart */}
          <HiringAcademicChart title="BIỂU ĐỒ TUYỂN DỤNG THEO CẤP BẬC" />
          {/* End: HiringAcademicChart */}
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
