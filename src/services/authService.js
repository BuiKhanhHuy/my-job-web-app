import httpRequest from '../utils/httpRequest';
import { AUTH_CONFIG } from '../configs/constants';

const authService = {
  getToken: (email, password, role_name) => {
    const url = 'auth/token/';

    const data = {
      grant_type: AUTH_CONFIG.PASSWORD_KEY,
      client_id: AUTH_CONFIG.CLIENT_ID,
      client_secret: AUTH_CONFIG.CLIENT_SECRECT,
      username: email,
      password: password,
      role_name: role_name,
    };

    return httpRequest.post(url, data);
  },
  convertToken: (clientId, clientSecrect, provider, token) => {
    const url = 'auth/convert-token/';

    const data = {
      grant_type: AUTH_CONFIG.CONVERT_TOKEN_KEY,
      client_id: clientId,
      client_secret: clientSecrect,
      backend: provider,
      token: token,
    };

    return httpRequest.post(url, data);
  },
  revokToken: (accessToken, backend) => {
    const url = 'auth/revoke-token/';

    const data = {
      client_id: AUTH_CONFIG.CLIENT_ID,
      client_secret: AUTH_CONFIG.CLIENT_SECRECT,
      token: accessToken,
      backend: backend
    };

    return httpRequest.post(url, data);
  },
  checkCreds: (email, roleName) => {
    const url = 'auth/check-creds/';

    const data = {
      email: email,
      roleName: roleName,
    };

    return httpRequest.post(url, data);
  },
  jobSeekerRegister: (data) => {
    const url = 'auth/job-seeker/register/';

    return httpRequest.post(url, data);
  },
  employerRegister: (data) => {
    const url = 'auth/employer/register/';

    return httpRequest.post(url, data);
  },
  getUserInfo: () => {
    const url = 'auth/user-info/';

    return httpRequest.get(url);
  },
  updateUser: (data) => {
    const url = 'auth/update-user/';

    return httpRequest.patch(url, data);
  },
  updateAvatar: (data) => {
    const url = 'auth/avatar/';

    return httpRequest.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  deleteAvatar: () => {
    const url = 'auth/avatar/';

    return httpRequest.delete(url);
  },
  changePassword: (data) => {
    const url = 'auth/change-password/';

    return httpRequest.put(url, data);
  },
  forgotPassword: (data) => {
    const url = 'auth/forgot-password/';

    return httpRequest.post(url, data);
  },
  resetPassword: (data) => {
    const url = 'auth/reset-password/';

    return httpRequest.post(url, data);
  },
  getUserSettings: () => {
    const url = 'auth/settings/';

    return httpRequest.get(url);
  },
  updateUserSettings: (data) => {
    const url = 'auth/settings/';

    return httpRequest.put(url, data);
  }
};

export default authService;
