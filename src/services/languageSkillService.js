import httpRequest from '../utils/httpRequest';

const languageSkillService = {
  addLanguageSkills: (data) => {
    const url = `api/info/web/language-skills/`;

    return httpRequest.post(url, data);
  },
  getLanguageSkillById: (id) => {
    const url = `api/info/web/language-skills/${id}/`;

    return httpRequest.get(url);
  },
  updateLanguageSkillById: (id, data) => {
    const url = `api/info/web/language-skills/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteLanguageSkillById: (id) => {
    const url = `api/info/web/language-skills/${id}/`;

    return httpRequest.delete(url);
  },
};

export default languageSkillService;
