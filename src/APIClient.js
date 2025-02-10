import axios from "axios";
import store from "./redux/store"; // Import Redux store
import { jwtDecode } from "jwt-decode";
import { setUserTokens, logout } from "./redux/authSlice";
// const URL = "https://fequentquestionsserver.vercel.app/";
const URL = "http://localhost:8000/";

let isRefreshing = false;
let refreshSubscribers = [];

const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

const onRefreshed = (newAccessToken) => {
  refreshSubscribers.map((cb) => cb(newAccessToken));
  refreshSubscribers = [];
};


// Create API client without token (for user-related requests)
export const userApi = axios.create({
  baseURL: URL+"user/",
  headers: {
    Accept: "application/json",
  },
});

// Create API client with token interceptor (for language-related requests)
export const languageApi = axios.create({
  baseURL: URL+"languages/",
  headers: {
    Accept: "application/json",
  },
});

// Helper function to refresh the access token
const refreshAccessToken = async (refreshToken) => {
  try {
    // Make a request to the refresh token endpoint
    const response = await axios.post(URL+"user/refresh-token", { refreshToken });
    
    // Assuming the API responds with both accessToken and refreshToken
    const { accessToken } = response.data;

    // Optionally, you can store the new refresh token as well (if it's provided)
    store.dispatch(setUserTokens({ accessToken, refreshToken }));

    return accessToken; // Return the new access token
  } catch (error) {
    console.error("Error refreshing access token", error);
    throw new Error("Failed to refresh access token");
  }
};

// Attach Authorization token only for language-related requests
// languageApi.interceptors.request.use(
//   async (config) => {
//     const state = store.getState();
//     const accessToken = state.authentication.accessToken;
//     const refreshToken = state.authentication.refreshToken;
//     const currentTime = Math.floor(Date.now() / 1000);

//     if (accessToken) {
//       try {
//         const decodedAccessToken = jwtDecode(accessToken);
//         const decodedRefreshToken = jwtDecode(refreshToken);

//         if(currentTime >= decodedRefreshToken.exp){
//           store.dispatch(logout());
//         }

//         // Check if the access token is expired
//         if (currentTime >= decodedAccessToken.exp) {
//           // If the token is expired, use the refresh token to get a new access token
//           const newAccessToken = await refreshAccessToken(refreshToken);

//           // Update the Authorization header with the new access token
//           config.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         } else {
//           // If the token is still valid, use it as is
//           config.headers["Authorization"] = `Bearer ${accessToken}`;
//         }
//       } catch (error) {
//         console.error("Error decoding access token or refreshing token", error);
//         store.dispatch({ type: 'LOGOUT' });
//         return Promise.reject(error);
//       }
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );
languageApi.interceptors.request.use(
  async (config) => {
    const state = store.getState();
    let accessToken = state.authentication.accessToken;
    let refreshToken = state.authentication.refreshToken;
    const currentTime = Math.floor(Date.now() / 1000);

    if (accessToken) {
      try {
        const decodedAccessToken = jwtDecode(accessToken);

        if (currentTime < decodedAccessToken.exp) {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
          return config;
        }

        if (isRefreshing) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((newAccessToken) => {
              config.headers["Authorization"] = `Bearer ${newAccessToken}`;
              resolve(config);
            });
          });
        }

        isRefreshing = true;
        const newAccessToken = await refreshAccessToken(refreshToken);
        store.dispatch(setUserTokens({ accessToken: newAccessToken, refreshToken }));
        isRefreshing = false;

        onRefreshed(newAccessToken);
        config.headers["Authorization"] = `Bearer ${newAccessToken}`;
      } catch (error) {
        store.dispatch(logout());
        return Promise.reject(error);
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);