/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import httpRequest from '../utils/httpRequest';

const educationDetailService = {
  addEducationsDetail: (data) => {
    const url = `info/web/educations-detail/`;

    return httpRequest.post(url, data);
  },
  getEducationDetailById: (id) => {
    const url = `info/web/educations-detail/${id}/`;

    return httpRequest.get(url);
  },
  updateEducationDetailById: (id, data) => {
    const url = `info/web/educations-detail/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteEducationDetailById: (id) => {
    const url = `info/web/educations-detail/${id}/`;

    return httpRequest.delete(url);
  },
};

export default educationDetailService;
