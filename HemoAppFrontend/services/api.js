import axios from 'axios';

// URL base para a API
const api = axios.create({
  baseURL: 'http://localhost:5000/api/', // Substitua pelo endereço do seu back-end
});

export default api;
