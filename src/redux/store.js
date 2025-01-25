import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./dataSlice";
import authReducer from "./authSlice";

export default configureStore({
  reducer: {
    languages: appReducer,
    authentication: authReducer,
  },
});
