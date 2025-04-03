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
