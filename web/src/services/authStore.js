let authToken = null;
const STORAGE_KEY = "ik_auth_token";

const storageAvailable = () => {
  try {
    return typeof localStorage !== "undefined";
  } catch (e) {
    return false;
  }
};

export function getAuthToken() {
  if (!authToken && storageAvailable()) {
    authToken = localStorage.getItem(STORAGE_KEY);
  }
  return authToken;
}

export function setAuthToken(token) {
  authToken = token;
  if (storageAvailable() && token) {
    localStorage.setItem(STORAGE_KEY, token);
  }
}

export function clearAuthToken() {
  authToken = null;
  if (storageAvailable()) {
    localStorage.removeItem(STORAGE_KEY);
  }
}
