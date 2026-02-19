import axios from "axios";

const api = axios.create({
  baseURL: "https://vodjenje-firme-backend.onrender.com"
});

export default api;
