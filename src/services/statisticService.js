import httpRequest from '../utils/httpRequest';

const statisticService = {
  employerGeneralStatistics: () => {
    const url = 'api/job/web/statistics/employer-general-statistics/';

    return httpRequest.get(url);
  },
  employerRecruitmentStatisticsByRank: (data = {}) => {
    const url =
      'api/job/web/statistics/employer-recruitment-statistics-by-rank/';

    return httpRequest.post(url, data);
  },
  employerApplicationStatistics: (data = {}) => {
    const url = 'api/job/web/statistics/employer-application-statistics/';

    return httpRequest.post(url, data);
  },
  employerCandidateStatistics: (data = {}) => {
    const url = 'api/job/web/statistics/employer-candidate-statistics/';

    return httpRequest.post(url, data);
  },
  employerRecruitmentStatistics: (data = {}) => {
    const url = 'api/job/web/statistics/employer-recruitment-statistics/';

    return httpRequest.post(url, data);
  },

  jobSeekerGeneralStatistics: () => {
    const url = 'api/job/web/statistics/job-seeker-general-statistics/';

    return httpRequest.get(url);
  },
  jobSeekerTotalView: () => {
    const url = 'api/job/web/statistics/job-seeker-total-view/';

    return httpRequest.get(url);
  },
  jobSeekerActivityStatistics: () => {
    const url = 'api/job/web/statistics/job-seeker-activity-statistics/';

    return httpRequest.get(url);
  },
};

export default statisticService;
