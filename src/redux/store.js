import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./dataSlice";
import authReducer from "./authSlice";
<<<<<<< HEAD
=======
import uiReducer from './uiSlice';
>>>>>>> a94cd02 (New Admin changes.)

export default configureStore({
  reducer: {
    languages: appReducer,
    authentication: authReducer,
<<<<<<< HEAD
=======
    ui: uiReducer
>>>>>>> a94cd02 (New Admin changes.)
  },
});
