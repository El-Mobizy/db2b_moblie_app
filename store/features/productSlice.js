import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { storeSecure, getSecure } from '../api';
import * as SecureStore from 'expo-secure-store';

const initialState = { 
  products: [],
  cart: [],
  total: null,
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
export const getDataFromSecureStore = createAsyncThunk(
  'secureStore/getData',
  async (key, { rejectWithValue }) => {
    try {
      const dataJSON = await SecureStore.getItemAsync(key); // Récupère les données depuis Secure Store avec la clé donnée
      
      const data = JSON.parse(dataJSON) || []; // Convertit les données JSON en objet JavaScript
      console.log('les produits', data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message); // Gère les erreurs avec rejectWithValue pour les traitements de rejet
    }
  }
);
export const storeDataInSecureStore = createAsyncThunk(
  'secureStore/storeData',
  async ({ key, data }, { rejectWithValue }) => {
    try {
      const dataJSON = JSON.stringify(data); // Convertit les données en JSON
      await SecureStore.setItemAsync(key, dataJSON); // Stocke les données dans Secure Store avec la clé donnée
      return data;
    } catch (error) {
      return rejectWithValue(error.message); // Gère les erreurs avec rejectWithValue pour les traitements de rejet
    }
  }
);
// Fonction pour basculer les favoris
// export const toggleFavorite = createAsyncThunk(
//   'products/toggleFavorite',
//   async (productId, { rejectWithValue }) => {
//     try {
//       const storedProductsJSON = getSecure('AllProducts');
//       let storedProducts = JSON.parse(storedProductsJSON);
//       const updatedProducts = storedProducts.map(product => {
//         if (product.id === productId) {
//           return { ...product, is_favorite: !product.is_favorite };
//         }
//         return product;
//       });
//       await SecureStore.setItemAsync('products', JSON.stringify(updatedProducts));
//       return updatedProducts;
//     } catch (error) {
//       return rejectWithValue(error.message);
//     }
//   }
// );


export const toggleToFavorite = createAsyncThunk(
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
export const getListCart = createAsyncThunk(
  'cart/getUserCart/{page}/{perPage}', 
  async (_, { rejectWithValue }) => {
    const route = 'cart/getUserCart/1/20';
    try {
      const response = await api.get(route);      
      console.log('donnés de la carte', response.data);
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
    incrementQuantity: (state, action) => {
      const product = state.cart.find(item => item.ad_id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.cart.find(item => item.ad_id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    resetQuantity: (state, action) => {
      const product = state.cart.find(item => item.ad_id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity = 1;
      }
    },
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
        // storeSecure('AllProducts', state.products);
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        // state.products = action.payload;
      })
      .addCase(toggleToFavorite.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(toggleToFavorite.fulfilled, (state, action) => {
        state.isLoading = false;
        const wishlist = JSON.stringify(action.payload.data);
        storeSecure('Wishlist', wishlist)
      })
      .addCase(toggleToFavorite.rejected, (state, action) => {
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
      .addCase(getListCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getListCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data.data;
        state.total = action.payload.data.total;
      })
      .addCase(getListCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.data = action.payload;
      })
      .addCase(getDataFromSecureStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getDataFromSecureStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getDataFromSecureStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(storeDataInSecureStore.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(storeDataInSecureStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(storeDataInSecureStore.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  },
});

export const { initialiseData, incrementQuantity, decrementQuantity, resetQuantity } = ProductSlice.actions;

export default ProductSlice.reducer;
