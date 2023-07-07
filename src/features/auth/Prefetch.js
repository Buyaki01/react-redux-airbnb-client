import { store } from "../../app/store"
import { accommodationsApiSlice } from "../accommodations/accommodationsApiSlice"
import { bookingsApiSlice } from "../Bookings/bookingsApiSlice"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')
    const bookings = store.dispatch(bookingsApiSlice.endpoints.getBookings.initiate())
    const accommodations = store.dispatch(accommodationsApiSlice.endpoints.getAccommodations.initiate())// initiates a request to fetch bookings data from an API using the getBookings endpoint defined in your RTK Query API slice. The result of this action is stored in the bookings variable for further use in your application.

    return () => {
      console.log('unsubscribing')
      bookings.unsubscribe()
      accommodations.unsubscribe()
    }
  }, [])

  return <Outlet/>
}

export default Prefetch
