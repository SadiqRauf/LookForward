import {configureStore} from '@reduxjs/toolkit';

import userSlice from './reducers/auth';
import {combineReducers} from 'redux';
import auth from '../redux/reducers/auth';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
export const rootReducer = combineReducers({
  // auth,
  user: userSlice,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  // user: userSlice,
  reducer: persistedReducer,
});
