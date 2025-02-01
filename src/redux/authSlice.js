import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LOGIN, LOGOUT } from './authActions';

export const authSlice = createSlice({
  name: 'authentication',
  initialState: {
    isAuthenticated: false,
    firstName: undefined,
    lastName: undefined,
    username: undefined,
    accessToken: undefined,
    refreshToken: undefined,
    email: undefined,
    profilePicture: undefined,
    isAdmin: undefined
  },
  reducers: {
    setState: (state, action) => {
      const { firstName, lastName, username, email, isAdmin, userId, accessToken, refreshToken, profilePicture, isAuthenticated } = action.payload;
      state.firstName = firstName;
      state.lastName = lastName;
      state.username = username;
      state.email = email;
      state.isAdmin = isAdmin;
      state.userId = userId;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.profilePicture = profilePicture;
      state.isAuthenticated = isAuthenticated
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setUserTokens: (state, action) => {
      // Set the accessToken and refreshToken
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.refreshToken = null;
      state.firstName = null;
      state.lastName = null;
      state.username = null;
      state.profilePicture = null;

      // handle removale/deletion of session related data
      localStorage.removeItem("reactNotes-accessToken");
    localStorage.removeItem("reactNotes-refreshToken");
    localStorage.removeItem("reactNotes-user");
    },
  }

});

export const { setState, setIsAuthenticated, setUserTokens, logout} = authSlice.actions;
export default authSlice.reducer;
