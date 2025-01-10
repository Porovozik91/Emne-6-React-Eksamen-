import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi";
import { cvApi } from "../services/cvApi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [cvApi.reducerPath]: cvApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(cvApi.middleware)
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
