import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface PopulationCount {
    year: number;
    value: number;
}


interface PopulationResponse {
    data: {
        country: string;
        iso3: string;
        populationCounts: PopulationCount[];
    };
}


export const populationApi = createApi({
    reducerPath: 'populationApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://countriesnow.space/api/v0.1/countries'}),
    endpoints: (builder) => ({
        postCountryPopulation: builder.mutation<PopulationResponse, string>({ // Typed mutation
            query: (country) => ({
                url: '/population',
                method: 'POST',
                body: {country},
            }),
        }),
    }),
});

export const {usePostCountryPopulationMutation} = populationApi;
