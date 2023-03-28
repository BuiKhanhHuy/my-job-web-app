import httpRequest from '../utils/httpRequest';

const myjobService = {
  getFeedbacks: () => {
    const url = '/api/myjob/web/feedbacks/';

    return httpRequest.get(url);
  },
};

export default myjobService;
