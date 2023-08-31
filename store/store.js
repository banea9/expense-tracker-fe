import { configureStore } from "@reduxjs/toolkit";
import expensesReducer from "./expenses";
import authReducer from "./auth";

export const store = configureStore({
  reducer: {
    expensesState: expensesReducer,
    authState: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
