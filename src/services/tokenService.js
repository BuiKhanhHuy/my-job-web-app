import Cookies from 'js-cookie';
import { AUTH_CONFIG } from '../configs/constants';

const tokenService = {
  getAccessTokenFromCookie: () => {
    try {
      const accessToken = Cookies.get(AUTH_CONFIG.ACCESS_TOKEN_KEY);
      if (accessToken && accessToken !== undefined) {
        return accessToken;
      }

      return null;
    } catch (error) {
      return null;
    }
  },
  getRefreshTokenFromCookie: () => {
    try {
      const accessToken = Cookies.get(AUTH_CONFIG.REFRESH_TOKEN_KEY);
      if (accessToken && accessToken !== undefined) {
        return accessToken;
      }

      return null;
    } catch (error) {
      return null;
    }
  },
  getProviderFromCookie: () => {
    try {
      const provider = Cookies.get(AUTH_CONFIG.BACKEND_KEY);
      if (provider && provider !== undefined) {
        return provider;
      }

      return null;
    } catch (error) {
      return null;
    }
  },
  saveAccessTokenAndRefreshTokenToCookie: (
    accessToken,
    refreshToken,
    provider
  ) => {
    try {
      Cookies.set(AUTH_CONFIG.ACCESS_TOKEN_KEY, accessToken, { expires: 365 });
      Cookies.set(AUTH_CONFIG.REFRESH_TOKEN_KEY, refreshToken, {
        expires: 365,
      });
      Cookies.set(AUTH_CONFIG.BACKEND_KEY, provider, {
        expires: 365,
      });

      return true;
    } catch (error) {
      return false;
    }
  },
  removeAccessTokenAndRefreshTokenFromCookie: () => {
    try {
      Cookies.remove(AUTH_CONFIG.ACCESS_TOKEN_KEY);
      Cookies.remove(AUTH_CONFIG.REFRESH_TOKEN_KEY);
      Cookies.remove(AUTH_CONFIG.BACKEND_KEY);

      return true;
    } catch (error) {
      return false;
    }
  },
};

export default tokenService;
