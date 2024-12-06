import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../services/userApi";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// Sørg for at dette er inkludert
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Legg til en default export
export default store;
