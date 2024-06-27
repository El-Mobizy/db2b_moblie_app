import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { storeSecure, getSecure } from '../api';
import * as SecureStore from 'expo-secure-store';

const initialState = { 
  products: [],
  error: "",
  isLoading: false,
};

// Thunk pour récupérer la liste de tous les produits
export const getAllProducts = createAsyncThunk(
  'ad/all',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('ad/all');      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);
export const getProductsFromSecureStore = createAsyncThunk(
  'products/fetchProductsFromSecureStore',
  async (_, { rejectWithValue }) => {
    try {
      const productsJSON = getSecure('Allproducts'); // Récupère les produits depuis SecureStore
      const products = JSON.parse(productsJSON) || []; // Convertit les produits JSON en objet JavaScript
      return products;
    } catch (error) {
      return rejectWithValue(error.message); // Gère les erreurs avec rejectWithValue pour les traitements de rejet
    }
  }
);
// Fonction pour basculer les favoris
export const toggleFavorite = createAsyncThunk(
  'products/toggleFavorite',
  async (productId, { rejectWithValue }) => {
    try {
      const storedProductsJSON = getSecure('AllProducts');
      let storedProducts = JSON.parse(storedProductsJSON);
      const updatedProducts = storedProducts.map(product => {
        if (product.id === productId) {
          return { ...product, is_favorite: !product.is_favorite };
        }
        return product;
      });
      await SecureStore.setItemAsync('products', JSON.stringify(updatedProducts));
      return updatedProducts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const addToFavorite = createAsyncThunk(
  'favorite/addToFavorite', 
  async (adId, { rejectWithValue }) => {
    const route = `favorite/addAdToFavorite/${adId}`;
    try {
      const response = await api.post(route);      
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getAllFavorites = createAsyncThunk(
  'favorite/GetFavoritesAd/1/20', 
  async (_, { rejectWithValue }) => {
    const route = 'favorite/GetFavoritesAd/1/20';
    try {
      const response = await api.get(route);      
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (credentials, { rejectWithValue }) => {
    const route = `cart/addToCart/${credentials}`;
    try {
      const response = await api.post(route);      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);

export const getProductsOnCart = createAsyncThunk(
  'favorite/GetFavoritesAd/1/20', 
  async (_, { rejectWithValue }) => {
    const route = 'favorite/GetFavoritesAd/1/20';
    try {
      const response = await api.get(route);      
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    initialiseData: (state, action) => {
      state.data = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload.data;
        storeSecure('AllProducts', state.products);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // state.products = action.payload;
      })
      .addCase(addToFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(addToFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = action.payload;
      })
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = action.payload;
      })
      .addCase(getAllFavorites.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllFavorites.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getAllFavorites.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = action.payload;
      })
      .addCase(toggleFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
        storeSecure('AllProducts', state.products);
      })
      .addCase(toggleFavorite.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { initialiseData } = ProductSlice.actions;

export default ProductSlice.reducer;
