import { createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const accommodationsAdapter = createEntityAdapter({})

const initialState = accommodationsAdapter.getInitialState()

export const accommodationsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllAccommodations: builder.query({
      query: () => ({
        url: '/accommodations',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      keepUnusedDataFor: 60,
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
    getAccommodation: builder.query({
      queryFn: (id) => {
        console.log('ID:', id); // Add this line to log the ID
    
        return {
          url: `/accommodations/${id}`,
          validateStatus: (response, result) => {
            console.log('Response:', response)
            return response.status === 200 && !result.isError
          }
        }
      },
      keepUnusedDataFor: 60,
      transformResponse: responseData => {
        const loadedAccommodation = {
          ...responseData,
          id: responseData._id
        };
        return accommodationsAdapter.upsertOne(initialState, loadedAccommodation)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Accommodation', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Accommodation', id }))
          ]
        } else return [{ type: 'Accommodation', id: 'LIST'}]
      }
    })
  })
})

export const {
  useGetAllAccommodationsQuery,
  useGetAccommodationQuery,
} = accommodationsApiSlice

export const selectAccommodationsResult = accommodationsApiSlice.endpoints.getAllAccommodations.select(
  (state) => state.data //Only selects the data property from the state using the select() method
)

export const {
  selectAll: selectAllAccommodations,
  selectById: selectAccommodationsById,
  selectIds: selectAccommodationsIds
} = accommodationsAdapter.getSelectors(state => selectAccommodationsResult(state) ?? initialState)

export const selectAccommodationResult = accommodationsApiSlice.endpoints.getAccommodation.select(
  (state) => state.data
)

export const {
  selectAll: selectAllAccommodation,
  selectById: selectAccommodationById,
  selectIds: selectAccommodationIds
} = accommodationsAdapter.getSelectors(state => selectAccommodationResult(state) ?? initialState)
