import httpRequest from '../utils/httpRequest';

const resumeService = {
  getResumeOwner: (resumeSlug) => {
    const url = `api/info/web/resumes/${resumeSlug}/resume-owner/`;

    return httpRequest.get(url);
  },
  getCv: (resumeSlug) => {
    const url = `api/info/web/resumes/${resumeSlug}/cv/`;

    return httpRequest.get(url);
  },
  updateCV: (resumeSlug, formData) => {
    const url = `api/info/web/resumes/${resumeSlug}/cv/`;

    return httpRequest.put(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  addResume: (data) => {
    const url = 'api/info/web/resumes/';

    return httpRequest.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  updateResume: (resumeSlug, data) => {
    const url = `api/info/web/resumes/${resumeSlug}/`;

    return httpRequest.put(url, data);
  },
  deleteResume: (resumeSlug) => {
    const url = `api/info/web/resumes/${resumeSlug}/`;

    return httpRequest.delete(url);
  },
  getExperiencesDetail: (resumeSlug) => {
    const url = `api/info/web/resumes/${resumeSlug}/experiences-detail/`;

    return httpRequest.get(url);
  },
  getEducationsDetail: (resumeSlug) => {
    const url = `api/info/web/resumes/${resumeSlug}/educations-detail/`;

    return httpRequest.get(url);
  },
  getCertificates: (resumeSlug) => {
    const url = `api/info/web/resumes/${resumeSlug}/certificates-detail/`;

    return httpRequest.get(url);
  },
  getLanguageSkills: (resumeSlug) => {
    const url = `api/info/web/resumes/${resumeSlug}/language-skills/`;

    return httpRequest.get(url);
  },
  getAdvancedSkills: (resumeSlug) => {
    const url = `api/info/web/resumes/${resumeSlug}/advanced-skills/`;

    return httpRequest.get(url);
  },
};

export default resumeService;
