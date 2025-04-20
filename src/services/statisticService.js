/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import httpRequest from '../utils/httpRequest';

const statisticService = {
  employerGeneralStatistics: () => {
    const url = 'job/web/statistics/employer-general-statistics/';

    return httpRequest.get(url);
  },
  employerRecruitmentStatisticsByRank: (data = {}) => {
    const url =
      'job/web/statistics/employer-recruitment-statistics-by-rank/';

    return httpRequest.post(url, data);
  },
  employerApplicationStatistics: (data = {}) => {
    const url = 'job/web/statistics/employer-application-statistics/';

    return httpRequest.post(url, data);
  },
  employerCandidateStatistics: (data = {}) => {
    const url = 'job/web/statistics/employer-candidate-statistics/';

    return httpRequest.post(url, data);
  },
  employerRecruitmentStatistics: (data = {}) => {
    const url = 'job/web/statistics/employer-recruitment-statistics/';

    return httpRequest.post(url, data);
  },

  jobSeekerGeneralStatistics: () => {
    const url = 'job/web/statistics/job-seeker-general-statistics/';

    return httpRequest.get(url);
  },
  jobSeekerTotalView: () => {
    const url = 'job/web/statistics/job-seeker-total-view/';

    return httpRequest.get(url);
  },
  jobSeekerActivityStatistics: () => {
    const url = 'job/web/statistics/job-seeker-activity-statistics/';

    return httpRequest.get(url);
  },
};

export default statisticService;
