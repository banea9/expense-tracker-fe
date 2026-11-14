import axios from "axios";
import { API_URL } from "./constants";

const api = axios.create({ baseURL: API_URL });

const authConfig = (token) => ({
  headers: { Authorization: `Bearer ${token}` },
});

// Backend expense shape -> normalized shape used across the app.
const normalizeExpense = (e) => ({
  id: e._id,
  category: e.category,
  subcategory: e.subcategory,
  amount: typeof e.amount === "string" ? parseFloat(e.amount) : e.amount,
  description: e.description,
  wallet: e.wallet,
  user: e.user,
  date: e.lastModified ? new Date(e.lastModified) : new Date(),
});

// Normalized/form data -> backend payload.
const toExpensePayload = (expenseData, walletId) => ({
  category: expenseData.category,
  subcategory: expenseData.subcategory,
  amount: expenseData.amount,
  description: expenseData.description,
  ...(walletId ? { wallet: walletId } : {}),
  lastModified: (expenseData.date instanceof Date
    ? expenseData.date
    : new Date(expenseData.date)
  ).toISOString(),
});

/* ------------------------------- Expenses ------------------------------- */

export const httpStoreExpense = async (expenseData, walletId, token) => {
  const response = await api.post(
    "/expenses",
    toExpensePayload(expenseData, walletId),
    authConfig(token)
  );
  return normalizeExpense(response.data);
};

export const httpFetchRecentExpenses = async (token) => {
  const response = await api.get("/expenses", authConfig(token));
  return response.data.map(normalizeExpense);
};

export const httpFetchAllExpenses = async (token) => {
  const response = await api.get("/expenses/all", authConfig(token));
  return response.data.map(normalizeExpense);
};

export const httpUpdateExpense = async (id, expenseData, token) => {
  const response = await api.patch(
    `/expenses/${id}`,
    toExpensePayload(expenseData),
    authConfig(token)
  );
  return normalizeExpense(response.data);
};

export const httpDeleteExpense = (id, token) => {
  return api.delete(`/expenses/${id}/delete`, authConfig(token));
};

export const httpFilterExpenses = async (filter, token) => {
  const response = await api.post("/expenses/filter", filter, authConfig(token));
  return response.data.map(normalizeExpense);
};

/* -------------------------------- Wallets ------------------------------- */

export const httpAddWallet = async (walletData, token) => {
  const response = await api.post("/wallets", walletData, authConfig(token));
  return response.data;
};

export const httpUpdateWallet = async (id, walletData, token) => {
  const response = await api.patch(
    `/wallets/${id}`,
    walletData,
    authConfig(token)
  );
  return response.data;
};

export const httpFetchWallet = async (token) => {
  const response = await api.get("/wallets/user", authConfig(token));
  return response.data;
};

export const httpAddUserToWallet = async ({ id, userEmail }, token) => {
  const response = await api.patch(
    `/wallets/${id}/addUser`,
    { userEmail },
    authConfig(token)
  );
  return response.data;
};

export const httpRemoveUserFromWallet = async ({ id, userEmail }, token) => {
  const response = await api.patch(
    `/wallets/${id}/removeUser`,
    { userEmail },
    authConfig(token)
  );
  return response.data;
};

export const httpSetActiveWallet = async (walletId, email, token) => {
  const response = await api.patch(
    `/users/${walletId}/activeWallet`,
    { email },
    authConfig(token)
  );
  return response.data;
};

/* ---------------------------- Notifications ----------------------------- */

// Registers this device's Expo push token with the backend for the current user.
export const httpRegisterPushToken = async (pushToken, token) => {
  const response = await api.post(
    "/users/push-token",
    { pushToken },
    authConfig(token)
  );
  return response.data;
};
