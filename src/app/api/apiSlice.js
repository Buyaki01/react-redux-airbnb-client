import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000',
  credentials: 'include',
  prepareHeaders: (headers, api) => {
    const token = api.getState().auth.token //getState(): retrieve the current state of the Redux store. 

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }
    return headers
  }
})

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['register', 'Accommodation', 'Booking'],
  endpoints: builder => ({})
})