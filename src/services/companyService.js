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
  followCompany: (slug) => {
    const url = `/api/info/web/companies/${slug}/followed/`;

    return httpRequest.post(url);
  },
};

export default companyService;
