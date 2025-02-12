import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./dataSlice";
import authReducer from "./authSlice";
import uiReducer from './uiSlice';

export default configureStore({
  reducer: {
    languages: appReducer,
    authentication: authReducer,
    ui: uiReducer
  },
});
