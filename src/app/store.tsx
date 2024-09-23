import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { universitiesApi } from './slices/universitiesApi.tsx';
import { populationApi } from './slices/populationApi.tsx';

export const store = configureStore({
    reducer: {
        [universitiesApi.reducerPath]: universitiesApi.reducer,
        [populationApi.reducerPath]: populationApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(universitiesApi.middleware, populationApi.middleware),
});

setupListeners(store.dispatch);