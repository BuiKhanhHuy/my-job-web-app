import httpRequest from '../utils/httpRequest';

const statisticService = {
  recruitmentStatisticsByRank: (data = {}) => {
    const url = 'api/job/web/statistics/recruitment-statistics-by-rank/';

    return httpRequest.post(url, data);
  },
};

export default statisticService;
