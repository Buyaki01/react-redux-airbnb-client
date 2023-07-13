import BookingDates from "./BookingDates"
import AddressLink from "../Accommodations/AddressLink"
import AccommodationGallery from "../Accommodations/AccommodationGallery" 
import { useParams } from "react-router-dom"
import { selectAllBookings } from "../../features/Bookings/bookingsApiSlice"
import useAuth from "../../hooks/useAuth"
import { useSelector } from "react-redux"

const ShowBookingPage = () => {
  const { id: userId } = useAuth()
  
  const bookings = useSelector(selectAllBookings)

  const ownersBookings = bookings.filter((booking) => booking.userId === userId)

  const { id: bookingId } = useParams()

  const showOwnersBooking = ownersBookings.filter((booking) => booking._id === bookingId)

  console.log(showOwnersBooking[0])

  return (
    <div className="my-8">
      <h1 className="text-3xl">{showOwnersBooking[0]?.accomodationId}</h1>

      {/* <AddressLink accommodation={booking.accommodationId} className="my-2 block" /> */}

      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Your booking information:</h2>
          {/* <BookingDates booking={showOwnersBooking[0]} /> */}

        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total Price</div>
          <div className="text-2xl">${showOwnersBooking[0]?.price}</div>
        </div>
      </div>

      {/* <AccommodationGallery accommodation={booking.accommodationId} /> */}
    </div>
  )
}

export default ShowBookingPage
