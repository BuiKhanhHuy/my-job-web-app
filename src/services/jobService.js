import httpRequest from '../utils/httpRequest';

const jobService = {
  addJobPost: (data) => {
    const url = 'api/job/web/private-job-posts/';

    return httpRequest.post(url, data);
  },
  updateJobPostById: (id, data) => {
    const url = `api/job/web/private-job-posts/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteJobPostById: (id) => {
    const url = `api/job/web/private-job-posts/${id}/`;

    return httpRequest.delete(url);
  },

  getJobPosts: (params = {}) => {
    const url = 'api/job/web/job-posts/';

    return httpRequest.get(url, {
      params: params,
    });
  },
  getJobPostDetailById: (slug) => {
    const url = `api/job/web/job-posts/${slug}/`;

    return httpRequest.get(url);
  },
  getSuggestedJobPosts: () => {},
  getJobPostsSaved: (params = {}) => {
    const url = `api/job/web/job-posts/job-posts-saved/`;

    return httpRequest.get(url, { params: params });
  },
  saveJobPost: (slug) => {
    const url = `api/job/web/job-posts/${slug}/job-saved/`;

    return httpRequest.post(url);
  },
};

export default jobService;
