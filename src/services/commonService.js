import httpRequest from '../utils/httpRequest';

const commonService = {
  getConfigs: () => {
    const url = 'common/configs/';

    return httpRequest.get(url);
  },
  getDistrictsByCityId: (cityId) => {
    const url = `common/districts/?cityId=${cityId}`;
    return httpRequest.get(url);
  },
  getTop10Careers: () => {
    const url = 'common/top-careers/';

    return httpRequest.get(url);
  },
};

export default commonService;
