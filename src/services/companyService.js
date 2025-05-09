/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import httpRequest from '../utils/httpRequest';

const companyService = {
  getCompany: () => {
    const url = 'info/web/company/';

    return httpRequest.get(url);
  },
  updateCompany: (id, data) => {
    const url = `info/web/private-companies/${id}/`;

    return httpRequest.put(url, data);
  },
  updateCompanyImageUrl: (data) => {
    const url = `info/web/private-companies/company-image-url/`;

    return httpRequest.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateCompanyCoverImageUrl: (data) => {
    const url = `info/web/private-companies/company-cover-image-url/`;

    return httpRequest.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },

  // public
  getCompanies: (params = {}) => {
    const url = 'info/web/companies/';

    return httpRequest.get(url, {
      params: params,
    });
  },
  getCompanyDetailById: (slug) => {
    const url = `info/web/companies/${slug}/`;

    return httpRequest.get(url);
  },
  followCompany: (slug) => {
    const url = `info/web/companies/${slug}/followed/`;

    return httpRequest.post(url);
  },
  getTopCompanies: () => {
    const url = `info/web/companies/top/`;

    return httpRequest.get(url);
  },
};

export default companyService;
