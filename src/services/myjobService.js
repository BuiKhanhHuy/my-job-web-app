import httpRequest from '../utils/httpRequest';

const myjobService = {
  getFeedbacks: () => {
    const url = '/api/myjob/web/feedbacks/';

    return httpRequest.get(url);
  },
  createFeedback: (data) => {
    const url = '/api/myjob/web/feedbacks/';

    return httpRequest.post(url, data);
  },
  sendSMSDownloadApp: (data) => {
    const url = '/api/myjob/web/sms-download-app/';

    return httpRequest.post(url, data);
  },
  getBanners: (params = {}) => {
    const url = '/api/myjob/web/banner/';

    return httpRequest.get(url, { params: params });
  },
};

export default myjobService;
