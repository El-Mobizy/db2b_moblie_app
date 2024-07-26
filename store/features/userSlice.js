// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { storeSecure, getSecure } from '../api';

const initialState = {
  phone: '',
  country_id : 1,
  email: '',
  password: '',
  password_confirmation : '',
  isLoading: false,
  isValid: {
    mail: false,
    number: false,
    password: false,
  },
  data: null,
  error : "",
  IpAdress : "",
  token: null,
  userId: null,
  uid: null,
};
// Thunk pour l'inscription
export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async (userInfo, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/register', userInfo);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk pour la connexion
export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (datalogin, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/login', datalogin);
      console.log("je suis apres la fonction", response.data)
      return response.data;  
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk pour la connexion
export const getUserInfo = createAsyncThunk(
  'user',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('user');
      return response.data;  
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk pour blocker apres 3 tentatives infructueuses de connexion
export const blockUser = createAsyncThunk(
  'user/blockUser',
  async (datablock, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/restrictedUser', datablock);
      console.log("Donnes initiales pour le blocage", response.data);  

      return response.data;
    } catch (error) {
      console.log("Donnes initiales pour le blocage en cas de blocage", error.response.response);
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk pour l'envoi du mail de connexion
export const sendMail = createAsyncThunk(
  'user/sendMail',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/validateEmail', credentials);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk pour l'envoi du mail de connexion
export const recoverPassword = createAsyncThunk(
  'users/password_recovery_start_step',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('users/password_recovery_start_step', credentials);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk pour l'envoi du mail de connexion
export const sendCode = createAsyncThunk(
  'users/verification_code',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('users/verification_code', credentials);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const sendRecoveryCode = createAsyncThunk(
  'users/password_recovery_second_step',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('users/password_recovery_second_step', credentials);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const sendRecoveryPassword = createAsyncThunk(
  'users/password_recovery_end_step',
  async (credentials, { rejectWithValue }) => {
    const route = 'users/password_recovery_end_step/'+credentials.uid
    try {
      const response = await api.post(route, credentials.data);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// Thunk pour l'envoi du mail de connexion
export const getNewCode = createAsyncThunk(
  'users/new_code',
  async (userId, { rejectWithValue }) => {
    try {
      const route = 'users/new_code/'+userId;
      const response = await api.post(route);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setTelephone: (state, action) => {
      state.phone = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    setPasswordConfirmation: (state, action) => {
      state.password_confirmation = action.payload 
    },
    setIp: (state, action) => {
      state.IpAdress = action.payload;
    },
    setValidation: (state, action) => {
      state.isValid[action.payload.field] = action.payload.isValid;
    },
    initialiseData : (state, action) => {
      state.data = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = action.payload
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = action.payload.user.id
        if (action.payload.access_token) {
          const token = action.payload.access_token
          storeSecure('userToken', token)
        }
        

        // Mettre à jour l'état avec les données de l'utilisateur connecté
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sendMail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendMail.fulfilled, (state, action) => {
        state.isLoading = false;
        // Mettre à jour l'état avec les données de l'utilisateur connecté
      })
      .addCase(sendMail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sendCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendCode.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sendRecoveryCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendRecoveryCode.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendRecoveryCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(sendRecoveryPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendRecoveryPassword.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(sendRecoveryPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getNewCode.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getNewCode.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getNewCode.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(getUserInfo.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(recoverPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(recoverPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload.uid);
        state.uid = action.payload.uid
      })
      .addCase(recoverPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { setEmail, setTelephone, setPassword, setPasswordConfirmation, setIp, initialiseData, setValidation } = userSlice.actions;

export default userSlice.reducer;
