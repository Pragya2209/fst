import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const getUserDetails = async () => {
    try {
      const token = localStorage.getItem('authToken')
      const response = await axios.get(`${API_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Get User Details Error:', error);
      throw error;
    }
  };