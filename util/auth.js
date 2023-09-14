import axios from "axios";
import { API_URL } from "./constants";

const URL = `${API_URL}/users`;

export const createUser = async (
  email,
  password,
  confirmPassword,
  username
) => {
  const response = await axios.post(`${URL}/create`, {
    email,
    password,
    confirmPassword,
    username,
  });

  return response.status === 201;
};

export const login = async (email, password) => {
  const response = await axios.post(`${URL}`, {
    email,
    password,
  });

  return response.data;
};
