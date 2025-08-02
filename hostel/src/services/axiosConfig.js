import axios from 'axios';

// Interceptor para agregar token a todas las peticiones
axios.interceptors.request.use(
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

// Interceptor para manejar respuestas y tokens expirados
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Solo limpiar localStorage y redirigir si NO estamos en un proceso de login
      // Verificar si la URL contiene '/login' en el endpoint
      const isLoginRequest = error.config?.url?.includes('/personas/login');
      
      if (!isLoginRequest) {
        // Token expirado o inválido - limpiar y redirigir
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        
        // Solo redirigir si no estamos ya en login
        if (window.location.pathname !== '/login' && window.location.pathname !== '/') {
          window.location.href = '/';
        }
      }
      // Si es un request de login, no hacer nada, dejar que el error se propague
    }
    return Promise.reject(error);
  }
);

export default axios;
