import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const accommodationsAdapter = createEntityAdapter({})

const initialState = accommodationsAdapter.getInitialState()

export const accommodationsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAccommodations: builder.query({
      query: () => ({
        url: '/accommodations',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      keepUnusedDataFor: 60,
      transformResponse: responseData => { //responseData is from the query
        const loadedAccommodations = responseData.map(accommodation => {
          accommodation.id = accommodation._id
          return accommodation
        });
        return accommodationsAdapter.setAll(initialState, loadedAccommodations)
      }, 
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Accommodation', id: 'LIST'},
            ...result.ids.map(id => ({ type: 'Accommodation', id }))
          ]
        } //If the result does not contain any ids, it means that the query or mutation did not retrieve or modify any specific items
        else return [{ type: 'Accommodation', id: 'LIST'}] //This tag represents the entire list or collection of Accommodation items, indicating that the cache should be updated or invalidated for the entire list

      }
    }),
    getAllAccommodationsForOwner: builder.query({
      query: () => ({
        url: '/accommodations/myaccommodations',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      keepUnusedDataFor: 60,
      transformResponse: responseData => { //responseData is from the query
        const loadedAccommodations = responseData.map(accommodation => {
          accommodation.id = accommodation._id
          return accommodation
        });
        return accommodationsAdapter.setAll(initialState, loadedAccommodations)
      }, 
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Accommodation', id: 'LIST'},
            ...result.ids.map(id => ({ type: 'Accommodation', id }))
          ]
        } //If the result does not contain any ids, it means that the query or mutation did not retrieve or modify any specific items
        else return [{ type: 'Accommodation', id: 'LIST'}] //This tag represents the entire list or collection of Accommodation items, indicating that the cache should be updated or invalidated for the entire list

      }
    }),
  }),
})

export const {
  useGetAccommodationsQuery,
  useGetAllAccommodationsForOwnerQuery,
} = accommodationsApiSlice

export const selectAccommodationsResult = accommodationsApiSlice.endpoints.getAccommodations.select()

export const selectAccommodationsData = createSelector(
  selectAccommodationsResult,
  accommodationsResult => accommodationsResult.data
)

export const {
  selectAll: selectAllAccommodations,
  selectById: selectAccommodationById,
  selectIds: selectAccommodationIds
} = accommodationsAdapter.getSelectors(state => selectAccommodationsData(state) ?? initialState)