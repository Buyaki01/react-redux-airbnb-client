import { apiSlice } from "../../app/api/apiSlice"

export const profileApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    fetchProfile: builder.query({
      query: () => '/profile',
    }),
  })
})
