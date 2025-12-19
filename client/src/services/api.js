import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle responses
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getCurrentUser: () => api.get('/users/me'),
  updateProfile: (userData) => api.put('/users/profile', userData),
};

export const opportunityAPI = {
  getAll: (params) => api.get('/opportunities', { params }),
  getById: (id) => api.get(`/opportunities/${id}`),
  create: (data) => api.post('/opportunities', data),
  signUp: (id) => api.post(`/opportunities/${id}/signup`),
  cancel: (id) => api.post(`/opportunities/${id}/cancel`),
  update: (id, data) => api.put(`/opportunities/${id}`, data),
  delete: (id) => api.delete(`/opportunities/${id}`),
};

export const organizationAPI = {
  getAll: () => api.get('/organizations'),
  getById: (id) => api.get(`/organizations/${id}`),
  create: (data) => api.post('/organizations', data),
};

export default api;