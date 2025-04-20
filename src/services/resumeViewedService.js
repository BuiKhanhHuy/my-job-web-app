/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import httpRequest from '../utils/httpRequest';

const resumeViewedService = {
  getResumeViewed: (params = {}) => {
    const url = 'info/web/resume-views/';

    return httpRequest.get(url, { params: params });
  },
};

export default resumeViewedService;
