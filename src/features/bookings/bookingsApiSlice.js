import { createSelector, createEntityAdapter } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const bookingsAdapter = createEntityAdapter({})

const initialState = bookingsAdapter.getInitialState()

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBookings: builder.query({
      query: () => ({
        url: '/bookings/mybookings',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        }
      }),
      keepUnusedDataFor: 60,
      transformResponse: responseData => { //responseData is from the query
        const loadedBookings = responseData.map(booking => {
          booking.id = booking._id
          return booking
        });
        return bookingsAdapter.setAll(initialState, loadedBookings)
      }, 
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Booking', id: 'LIST'},
            ...result.ids.map(id => ({ type: 'Booking', id }))
          ]
        } //If the result does not contain any ids, it means that the query or mutation did not retrieve or modify any specific items
        else return [{ type: 'Booking', id: 'LIST'}] //This tag represents the entire list or collection of Booking items, indicating that the cache should be updated or invalidated for the entire list

      }
    }),
  }),
})

export const {
  useGetBookingsQuery,
} = bookingsApiSlice

export const selectBookingsResult = bookingsApiSlice.endpoints.getBookings.select()

export const selectBookingsData = createSelector(
  selectBookingsResult,
  bookingsResult => bookingsResult.data
)

export const {
  selectAll: selectAllBookings,
  selectById: selectBookingById,
  selectIds: selectBookingIds
} = bookingsAdapter.getSelectors(state => selectBookingsData(state) ?? initialState)