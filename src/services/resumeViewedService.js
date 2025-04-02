import httpRequest from '../utils/httpRequest';

const resumeViewedService = {
  getResumeViewed: (params = {}) => {
    const url = 'info/web/resume-views/';

    return httpRequest.get(url, { params: params });
  },
};

export default resumeViewedService;
