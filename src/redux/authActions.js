// Define action types
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

// Action creators
export const login = (userData) => ({
  type: LOGIN,
  payload: userData,  // The user data can include user info and JWT token
});

export const logout = () => ({
  type: LOGOUT,
});
