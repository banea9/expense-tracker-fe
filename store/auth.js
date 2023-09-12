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
  },
  reducers: {
    authenticate: (state, action) => {
      AsyncStorage.setItem("auth-token", action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.email = jwt_decode(action.payload.token)?.email;
      state.email = jwt_decode(action.payload.token)?.username;
    },
    logout: (state, _action) => {
      state.token = "";
      state.isAuthenticated = false;
      state.email = "";
      state.username = "";
      AsyncStorage.removeItem("auth-token");
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export const logout = authSlice.actions.logout;

export default authSlice.reducer;
