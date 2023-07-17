import { apiSlice } from "../../app/api/apiSlice"

export const photosApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    addPhotoByLink: builder.mutation({
      query: initialUserData => ({
        url: '/upload/photo/link',
        method: 'POST',
        body: {
          ...initialUserData,
        }
      }),
      invalidatesTags: [
        { type: 'Photo', id: "LIST" }
      ]
    }),
    addPhotoFromDevice: builder.mutation({
      query: (formData) => ({
        url: '/upload/photo',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [
        { type: 'Photo', id: "LIST" }
      ]
    }),
  })
})

export const {
  useAddPhotoByLinkMutation,
  useAddPhotoFromDeviceMutation,
} = photosApiSlice