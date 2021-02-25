import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.github.com',
});

if (process.env.API_TOKEN) {
  api.defaults.headers.common.Authorization = `Bearer ${process.env.API_TOKEN}`;
}

export default api;
