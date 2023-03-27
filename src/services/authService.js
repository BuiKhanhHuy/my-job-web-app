import httpRequest from '../utils/httpRequest';
import { AUTH_CONFIG } from '../configs/constants';

const authService = {
  getToken: (email, password, role_name) => {
    const url = 'api/auth/token/';

    const data = {
      grant_type: 'password',
      client_id: AUTH_CONFIG.CLIENT_ID,
      client_secret: AUTH_CONFIG.CLIENT_SECRECT,
      username: email,
      password: password,
      role_name: role_name,
    };

    return httpRequest.post(url, data);
  },
  convertToken: () => {},
  revokToken: (accessToken) => {
    const url = 'api/auth/revoke-token/';

    const data = {
      client_id: AUTH_CONFIG.CLIENT_ID,
      client_secret: AUTH_CONFIG.CLIENT_SECRECT,
      token: accessToken,
    };

    return httpRequest.post(url, data);
  },
  checkCreds: (email, roleName) => {
    const url = 'api/auth/check-creds/';

    const data = {
      email: email,
      roleName: roleName,
    };

    return httpRequest.post(url, data);
  },
  jobSeekerRegister: (data) => {
    const url = 'api/auth/job-seeker/register/';

    return httpRequest.post(url, data);
  },
  employerRegister: (data) => {
    const url = 'api/auth/employer/register/';

    return httpRequest.post(url, data);
  },
  getUserInfo: () => {
    const url = 'api/auth/user-info/';

    return httpRequest.get(url);
  },
  updateUser: (data) => {
    const url = 'api/auth/update-user/';

    return httpRequest.patch(url, data);
  },
  updateAvatar: (data) => {
    const url = 'api/auth/avatar/';

    return httpRequest.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  changePassword: (data) => {
    const url = 'api/auth/change-password/';

    return httpRequest.put(url, data);
  },
};

export default authService;
