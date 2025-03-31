import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const loginWithGoogle = () => {
  window.location.href = `${API_URL}/auth/google`;
};

export const getUser = async () => {
  try {
    const response = await axios.get(`${API_URL}/me`, { withCredentials: true });
    return response.data;
  } catch (error) {
    return null;
  }
};

export const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};
