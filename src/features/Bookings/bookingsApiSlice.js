import { createEntityAdapter, createSelector } from "@reduxjs/toolkit"
import { apiSlice } from "../../app/api/apiSlice"

const bookingsAdapter = createEntityAdapter({})

const initialState = bookingsAdapter.getInitialState()

export const bookingsApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getBookings: builder.query({
      query: () => ({
        url: '/bookings',
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError
        },
      }),
      transformResponse: responseData => {
        const loadedBookings = responseData.map(booking => {
          booking.id = booking._id
          return booking
        })
        return bookingsAdapter.setAll(initialState, loadedBookings)
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: 'Booking', id: 'LIST' },
            ...result.ids.map(id => ({ type: 'Booking', id }))
          ]
        } else return [{ type: 'Booking', id: 'LIST'}]
      }
    }),
    getBooking: builder.query({
      queryFn: (bookingId) => {
        console.log(bookingId)
        return {
          url: `/bookings/${bookingId}`,
          validateStatus: (response, result) => {
            return response.status === 200 && !result.isError
          },
        };
      },
      transformResponse: (responseData) => {
        console.log(responseData)
        const loadedBooking = { ...responseData, id: responseData._id }
        return bookingsAdapter.setOne(initialState, loadedBooking)
      },
      providesTags: (result, error, id) => [
        { type: "Booking", id: id }
      ]
    }),
    addNewBooking: builder.mutation({
      query: initialBookingData => ({
        url: '/bookings',
        method: 'POST',
        body: {
          ...initialBookingData,
        }
      }),
      invalidatesTags: [
        { type: 'Booking', id: "LIST" }
      ]
    }),
  })
})

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useAddNewBookingMutation
} = bookingsApiSlice

export const selectBookingsResult = bookingsApiSlice.endpoints.getBookings.select()

const selectBookingsData = createSelector(
  selectBookingsResult,
  bookingsResult => bookingsResult.data
)

export const {
  selectAll: selectAllBookings,
  selectById: selectBookingById,
  selectIds: selectBookingIds
} = bookingsAdapter.getSelectors(state => selectBookingsData(state) ?? initialState)
