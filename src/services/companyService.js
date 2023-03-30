import httpRequest from '../utils/httpRequest';

const companyService = {
  getCompany: () => {
    const url = 'api/info/web/company/';

    return httpRequest.get(url);
  },
  updateCompany: (id, data) => {
    const url = `api/info/web/private-companies/${id}/`;

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

  // public
  getCompanies: (params = {}) => {
    const url = '/api/info/web/companies/';

    return httpRequest.get(url, {
      params: params,
    });
  },
  getCompanyDetailById: (slug) => {
    const url = `/api/info/web/companies/${slug}/`;

    return httpRequest.get(url);
  },
};

export default companyService;
