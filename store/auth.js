import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isAuthenticated: false,
    email: "",
    username: "",
    activeWallet: "",
  },
  reducers: {
    authenticate: (state, action) => {
      AsyncStorage.setItem("auth-token", action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.email = jwt_decode(action.payload.token)?.email;
      state.username = jwt_decode(action.payload.token)?.username;
      state.activeWallet = jwt_decode(action.payload.token)?.activeWallet._id;
    },
    logout: (state, _action) => {
      state.token = "";
      state.isAuthenticated = false;
      state.email = "";
      state.username = "";
      state.activeWallet = "";
      AsyncStorage.removeItem("auth-token");
    },
    setUserActiveWallet: (state, action) => {
      state.activeWallet = action.payload.walletId;
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export const logout = authSlice.actions.logout;
export const setUserActiveWallet = authSlice.actions.setUserActiveWallet;

export default authSlice.reducer;
