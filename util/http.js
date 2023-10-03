import axios from "axios";
import { API_URL } from "./constants";

const BACKEND_URL = API_URL;

export const httpStoreExpense = async (expenseData, token) => {
  const response = await axios.post(`${BACKEND_URL}/expenses`, expenseData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  return response.data;
};

export const httpFetchExpense = async (token) => {
  const response = await axios.get(`${BACKEND_URL}/expenses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const httpUpdateExpense = (id, expenseData) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
};

export const httpDeleteExpense = (id, token) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}/delete`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const httpAddWallet = async (walletData, token) => {
  const response = await axios.post(`${BACKEND_URL}/wallets`, walletData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const httpUpdateWallet = async (walletData, token) => {
  // const response = await axios.post(`${BACKEND_URL}/wallets`, walletData, {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // return response.data;
};

export const httpFetchWallet = async (token) => {
  const response = await axios.get(`${BACKEND_URL}/wallets/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const httpAddUserToWallet = async (walletData, token) => {
  const { id, userEmail } = walletData;
  const updateWalletUser = {
    userEmail,
  };
  const response = await axios.patch(
    `${BACKEND_URL}/wallets/${id}/addUser`,
    updateWalletUser,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const httpRemoveUserFromWallet = async (walletData, token) => {
  const { id, userEmail } = walletData;
  const updateWalletUser = {
    userEmail,
  };
  const response = await axios.patch(
    `${BACKEND_URL}/wallets/${id}/removeUser`,
    updateWalletUser,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const httpSetActiveWallet = async (walletId, email, token) => {
  const response = await axios.patch(
    `${BACKEND_URL}/users/${walletId}/activeWallet`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};
