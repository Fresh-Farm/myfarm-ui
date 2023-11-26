import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userDetails from './slices/userDetailsSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import propertySlice from './slices/propertySlice';
import sideBarSlice from './slices/sideBarSlice';
import assetDataSlice from './slices/assetDataSlice';
import projectDetailsSlice from './slices/projectDetailsSlice';

const reducer = combineReducers({
    userDetails,
    propertySlice,
    sideBarSlice,
    assetDataSlice,
    projectDetailsSlice
});
const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store)