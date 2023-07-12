import AddressLink from "./AddressLink"
import AccommodationGallery from "./AccommodationGallery"
import { useNavigate, useParams } from "react-router-dom"
import { useGetAccommodationsQuery } from "../../features/accommodations/accommodationsApiSlice"
import { useEffect, useState } from "react"
import { useAddNewBookingMutation } from "../../features/Bookings/bookingsApiSlice"
import { differenceInCalendarDays } from "date-fns"
import useAuth from "../../hooks/useAuth"

const ShowAccommodationPage = () => {
  const { id: accommodationId } = useParams()

  const { id: userId } = useAuth() 

  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [noOfGuests, setNoOfGuests] = useState(1)
  const [name, setName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')

  const navigate = useNavigate()

  const [addNewBooking, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewBookingMutation()

  const { accommodation } = useGetAccommodationsQuery("accommodationsList", {
    selectFromResult: ({ data }) => ({
      accommodation: data?.entities[accommodationId]
    })
  })

  useEffect(() => {
    
  }, [accommodation])

  useEffect(() => {
    if (isSuccess) {
      setCheckIn('')
      setCheckOut('')
      setNoOfGuests('')
      setName('')
      setMobileNumber('')
      navigate(`/mybookings`)
    }
  }, [isSuccess, navigate])

  // Wait for the data to load
  if (!accommodation) {
    return <div>Loading...</div>;
  }

  let noOfNights = 0
  if (checkIn && checkOut) {
    noOfNights = differenceInCalendarDays(new Date (checkOut), new Date (checkIn))
  }

  const canSave = [checkIn, checkOut, noOfGuests, name, mobileNumber].every(Boolean) && !isLoading

  const bookThisPlace = async (e) => {
    e.preventDefault()
    if (canSave) {
      await addNewBooking({ accommodationId: accommodationId, userId: userId, checkIn, checkOut, noOfGuests, name, mobileNumber, price: noOfNights * accommodation.price })
    }
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
                  <input type="date" id="checkIn" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                </div>
                <div className="py-3 px-4 border-l">
                  <label htmlFor="checkOut"> Check Out: </label>
                  <input type="date" id="checkOut" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                </div>
              </div>
              <div className="py-3 px-4 border-t">
                <label htmlFor="noOfGuests"> Number of guests: </label>
                <input type="number" id="noOfGuests" value={noOfGuests} onChange={e => setNoOfGuests(e.target.value)} />
              </div>
            </div>

            {noOfNights > 0 && (
              <div className="py-3 px-4 border-t">
                <label htmlFor="guestName"> Your full name: </label>
                <input type="text" id="guestName" value={name} onChange={e => setName(e.target.value)}/>

                <label htmlFor="guestMobile"> Phone Number: </label>
                <input type="tel" id="guestMobile" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} />
              </div>
            )}

            <button 
              onClick={bookThisPlace} 
              className="primary mt-4"
            > 
              Book this place 
              {noOfNights > 0 && (
                <span> ${noOfNights * accommodation.price }</span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white -mx-8 px-8 py-8 border-t">
        <div>
          <div>
            <h2 className="font-semibold text-2xl">Extra Info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{accommodation.extraInfo}</div>
        </div>

        <div className="mt-3">
          <div>
            <h2 className="font-semibold text-2xl">What this place offers</h2>
          </div>
          <div className="m-2">
            {accommodation.features.map((feature) => (
              <div
                key={feature}
              >
                {feature === 'Wifi' && (
                  <label className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
                    </svg>
                    <span>Wifi</span>
                  </label>
                )}

                {feature === 'Parking Lot' && (
                  <label className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                    </svg>
                    <span>Free Parking Spot</span>
                  </label>
                )}

                {feature === 'Television' && (
                  <label className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125z" />
                    </svg>
                    <span>TV</span>
                  </label>
                )}

                {feature === 'CCTV' && (
                  <label className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <span>CCTV</span>
                  </label>
                )}

                {feature === 'Private Entrance' && (
                  <label className="flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                    </svg>
                    <span>Private Entrance</span>
                  </label>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}

export default ShowAccommodationPage
