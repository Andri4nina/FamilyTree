import axios from "axios";
import { io } from "socket.io-client";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

// Créer une connexion Socket.IO
const socket = io(API, {
  transports: ["websocket"], // Assurer que l'on utilise WebSocket uniquement
});

const userService = {
  // Obtenir tous les utilisateurs
  getAllUsers: () => {
    return axios.get(`${API}/users`);
  },

  // Sauvegarder un utilisateur
  saveUser: (user) => {
    return axios.post(`${API}/users`, user)
      .then((response) => {
        // Émettre un événement WebSocket après la création de l'utilisateur
        socket.emit('userCreated', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Erreur lors de la création de l'utilisateur", error);
        throw error;
      });
  },

  // Récupérer un utilisateur par son ID
  getUserById: (id) => {
    return axios.get(`${API}/users/${id}`);
  },

  // Supprimer un utilisateur par son ID
  deleteUser: (id) => {
    return axios.delete(`${API}/users/${id}`)
      .then((response) => {
        // Émettre un événement WebSocket après la suppression de l'utilisateur
        socket.emit('userDeleted', id);
        return response.data;
      })
      .catch((error) => {
        console.error("Erreur lors de la suppression de l'utilisateur", error);
        throw error;
      });
  },

  // Modifier un utilisateur
  editUser: (user, id) => {
    return axios.put(`${API}/users/${id}`, user)
      .then((response) => {
        // Émettre un événement WebSocket après la mise à jour de l'utilisateur
        socket.emit('userUpdated', response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour de l'utilisateur", error);
        throw error;
      });
  },

  // Créer un utilisateur admin
  addAdminUsers: () => {
    return axios.post(`${API}/users/admin`);
  },
};

export default userService;
