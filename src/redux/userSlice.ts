import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, getCookie, removeCookie } from "../utils/cookieManager";

interface UserState {
  username: string | null;
  role: string | null;
}

const initialState: UserState = {
  username: getCookie("username"), // Hent brukernavn fra cookie
  role: getCookie("role"), // Hent rolle fra cookie
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ username: string; role: string }>) {
      state.username = action.payload.username;
      state.role = action.payload.role;

      // Oppdater cookies ved innlogging
      setCookie("username", state.username, 1);
      setCookie("role", state.role, 1);
    },
    logout(state) {
      state.username = null;
      state.role = null;

      // Slett cookies ved utlogging
      removeCookie("username");
      removeCookie("role");
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

