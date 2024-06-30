// Import necessary functions and modules from Redux Toolkit and Redux Persist
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice"; // Import the user reducer from userSlice
import { persistReducer, persistStore } from "redux-persist"; // Import persistReducer from redux-persist
import storage from "redux-persist/lib/storage"; // Import storage from redux-persist (defaults to localStorage for web)

// Combine all the reducers into a single root reducer
const rootReducer = combineReducers({
  user: userReducer, // Add the user reducer under the 'user' key
});

// Configuration object for redux-persist
const persistConfig = {
  key: "root", // Key for the persisted state in storage
  version: 1, // Version of the persisted state
  storage: storage, // Storage engine to use (localStorage)
};

// Create a persisted reducer using the persistConfig and rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure and create the Redux store
export const store = configureStore({
  reducer: persistedReducer, // Use the persisted reducer for the 'user' key
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable check for middleware
    }),
});

export const persister = persistStore(store); // Create a persistor for the store
