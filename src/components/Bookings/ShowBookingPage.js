import BookingDates from "./BookingDates"
import AddressLink from "../Accommodations/AddressLink"
import AccommodationGallery from "../Accommodations/AccommodationGallery"

const ShowBookingPage = () => {
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
