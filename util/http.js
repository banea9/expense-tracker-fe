import axios from "axios";
import { API_URL } from "./constants";

const BACKEND_URL = API_URL;

export const httpStoreExpense = async (expenseData) => {
  const response = await axios.post(
    `${BACKEND_URL}/expenses.json`,
    expenseData
  );
  const id = response.data.name; // firebase specific - this is the ID for the added expense generated by Firebase

  return id;
};

export const httpFetchExpense = async () => {
  const response = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const httpUpdateExpense = (id, expenseData) => {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
};

export const httpDeleteExpense = (id) => {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
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
  console.log(walletId);
  const response = await axios.patch(
    `${BACKEND_URL}/users/${walletId}/activeWallet`,
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("setActiveWallet:", response.data);
  return response.data;
};
