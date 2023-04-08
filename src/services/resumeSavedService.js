import httpRequest from '../utils/httpRequest';

const resumeSavedService = {
  getResumesSaved: (params = {}) => {
    const url = '/api/info/web/resumes-saved/';

    return httpRequest.get(url, { params: params });
  },
};

export default resumeSavedService;
