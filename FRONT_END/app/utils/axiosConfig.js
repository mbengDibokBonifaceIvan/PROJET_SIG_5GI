// axiosConfig.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:8080", // URL de base de votre API
  headers: {
    "Content-Type": "application/json",
  },
});

// Exemple d'intercepteur pour gérer les erreurs
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Erreur API :", error.response || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
