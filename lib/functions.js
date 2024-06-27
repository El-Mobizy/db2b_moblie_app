import * as SecureStore from 'expo-secure-store';
// import api, { storeToken } from './api';
import { Alert } from 'react-native';

// Fonction d'inscription
const register = async (telephone, email) => {
  const RegisterData = {
    phone: telephone,
    country_id : 1,
    email : email,
    password: 'Jojo@2003',
    password_confirmation : 'Jojo@2003'
  }
    try {
      const response = await api.post('users/register', RegisterData);
      console.log(response.data);
      Alert.alert(response.data)
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      Alert.alert('Erreur lors de l\'inscription :', error)
    }
  };

  // Fonction d'envoi du mail
  const sendMail = async (email) => {
      try {
        const response = await api.post('/users/validateEmail', {email});
        console.log(response.data);
        return response.data
      }
      catch(error) {
        console.log(error);
        return error
      }
  };
  // Fonction de connexion
  const login = async (username, password) => {
    try {
      const response = await api.post('/login', { username, password });
      const { token } = response.data;
      await storeToken(token);
      return true;
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      return false;
    }
  };
  
  // Fonction de déconnexion
  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync('userToken');
      return true;
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error);
      return false;
    }
  };
  
  // Fonction pour récupérer les informations de l'utilisateur connecté
const getUserInfo = async () => {
    try {
      const response = await api.get('/user');
      const userInfos = response.data
      return userInfos;
    } catch (error) {
      console.error('Erreur lors de la récupération des informations de l\'utilisateur :', error);
      return null;
    }
  };


  export { register, login, logout, getUserInfo, sendMail };