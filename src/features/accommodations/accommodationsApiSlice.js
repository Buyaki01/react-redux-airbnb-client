import { createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const accommodationsAdapter = createEntityAdapter({})

const initialState = accommodationsAdapter.getInitialState()

export const accommodationsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAccommodations: builder.query({
      query: () => '/accommodations',
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError
      },
      transformResponse: responseData => {
        const loadedAccommodations = responseData.map(accommodation => {
          accommodation.id = accommodation._id
          return accommodation
        });
        return accommodationsAdapter.setAll(initialState, loadedAccommodations)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Accommodation', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Accommodation', id }))
          ]
        } else return [{ type: 'Accommodation', id: 'LIST'}]
      }
    }),
    updateAccommodation: builder.mutation({
      query: initialAccommodationData => ({
        url: `/accommodations`,
        method: 'PATCH',
        body: {
          ...initialAccommodationData,
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Accommodation', id: arg.id }
      ]
    }),
    deleteAccommodation: builder.mutation({
      query: ({ id }) => ({
        url: `/accommodations`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Accommodation', id: arg.id}
      ]
    }),
  })
})

export const {
  useGetAccommodationsQuery,
  useUpdateAccommodationMutation,
  useDeleteAccommodationMutation,
} = accommodationsApiSlice

export const selectAccommodationsResult = accommodationsApiSlice.endpoints.getAccommodations.select(
  (state) => state.data //Only selects the data property from the state using the select() method
)

export const {
  selectAll: selectAllAccommodations,
  selectById: selectAccommodationById,
  selectIds: selectAccommodationIds
} = accommodationsAdapter.getSelectors(state => selectAccommodationsResult(state) ?? initialState)
