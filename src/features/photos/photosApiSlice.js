import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const photosAdapter = createEntityAdapter({})

const initialState = photosAdapter.getInitialState()

export const photosApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addPhotoFromDevice: builder.mutation({
      query: initialUserData => ({
        url: '/upload/photo',
        method: 'POST',
        body: {
          ...initialUserData,
        }
      }),
      invalidatesTags: [
        { type: 'Photo', id: "LIST" }
      ]
    }),
  })
})

export const {
  useAddPhotoFromDeviceMutation,
} = photosApiSlice