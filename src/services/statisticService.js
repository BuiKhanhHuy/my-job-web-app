import httpRequest from '../utils/httpRequest';

const statisticService = {
  generalStatistics: () => {
    const url = 'api/job/web/statistics/general-statistics/';

    return httpRequest.get(url);
  },
  recruitmentStatisticsByRank: (data = {}) => {
    const url = 'api/job/web/statistics/recruitment-statistics-by-rank/';

    return httpRequest.post(url, data);
  },
  applicationStatistics: (data = {}) => {
    const url = 'api/job/web/statistics/application-statistics/';

    return httpRequest.post(url, data);
  },
  candidateStatistics: (data = {}) => {
    const url = 'api/job/web/statistics/candidate-statistics/';

    return httpRequest.post(url, data);
  },
  recruitmentStatistics: (data = {}) => {
    const url = 'api/job/web/statistics/recruitment-statistics/';

    return httpRequest.post(url, data);
  },
};

export default statisticService;
