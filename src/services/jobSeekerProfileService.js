import httpRequest from '../utils/httpRequest';

const jobSeekerProfileService = {
  getProfile: () => {
    const url = 'info/profile/';

    return httpRequest.get(url);
  },
  updateProfile: (data) => {
    const url = 'info/profile/';

    return httpRequest.put(url, data);
  },
  getResumes: (jobSeekerProfileId, params = {}) => {
    const url = `info/web/job-seeker-profiles/${jobSeekerProfileId}/resumes/`;

    return httpRequest.get(url, { params: params });
  },
};

export default jobSeekerProfileService;
