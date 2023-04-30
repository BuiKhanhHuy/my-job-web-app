import httpRequest from '../utils/httpRequest';

const jobPostNotificationService = {
  addJobPostNotification: (data) => {
    const url = 'api/job/web/job-post-notifications/';

    return httpRequest.post(url, data);
  },
  getJobPostNotifications: (params = {}) => {
    const url = 'api/job/web/job-post-notifications/';

    return httpRequest.get(url, {
      params: params,
    });
  },
  updateJobPostNotificationById: (id, data) => {
    const url = `api/job/web/job-post-notifications/${id}/`;

    return httpRequest.put(url, data);
  },
  getJobPostNotificationDetailById: (id) => {
    const url = `api/job/web/job-post-notifications/${id}/`;

    return httpRequest.get(url);
  },
  deleteJobPostNotificationDetailById: (id) => {
    const url = `api/job/web/job-post-notifications/${id}/`;

    return httpRequest.delete(url);
  },
  active: (id) => {
    const url = `api/job/web/job-post-notifications/${id}/active/`;

    return httpRequest.put(url);
  },
};

export default jobPostNotificationService;
