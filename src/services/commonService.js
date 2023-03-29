import httpRequest from '../utils/httpRequest';

const commonService = {
  getConfigs: () => {
    const url = 'api/common/configs/';

    return httpRequest.get(url);
  },
  getDistrictsByCityId: (cityId) => {
    const url = `api/common/districts/?cityId=${cityId}`;
    return httpRequest.get(url);
  },
  getTop10Careers: () => {
    const url = '/api/common/top-careers/';

    return httpRequest.get(url);
  },
};

export default commonService;
