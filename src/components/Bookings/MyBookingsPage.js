import React from "react"
import { Link } from "react-router-dom"
import BookingDates from "./BookingDates"
import useAuth from "../../hooks/useAuth"
import { useSelector } from "react-redux"
import {
  selectAllBookings,
  useGetBookingsQuery,
} from "../../features/Bookings/bookingsApiSlice"
import { selectAllAccommodations } from "../../features/accommodations/accommodationsApiSlice"

const MyBookingsPage = () => {
  const { id: userId } = useAuth()

  const accommodations = useSelector(selectAllAccommodations)

  const { isLoading } = useGetBookingsQuery()

  const bookings = useSelector(selectAllBookings)

  const ownersBookings = bookings.filter((booking) => booking.userId === userId)

  return (
    <div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : ownersBookings.length > 0 ? (
          ownersBookings.map((booking) => {
            const matchingAccommodation = accommodations.find(
              (accommodation) => accommodation.id === booking.accommodationId
            )

            return matchingAccommodation ? (
              <Link
                key={booking.id}
                to={`/booking/${booking.id}/${matchingAccommodation.id}`}
                className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-3"
              >
                <div className="w-48">
                  <img
                    className="object-cover"
                    src={`https://airbnb-app-server.onrender.com/images/${matchingAccommodation.photos[0]}`}
                    alt=""
                  />
                </div>
                <div className="py-3 pr-3 grow">
                  <div className="text-xl">
                    <h2 className="text-xl">{matchingAccommodation.title}</h2>

                    <BookingDates booking={booking} />

                    <div>
                      <span className="text-2xl">
                        Total price: ${booking.price}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ) : null
          })
        ) : (
          <div className="text-center">
            <p className="text-xl"> No Booking Found.</p>
            <p>Want to book an airbnb? Kindly go to the <Link to={'/'} className="link-color">Home page</Link> and select an airbnb of your choice and book it </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default MyBookingsPage
