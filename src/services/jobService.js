import httpRequest from '../utils/httpRequest';

const jobService = {
  addJobPost: (data) => {
    const url = 'api/job/web/job-posts/';

    return httpRequest.post(url, data);
  },
  updateJobPostById: (id, data) => {
    const url = `api/job/web/job-posts/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteJobPostById: (id) => {
    const url = `api/job/web/job-posts/${id}/`;

    return httpRequest.delete(url);
  },

  getJobPosts: (params = {}) => {
    const url = 'api/job/web/job-posts/';

    return httpRequest.get(url, {
      params: params,
    });
  },
  getSuggestedJobPosts: () => {},
  getJobPostDetailById: () => {},
};

export default jobService;
