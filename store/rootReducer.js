import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // utilise le stockage local pour persister les états
import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import userReducer from './features/userSlice';
import categoryReducer from './features/categorySlice';
import productReducer from './features/productSlice'
const persistConfig = {
  key: 'root',
  storage: AsyncStorage, // Utiliser AsyncStorage pour le stockage persistant
};

const UserpersistedReducer = persistReducer(persistConfig, userReducer);
const CategorypersistedReducer = persistReducer(persistConfig, categoryReducer);
const ProductpersistedReducer = persistReducer(persistConfig, productReducer);

const rootReducer = combineReducers({
  user: UserpersistedReducer,
  category : CategorypersistedReducer,
  products : ProductpersistedReducer
});

export default rootReducer;
