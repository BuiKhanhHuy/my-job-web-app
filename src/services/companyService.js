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
  updateCompanyImageUrl: (data) => {
    const url = `api/info/web/private-companies/company-image-url/`;

    return httpRequest.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateCompanyCoverImageUrl: (data) => {
    const url = `api/info/web/private-companies/company-cover-image-url/`;

    return httpRequest.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
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
  getTopCompanies: () => {
    const url = `/api/info/web/companies/top/`;

    return httpRequest.get(url);
  },
};

export default companyService;
