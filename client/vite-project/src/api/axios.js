import axios from 'axios';

const API = axios.create({
<<<<<<< HEAD
  baseURL: 'https://e-commerce-website-1-k4j8.onrender.com/',
=======
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api', 
>>>>>>> ec6767e ( Minor Fixes)
});

export default API;
