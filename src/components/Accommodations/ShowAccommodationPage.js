import AddressLink from "./AddressLink"
import AccommodationGallery from "./AccommodationGallery"
import { useParams } from "react-router-dom"
import { useGetAccommodationsQuery } from "../../features/accommodations/accommodationsApiSlice"
import { useEffect } from "react"


const ShowAccommodationPage = () => {
  const { id } = useParams()

  const { accommodation } = useGetAccommodationsQuery("accommodationsList", {
    selectFromResult: ({ data }) => ({
      accommodation: data?.entities[id]
    })
  })

  useEffect(() => {
    
  }, [accommodation])

  // Wait for the data to load
  if (!accommodation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
      <h1 className="text-3xl">{accommodation.title}</h1>

      <AddressLink accommodation={accommodation} /> 

      <AccommodationGallery accommodation={accommodation} />

      <div className="my-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl"> Description </h2>
            {accommodation.description}
          </div>
          Check-In: {accommodation.checkIn} <br/>
          Check-Out: {accommodation.checkOut} <br/>
          Max number of guests: {accommodation.maxGuests}
        </div>

        <div>
          <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
              Price: ${accommodation.price} / per night
            </div>

            <div className="border rounded-2xl mt-4">
              <div className="flex">
                <div className="py-3 px-4">
                  <label htmlFor="checkIn"> Check In: </label>
                  <input type="date" id="checkIn" />
                </div>
                <div className="py-3 px-4 border-l">
                  <label htmlFor="checkOut"> Check Out: </label>
                  <input type="date" id="checkOut" />
                </div>
              </div>
              <div className="py-3 px-4 border-t">
                <label htmlFor="noOfGuests"> Number of guests: </label>
                <input type="number" id="noOfGuests" />
              </div>
            </div>

            {/* {noOfNights > 0 && ( */}
              <div className="py-3 px-4 border-t">
                <label htmlFor="guestName"> Your full name: </label>
                <input type="text" id="guestName" />

                <label htmlFor="guestMobile"> Phone Number: </label>
                <input type="tel" id="guestMobile" />
              </div>
            {/* )} */}

            <button 
              // onClick={bookThisPlace} 
              className="primary mt-4"
            > 
              Book this place 
              {/* {noOfNights > 0 && ( */}
                {/* <span> ${noOfNights * accommodation.price }</span> */}
              {/* )} */}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra Info</h2>
        </div>
        <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{accommodation.extraInfo}</div>
      </div>
    </div>
  )
}

export default ShowAccommodationPage
