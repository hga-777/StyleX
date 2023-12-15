import {configureStore} from '@reduxjs/toolkit';
import userReducer  from './user/userSlice.js';

export const store = configureStore({
    reducer: {user : userReducer},   //made changes here 
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });