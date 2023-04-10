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
};

export default myjobService;
