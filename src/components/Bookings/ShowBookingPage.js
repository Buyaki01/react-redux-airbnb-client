import BookingDates from "./BookingDates"
import AddressLink from "../Accommodations/AddressLink"
import AccommodationGallery from "../Accommodations/AccommodationGallery"
import useAuth from "../../hooks/useAuth"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { selectAllAccommodations } from "../../features/accommodations/accommodationsApiSlice"
import { selectAllBookings } from "../../features/Bookings/bookingsApiSlice"

const ShowBookingPage = () => {

  const { id: userId } = useAuth()

  const { bookingId, accommodationId } = useParams()

  const accommodations = useSelector(selectAllAccommodations)
  const bookings = useSelector(selectAllBookings)

  const accommodation = accommodations.find((accommodation) => accommodation._id === accommodationId)

  const booking = bookings.find((booking) => booking._id === bookingId && booking.userId === userId)

  return (
    <div className="my-8">
      <h1 className="text-3xl">{accommodation.title}</h1>

      <AddressLink accommodation={accommodation} className="my-2 block" /> 

      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total Price</div>
          <div className="text-2xl">{booking.price}</div>
        </div>
      </div>

      <AccommodationGallery accommodation={accommodation} />
    </div>
  )
}

export default ShowBookingPage
