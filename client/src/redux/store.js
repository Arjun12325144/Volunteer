import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import opportunityReducer from './slices/opportunitySlice';
import themeReducer from './slices/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    opportunities: opportunityReducer,
    theme: themeReducer,
  },
});

export default store;