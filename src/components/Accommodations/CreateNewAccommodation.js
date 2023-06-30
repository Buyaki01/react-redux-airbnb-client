const CreateNewAccommodation = () => {
  return (
    <>  
      <div>
        <form>
          <label htmlFor="title" className="text-2xl mt-4">Title</label>
          <p id="title-description" className="text-gray-500 text-sm my-2"> Please enter the title for your apartment. Make sure it captures the attention of potential guests and accurately reflects the unique qualities of your space</p>
          <input id="title" aria-describedby="title-description" type="text" placeholder="Title, for example: My Lovely Apartment" />
          
          <label htmlFor="address" className="text-2xl mt-4">Address</label>
          <p id="address-description" className="text-gray-500 text-sm my-2"> Please enter the address to the location of your appartment, Make sure to include the Name of the Place, the Region/State and the Country.</p>
          <input id="address" aria-describedby="address-description" type="text" placeholder="address" />
          
          {/* <PhotosSection addPhoto={addPhoto} setAddPhoto={setAddPhoto}/> */}

          <label htmlFor="description" className="text-2xl mt-4">Description</label>
          <p id="accomodation-description" className="text-gray-500 text-sm my-2"> Kindly describe your accomodation in depth</p>
          <textarea type="" id="description" aria-describedby="accomodation-description" />

          {/* <FeaturesSection features={features} setFeatures={setFeatures}/> */}

          <label htmlFor="extraInfo" className="text-2xl mt-4">Extra Info</label>
          <p id="extraInfo-description" className="text-gray-500 text-sm my-2">Kindly add extra information about your accomodation i.e house rules</p>
          <textarea id="extraInfo" aria-describedby="extraInfo-description" />

          <label htmlFor="checkInOutGuests" className="text-2xl mt-4"> Check In and out times, maximum guests</label>
          <p id="checkInOutGuests-description" className="text-gray-500 text-sm my-2">Add Check in and out times, remember to have some time window for cleaning the room between guests</p>
          <div id="checkInOutGuests" aria-describedby="checkInOutGuests-description" className="grid gap-2 sm:grid-cols-2">
            <div>
              <h3 className="mt-2">Check In Time</h3>
              <input type="number" placeholder="14" />
            </div>
            
            <div>
              <h3 className="mt-2">Check Out Time</h3>
              <input type="number" placeholder="14" />
            </div>
            
            <div>
              <h3 className="mt-2">Maximum number of guests</h3>
              <input type="number" placeholder="1" />
            </div>

            <div>
              <h3 className="mt-2">Price per night</h3>
              <input type="number" placeholder="10"/>
            </div>
          </div>

          <button className="primary my-3">Save</button>
        </form>
      </div>
    </>
  )
}

export default CreateNewAccommodation
