
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
const baseURL = 'http://192.168.100.159:8001/api/'; // Remplacez cela par l'URL de votre API

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // Durée d'attente maximale de 10 secondes pour les requêtes
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Intercepteur pour ajouter le token d'authentification à l'en-tête de la requête
axiosInstance.interceptors.request.use(
  async config => {
    const token = getSecure('userToken') // Obtenez le token utilisateur à partir de SecureStore
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axiosInstance;



// Fonction pour stocker le token
const storeSecure = async (name, credentials) => {
    try {
      await SecureStore.setItemAsync(name, credentials);
    } catch (error) {
      const message = 'Erreur lors de la sauvegarde du' + name + ':'
      console.error(message, error);
    }
  };
  const getSecure = async (name) => {
    try {
      await SecureStore.getItemAsync(name);
    } catch (error) {
      const message = 'Erreur lors de la sauvegarde du' + name + ':'
      console.error(message, error);
    }
  };
  export { storeSecure, getSecure };