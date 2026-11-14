import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";

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
      const { token } = action.payload;
      let decoded = {};
      try {
        decoded = jwtDecode(token) ?? {};
      } catch {
        decoded = {};
      }
      state.token = token;
      state.isAuthenticated = true;
      state.email = decoded.email ?? "";
      state.username = decoded.username ?? "";
      // activeWallet may be a populated wallet object, an id, or null.
      state.activeWallet = decoded.activeWallet?._id ?? decoded.activeWallet ?? "";
    },
    logout: (state) => {
      state.token = "";
      state.isAuthenticated = false;
      state.email = "";
      state.username = "";
      state.activeWallet = "";
    },
    setUserActiveWallet: (state, action) => {
      state.activeWallet = action.payload.walletId;
    },
  },
});

export const { authenticate, logout, setUserActiveWallet } = authSlice.actions;

// Thunks keep storage side-effects out of the reducers.
export const logIn = (token) => async (dispatch) => {
  await AsyncStorage.setItem("auth-token", token);
  dispatch(authenticate({ token }));
};

export const logOut = () => async (dispatch) => {
  await AsyncStorage.removeItem("auth-token");
  dispatch(logout());
};

export default authSlice.reducer;
