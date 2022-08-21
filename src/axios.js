import axios from 'axios';
// const API_URL = 'https://conama-server.herokuapp.com';
const API_URL = 'http://localhost:5000';

export const axiosPublic = axios.create({
  baseURL: API_URL,
});

export const axiosPrivate = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
