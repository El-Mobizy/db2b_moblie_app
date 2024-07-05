
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
    const token = await SecureStore.getItemAsync('userToken') // Obtenez le token utilisateur à partir de SecureStore
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
    const response = await SecureStore.setItemAsync(name, credentials);
                console.log(response);
return response
    } catch (error) {
      const message = 'Erreur lors de la sauvegarde du' + name + ':'
      console.error(message, error);
    }
  };
  const getSecure = async (name) => {
    try {
     const response = await SecureStore.getItemAsync(name);
     console.log('Token du user', response);
      return response
    } catch (error) {
      const message = 'Erreur lors de la sauvegarde du' + name + ':'
      console.error(message, error);
    }
  };
  export { storeSecure, getSecure };