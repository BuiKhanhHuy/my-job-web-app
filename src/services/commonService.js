/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

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
