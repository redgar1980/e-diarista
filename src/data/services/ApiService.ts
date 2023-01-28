import axios from 'axios';

const baseUrl = 'http://localhost:8000';

export const ApiService = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});
