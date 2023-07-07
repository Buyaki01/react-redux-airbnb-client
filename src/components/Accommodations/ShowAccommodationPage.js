import AddressLink from "./AddressLink"
import AccommodationGallery from "./AccommodationGallery"
import CreateNewBooking from "../Bookings/CreateNewBooking"

const ShowAccommodationPage = () => {
  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">title</h1>

      {/* <AddressLink accommodation={accommodation} /> */}

      {/* <AccommodationGallery accommodation={accommodation} /> */}

      <div className="my-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl"> Description </h2>
            description
          </div>
          Check-In: checkIn <br/>
          Check-Out: checkOut <br/>
          Max number of guests: maxGuests
        </div>
        <div>
          <CreateNewBooking />
        </div>
      </div>
      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">extraInfo</div>
      </div>
    </div>
  )
}

export default ShowAccommodationPage
