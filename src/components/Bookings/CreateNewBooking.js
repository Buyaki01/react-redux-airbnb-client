const CreateNewBooking = () => {
  return (
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: price / per night
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
  )
}

export default CreateNewBooking
