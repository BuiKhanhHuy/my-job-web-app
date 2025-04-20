/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import httpRequest from '../utils/httpRequest';

const jobPostNotificationService = {
  addJobPostNotification: (data) => {
    const url = 'job/web/job-post-notifications/';

    return httpRequest.post(url, data);
  },
  getJobPostNotifications: (params = {}) => {
    const url = 'job/web/job-post-notifications/';

    return httpRequest.get(url, {
      params: params,
    });
  },
  updateJobPostNotificationById: (id, data) => {
    const url = `job/web/job-post-notifications/${id}/`;

    return httpRequest.put(url, data);
  },
  getJobPostNotificationDetailById: (id) => {
    const url = `job/web/job-post-notifications/${id}/`;

    return httpRequest.get(url);
  },
  deleteJobPostNotificationDetailById: (id) => {
    const url = `job/web/job-post-notifications/${id}/`;

    return httpRequest.delete(url);
  },
  active: (id) => {
    const url = `job/web/job-post-notifications/${id}/active/`;

    return httpRequest.put(url);
  },
};

export default jobPostNotificationService;
