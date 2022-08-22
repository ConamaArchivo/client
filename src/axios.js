import axios from 'axios';

export const axiosPublic = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: { 'Content-Type': 'multipart/form-data' },
  withCredentials: true,
});
