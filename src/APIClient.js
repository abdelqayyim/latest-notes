import axios from "axios";
import store from "./redux/store"; // Import Redux store

// Create API client without token (for user-related requests)
export const userApi = axios.create({
  baseURL: "http://localhost:8000/user/",
  headers: {
    Accept: "application/json",
  },
});

// Create API client with token interceptor (for language-related requests)
export const languageApi = axios.create({
  baseURL: "http://localhost:8000/languages/",
  headers: {
    Accept: "application/json",
  },
});

// Attach Authorization token only for language-related requests
languageApi.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.authentication.accessToken;

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
