import axios from 'axios';

export default axios.create({
  // baseURL: 'http://localhost:8080'
  baseURL: 'http://localhost:3500'
});

// const baseURL = 'http://localhost:8080';
// const baseURL = 'http://localhost:3500';

export const register = async (newUser) => {
    try {
      // const response = await axios.post(`${baseURL}/users`, newUser);
      const response = await axios.post('http://localhost:3500/account',newUser);
      return response;
    } catch (err) {
      throw new Error(err);
    }
  };