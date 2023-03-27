import httpRequest from '../utils/httpRequest';

const educationDetailService = {
  addEducationsDetail: (data) => {
    const url = `api/info/web/educations-detail/`;

    return httpRequest.post(url, data);
  },
  getEducationDetailById: (id) => {
    const url = `api/info/web/educations-detail/${id}/`;

    return httpRequest.get(url);
  },
  updateEducationDetailById: (id, data) => {
    const url = `api/info/web/educations-detail/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteEducationDetailById: (id) => {
    const url = `api/info/web/educations-detail/${id}/`;

    return httpRequest.delete(url);
  },
};

export default educationDetailService;
