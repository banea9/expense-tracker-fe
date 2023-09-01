import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";
import walletsReducer from "./wallets";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    expensesState: expensesReducer,
    authState: authReducer,
    walletsState: walletsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
