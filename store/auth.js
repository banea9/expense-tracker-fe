import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    isAuthenticated: false,
  },
  reducers: {
    authenticate: (state, action) => {
      AsyncStorage.setItem('auth-token', action.payload.token);
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state, _action) => {
      state.token = "";
      state.isAuthenticated = false;
      AsyncStorage.removeItem('auth-token')
    },
  },
});

export const authenticate = authSlice.actions.authenticate;
export const logout = authSlice.actions.logout;

export default authSlice.reducer;
