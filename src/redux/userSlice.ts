import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, removeCookie } from "../utils/cookieManager";
import { SignJWT } from "jose";

interface UserState {
  username: string | null;
  role: string | null;
}

const jwtSecret = new TextEncoder().encode(import.meta.env.VITE_JWT_SECRET);
if (!jwtSecret) {
  throw new Error("mangler VITE_JWT_SECRET i .env");
}

const initialState: UserState = {
  username: null,
  role: null,
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ username: string; role: string }>) => {
      state.username = action.payload.username;
      state.role = action.payload.role;

      // Generer JWT og lagre i cookie
      const generateAndStoreJwt = async () => {
        try {
          const token = await new SignJWT({ username: state.username, role: state.role })
            .setProtectedHeader({ alg: "HS256" })
            .setExpirationTime("1d")
            .sign(jwtSecret);

          setCookie("authToken", token, 1);
        } catch (error) {
          console.error("Feil ved generering av JWT:", error);
        }
      };

      generateAndStoreJwt();
    },
    logout: (state) => {
      state.username = null;
      state.role = null;

      // Fjern JWT-cookie ved utlogging
      removeCookie("authToken");
    },
    loadUserFromJwt: (state, action: PayloadAction<UserState>) => {
      state.username = action.payload.username;
      state.role = action.payload.role;
    },
  },
});

export const { login, logout, loadUserFromJwt } = userSlice.actions;
export default userSlice.reducer;


