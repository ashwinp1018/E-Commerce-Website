import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://e-commerce-website-1-k4j8.onrender.com/api",
});

export default API;
