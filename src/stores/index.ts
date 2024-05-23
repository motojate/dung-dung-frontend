import { combineReducers, configureStore } from '@reduxjs/toolkit';
import loadingSlice from './loading/loadingSlice';

const rootReducer = combineReducers({ loadingReducer: loadingSlice.reducer });

const store = configureStore({ reducer: rootReducer });

export default store;
