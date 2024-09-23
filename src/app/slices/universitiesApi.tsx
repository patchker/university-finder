import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const universitiesApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://universities.hipolabs.com/search'}),
    endpoints: (builder) => ({
        getCountryByName: builder.query({
            query: (country: string) => `?country=${country}`,

        }),
    }),

});

export const {useGetCountryByNameQuery} = universitiesApi;
