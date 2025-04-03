import httpRequest from '../utils/httpRequest';

const advancedSkillService = {
  addAdvancedSkills: (data) => {
    const url = `info/web/advanced-skills/`;

    return httpRequest.post(url, data);
  },
  getAdvancedSkillById: (id) => {
    const url = `info/web/advanced-skills/${id}/`;

    return httpRequest.get(url);
  },
  updateAdvancedSkillById: (id, data) => {
    const url = `info/web/advanced-skills/${id}/`;

    return httpRequest.put(url, data);
  },
  deleteAdvancedSkillById: (id) => {
    const url = `info/web/advanced-skills/${id}/`;

    return httpRequest.delete(url);
  },
};

export default advancedSkillService;
