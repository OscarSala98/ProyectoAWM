import axios from 'axios';

const URLbase = 'http://localhost:3002/api/';

const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await axios.post(`${URLbase}personas/login`, credentials);
      
      if (response.data.token) {
        // Guardar token y usuario en localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.persona));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error de conexión' };
    }
  },

  // Registro
  register: async (userData) => {
    try {
      const response = await axios.post(`${URLbase}personas/register`, userData);
      
      if (response.data.token) {
        // Guardar token y usuario en localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify({
          id: response.data.id,
          primerNombre: response.data.primerNombre,
          segundoNombre: response.data.segundoNombre,
          primerApellido: response.data.primerApellido,
          prefijo: response.data.prefijo,
          numero: response.data.numero,
          correo: response.data.correo,
          tipo: response.data.tipo,
          foto: response.data.foto
        }));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error de conexión' };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
  },

  // Obtener token
  getToken: () => {
    return localStorage.getItem('token');
  },

  // Obtener usuario actual
  getCurrentUser: () => {
    const user = localStorage.getItem('usuario');
    return user ? JSON.parse(user) : null;
  },

  // Verificar si está autenticado
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // Obtener perfil del usuario (usando el middleware protect)
  getProfile: async () => {
    try {
      const response = await axios.get(`${URLbase}personas/perfil`);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Error al obtener perfil' };
    }
  },

  // Actualizar datos del usuario en localStorage
  updateUserData: (userData) => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      localStorage.setItem('usuario', JSON.stringify(updatedUser));
    }
  }
};

export default authService;
