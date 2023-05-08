import React from 'react';
import { Grid } from '@mui/material';

import EmployerQuantityStatistics from '../../components/employers/EmployerQuantityStatistics';
import RecruitmentChart from '../../components/employers/charts/RecruitmentChart';
import CandidateChart from '../../components/employers/charts/CandidateChart';
import ApplicationChart from '../../components/employers/charts/ApplicationChart';
import HiringAcademicChart from '../../components/employers/charts/HiringAcademicChart';

const DashboardPage = () => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {/* Start: EmployerQuantityStatistics */}
          <EmployerQuantityStatistics />
          {/* End: EmployerQuantityStatistics */}
        </Grid>
        <Grid item xs={6}>
          {/* Start: RecruitmentChart */}
          <RecruitmentChart title="BIỂU ĐỒ TUYỂN DỤNG" />
          {/* End: RecruitmentChart */}
        </Grid>
        <Grid item xs={6}>
          {/* Start: CandidateChart */}
          <CandidateChart title="BIỂU ĐỒ ỨNG VIÊN" />
          {/* End: CandidateChart */}
        </Grid>
        <Grid item xs={6}>
          {/* Start: ApplicationChart */}
          <ApplicationChart title="BIỂU ĐỒ TUYỂN DỤNG & ỨNG TUYỂN" />
          {/* End: ApplicationChart */}
        </Grid>
        <Grid item xs={6}>
          {/* Start: HiringAcademicChart */}
          <HiringAcademicChart title="BIỂU ĐỒ TUYỂN DỤNG THEO CẤP BẬC" />
          {/* End: HiringAcademicChart */}
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardPage;
