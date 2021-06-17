const accessToken = 'access_token';
const refreshToken = 'refresh_token';

const LocalStorageService = (function StorageService() {
  let service;
  function getService() {
    if (!service) {
      service = this;
    }

    return service;
  }

  function setToken(token) {
    localStorage.setItem(accessToken, token.jwtToken);
    localStorage.setItem(refreshToken, token.refreshToken);
  }

  function getAccessToken() {
    return localStorage.getItem(accessToken);
  }

  function getRefreshToken() {
    return localStorage.getItem(refreshToken);
  }

  function clearToken() {
    localStorage.removeItem(accessToken);
    localStorage.removeItem(refreshToken);
  }

  return {
    getService,
    setToken,
    getAccessToken,
    getRefreshToken,
    clearToken,
  };
})();

export default LocalStorageService;
