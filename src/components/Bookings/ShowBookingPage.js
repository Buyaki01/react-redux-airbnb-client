import BookingDates from "./BookingDates"
import AddressLink from "../Accommodations/AddressLink"
import AccommodationGallery from "../Accommodations/AccommodationGallery"
import useAuth from "../../hooks/useAuth"
import { useSelector } from "react-redux"
import { useGetBookingByIdQuery } from "../../features/Bookings/bookingsApiSlice" 
import { useParams } from "react-router-dom"
import { selectAllAccommodations } from "../../features/accommodations/accommodationsApiSlice"

const ShowBookingPage = () => {

  const { id: userId } = useAuth()

  const { id: bookingId } = useParams()

  const { data: booking, isLoading, isSuccess, isError, error } = useGetBookingByIdQuery(bookingId)

  console.log(booking)

  // const accommodation = accommodations.find((accommodation) => accommodation._id === ownersBookings.accommodationId)

  return (
    <div className="my-8">
      <h1 className="text-3xl">title</h1>

      {/* <AddressLink accommodation={booking.accommodationId} className="my-2 block" /> */}

      <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">Your booking information:</h2>
          {/* <BookingDates booking={booking} /> */}
        </div>
        <div className="bg-primary p-6 text-white rounded-2xl">
          <div>Total Price</div>
          <div className="text-2xl">price</div>
        </div>
      </div>

      {/* <AccommodationGallery accommodation={booking.accommodationId} /> */}
    </div>
  )
}

export default ShowBookingPage
