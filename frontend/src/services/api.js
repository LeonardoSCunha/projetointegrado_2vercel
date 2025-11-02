import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/api' 
  : 'http://localhost:3001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para adicionar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para lidar com erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials) => api.post('/authenticate', credentials),
};

export const patientAPI = {
  getAll: () => api.get('/patient'),
  getById: (id) => api.get(`/patient?id=${id}`),
  create: (data) => api.post('/patient', data),
  update: (data) => api.put('/patient', data),
  delete: (id) => api.delete(`/patient?id=${id}`),
};

export const activityAPI = {
  getFixed: () => api.get('/fixed-activitie'),
  getHistory: () => api.get('/history-activitie'),
  createHistory: (data) => api.post('/history-activitie', data),
};

export default api;