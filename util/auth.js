import axios from "axios";

const API_URL = "http://10.15.8.197:3000/users";

export const createUser = async (
  email,
  password,
  confirmPassword,
  username
) => {
  const response = await axios.post(`${API_URL}/create`, {
    email,
    password,
    confirmPassword,
    username,
  });

  return response.status === 201;
};

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}`, {
    email,
    password,
  });

  return response.data;
};
