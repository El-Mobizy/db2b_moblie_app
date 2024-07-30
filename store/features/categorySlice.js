// src/features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api';

const initialState = { 
  category: null,
  activeCategory: null,
  data: null,
  error : "",
  isLoading: false
};
// Thunk pour recuperer la liste de toutes les categories
export const getAllCategory = createAsyncThunk(
  'category/all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('category/all');      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    initialiseData : (state, action) => {
      state.data = null
    },
    setActiveCategory: (state, action) => {
      console.log('Valeur recue', action.payload);
      state.activeCategory = Object.entries(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.category = action.payload.data
        state.activeCategory = action.payload.data[0].subcategories
      })
      .addCase(getAllCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = action.payload
      })
  },
});

export const { initialiseData, setActiveCategory } = categorySlice.actions;

export default categorySlice.reducer;
