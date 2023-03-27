import httpRequest from '../utils/httpRequest';

const jobService = {
  addJobPost: (data) => {
    const url = 'api/job/web/job-posts/';

    return httpRequest.post(url, data);
  },
  getJobPost: () => {},
  getJobPostDetailById: () => {},
  updateJobPostById: (id, data) => {
    const url = `api/job/web/job-posts/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteJobPostById: (id) => {
    const url = `api/job/web/job-posts/${id}/`;

    return httpRequest.delete(url);
  },
};

export default jobService;
