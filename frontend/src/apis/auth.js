import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const signin = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signin`, userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
