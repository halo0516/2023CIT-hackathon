import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080'
});

const baseURL = 'http://localhost:8080';

export const register = async (newUser) => {
    try {
      const response = await axios.post(`${baseURL}/users`, newUser);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  };