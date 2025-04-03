import httpRequest from '../utils/httpRequest';

const jobPostActivityService = {
  // job seeker
  applyJob: (data) => {
    const url = 'job/web/job-seeker-job-posts-activity/';

    return httpRequest.post(url, data);
  },
  getJobPostActivity: (params = {}) => {
    const url = 'job/web/job-seeker-job-posts-activity/';

    return httpRequest.get(url, { params: params });
  },
  getJobPostChatActivity: (params = {}) => {
    const url = 'job/web/job-seeker-job-posts-activity/chat/';

    return httpRequest.get(url, { params: params });
  },

  // employer
  sendEmail: (id, data) => {
    const url = `job/web/employer-job-posts-activity/${id}/send-email/`;

    return httpRequest.post(url, data);
  },
  getAppliedResume: (params = {}) => {
    const url = 'job/web/employer-job-posts-activity/';

    return httpRequest.get(url, { params: params });
  },
  getAppliedResumeChat: (params = {}) => {
    const url = 'job/web/employer-job-posts-activity/chat/';

    return httpRequest.get(url, { params: params });
  },
  exportAppliedResume: (params = {}) => {
    const url = 'job/web/employer-job-posts-activity/export/';

    return httpRequest.get(url, { params: params });
  },
  changeApplicationStatus: (id, data) => {
    const url = `job/web/employer-job-posts-activity/${id}/application-status/`;

    return httpRequest.put(url, data);
  },
  deleteJobPostActivity: (id) => {
    const url = `job/web/employer-job-posts-activity/${id}/`;

    return httpRequest.delete(url);
  },
};

export default jobPostActivityService;
