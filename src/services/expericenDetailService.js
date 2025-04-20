/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import httpRequest from '../utils/httpRequest';

const expericenDetailService = {
  addExperienceDetail: (data) => {
    const url = `info/web/experiences-detail/`;

    return httpRequest.post(url, data);
  },
  getExperienceDetailById: (id) => {
    const url = `info/web/experiences-detail/${id}/`;

    return httpRequest.get(url);
  },
  updateExperienceDetailById: (id, data) => {
    const url = `info/web/experiences-detail/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteExperienceDetailById: (id) => {
    const url = `info/web/experiences-detail/${id}/`;

    return httpRequest.delete(url);
  },
};

export default expericenDetailService;
