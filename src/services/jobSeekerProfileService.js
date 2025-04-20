/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import httpRequest from '../utils/httpRequest';

const jobSeekerProfileService = {
  getProfile: () => {
    const url = 'info/profile/';

    return httpRequest.get(url);
  },
  updateProfile: (data) => {
    const url = 'info/profile/';

    return httpRequest.put(url, data);
  },
  getResumes: (jobSeekerProfileId, params = {}) => {
    const url = `info/web/job-seeker-profiles/${jobSeekerProfileId}/resumes/`;

    return httpRequest.get(url, { params: params });
  },
};

export default jobSeekerProfileService;
