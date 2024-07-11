import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  products: [],
  cart: [],
  total: null,
  error: "",
  isLoading: false,
};
const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload.id);
      if (product) {
        console.log('je suis dans le cas ou le produit existe deja');
        product.quantity += 1;
      } else {
        console.log('je suis dans le cas ou le produit nexiste pas');
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteFromCart: (state, action) => {
      state.cart = state.cart.filter(item => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      if (product) {
        product.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
    },
    resetQuantity: (state, action) => {
      const product = state.cart.find(item => item.id === action.payload);
      if (product) {
        product.quantity = 1;
      }
    },
    initialiseData: (state, action) => {
      state.cart = null;
    }
  }
});

export const { initialiseData, incrementQuantity, decrementQuantity, resetQuantity, deleteFromCart, addToCart } = CartSlice.actions;

export default CartSlice.reducer;


