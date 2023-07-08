import { store } from "../../app/store"
import { accommodationsApiSlice } from "../accommodations/accommodationsApiSlice"
import { useEffect } from "react"
import { Outlet } from "react-router-dom"

const Prefetch = () => {
  useEffect(() => {
    console.log('subscribing')
    const accommodations = store.dispatch(accommodationsApiSlice.endpoints.getAccommodations.initiate())// initiates a request to fetch bookings data from an API using the getBookings endpoint defined in your RTK Query API slice. The result of this action is stored in the bookings variable for further use in your application.
    //if someone hits the refresh or reloads the app, data on the form/page is not lost. data reloads because we are already subscribed. And app hits Prefetch before it hits the component that the user is on. In App.js everything wrapped in Prefetch

    return () => {
      console.log('unsubscribing')
      accommodations.unsubscribe()
    }
  }, [])

  return <Outlet/>
}

export default Prefetch
