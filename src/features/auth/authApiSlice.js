import { apiSlice } from "../../app/api/apiSlice"
import { logOut } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    login: builder.mutation({
      query: credentials => ({
        url: '/auth',
        method: 'POST',
        body: { ...credentials }
      })
    }),
  })
})

export const {
  useLoginMutation
} = authApiSlice 
