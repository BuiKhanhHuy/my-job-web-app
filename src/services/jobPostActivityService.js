import httpRequest from '../utils/httpRequest';

const jobPostActivityService = {
  // job seeker
  applyJob: (data) => {
    const url = '/api/job/web/job-seeker-job-posts-activity/';

    return httpRequest.post(url, data);
  },
  getJobPostActivity: (params = {}) => {
    const url = '/api/job/web/job-seeker-job-posts-activity/';

    return httpRequest.get(url, { params: params });
  },

  // employer
  getAppliedResume: (params = {}) => {
    const url = '/api/job/web/employer-job-posts-activity/';

    return httpRequest.get(url, { params: params });
  },
  exportAppliedResume: (params = {}) => {
    const url = '/api/job/web/employer-job-posts-activity/export/';

    return httpRequest.get(url, { params: params });
  },
};

export default jobPostActivityService;
