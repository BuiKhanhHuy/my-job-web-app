import httpRequest from '../utils/httpRequest';

const certificateService = {
  addCertificates: (data) => {
    const url = `api/info/web/certificates-detail/`;

    return httpRequest.post(url, data);
  },
  getCertificateById: (id) => {
    const url = `api/info/web/certificates-detail/${id}/`;

    return httpRequest.get(url);
  },
  updateCertificateById: (id, data) => {
    const url = `api/info/web/certificates-detail/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteCertificateById: (id) => {
    const url = `api/info/web/certificates-detail/${id}/`;

    return httpRequest.delete(url);
  },
};

export default certificateService;
