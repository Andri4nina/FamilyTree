import axios from 'axios';
import Cookies from 'js-cookie';


const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";


const authService = {
  DoLogin: async (user) => {
    try {
      return await axios.post(`${API}/auth/login`, user);
    } catch (error) {
      return { error: error.response ? error.response.data.message : error.message };
    }
  },
};


// Fonction pour déclencher l'événement authChange
const triggerAuthChange = () => {
  const event = new Event('authChange');
  window.dispatchEvent(event);
};

// Fonction pour gérer la connexion
export const login = (token) => {
  Cookies.set('token', token);
  triggerAuthChange();
};

// Fonction pour gérer la déconnexion
export const logout = () => {
  Cookies.remove('token');
  triggerAuthChange();
};


export default authService;
