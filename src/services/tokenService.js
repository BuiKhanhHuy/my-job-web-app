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
  saveAccessTokenAndRefreshTokenToCookie: (accessToken, refreshToken) => {
    try {
      Cookies.set(AUTH_CONFIG.ACCESS_TOKEN_KEY, accessToken, { expires: 365 });
      Cookies.set(AUTH_CONFIG.REFRESH_TOKEN_KEY, refreshToken, { expires: 365 });

      return true;
    } catch (error) {
      return false;
    }
  },
  removeAccessTokenAndRefreshTokenFromCookie: () => {
    try {
      Cookies.remove(AUTH_CONFIG.ACCESS_TOKEN_KEY);
      Cookies.remove(AUTH_CONFIG.REFRESH_TOKEN_KEY);

      return true;
    } catch (error) {
      return false;
    }
  },
};

export default tokenService;
