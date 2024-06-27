// src/store/rootReducer.js
import { combineReducers } from 'redux';
import userReducer from './features/userSlice';
import categoryReducer from './features/categorySlice';
import productReducer from './features/productSlice'
const rootReducer = combineReducers({
  user: userReducer,
  category : categoryReducer,
  products : productReducer
});

export default rootReducer;
