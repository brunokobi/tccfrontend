import axios from 'axios';

const api = axios.create({
  baseURL: "https://radiant-gorge-04331.herokuapp.com",
});

export default api;