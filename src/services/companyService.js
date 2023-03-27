import httpRequest from '../utils/httpRequest';

const companyService = {
  getCompany: () => {
    const url = 'api/info/web/company/';

    return httpRequest.get(url);
  },
  updateCompany: (id, data) => {
    const url = `api/info/web/companies/${id}/`;

    return httpRequest.put(url, data);
  },
  getJobPosts: () => {
    const url = `api/info/web/company/job-posts/`;

    return httpRequest.get(url);
  },
  getJobPostDetailById: (id) => {
    const url = `api/info/web/company/job-posts/${id}/`;

    return httpRequest.get(url);
  },
};

export default companyService;
