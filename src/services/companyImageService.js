import httpRequest from '../utils/httpRequest';

const companyImageService = {
  getCompanyImages: () => {
    const url = 'info/web/company-images/';

    return httpRequest.get(url);
  },
  addCompanyImage: (data) => {
    const url = 'info/web/company-images/';

    return httpRequest.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteCompanyImage: (id) => {
    const url = `info/web/company-images/${id}/`;

    return httpRequest.delete(url);
  },
};

export default companyImageService;
