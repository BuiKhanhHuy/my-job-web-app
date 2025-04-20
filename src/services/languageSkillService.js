/*
MyJob Recruitment System - Part of MyJob Platform

Author: Bui Khanh Huy
Email: khuy220@gmail.com
Copyright (c) 2023 Bui Khanh Huy

License: MIT License
See the LICENSE file in the project root for full license information.
*/

import httpRequest from '../utils/httpRequest';

const languageSkillService = {
  addLanguageSkills: (data) => {
    const url = `info/web/language-skills/`;

    return httpRequest.post(url, data);
  },
  getLanguageSkillById: (id) => {
    const url = `info/web/language-skills/${id}/`;

    return httpRequest.get(url);
  },
  updateLanguageSkillById: (id, data) => {
    const url = `info/web/language-skills/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteLanguageSkillById: (id) => {
    const url = `info/web/language-skills/${id}/`;

    return httpRequest.delete(url);
  },
};

export default languageSkillService;
