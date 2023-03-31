import httpRequest from '../utils/httpRequest';

const companyFollowed = {
  getCompaniesFollowed: (params = {}) => {
    const url = '/api/info/web/companies-follow/';

    return httpRequest.get(url, { params: params });
  },
};

export default companyFollowed;
