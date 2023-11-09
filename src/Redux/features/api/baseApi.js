import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),

    endpoints: (builder) => ({
        getForms: builder.query({
            query: (email) => `/forms/${email}`
        })
    })
})

export default baseApi