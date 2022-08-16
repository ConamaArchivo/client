import axios from 'axios';
export const axiosInstance = axios.create({
  baseURL: 'https://conama-server.herokuapp.com/'
})