import { useState, useEffect } from "react"
import { useUpdateAccommodationMutation, useDeleteAccommodationMutation } from "../../features/accommodations/accommodationsApiSlice"
import { useNavigate } from "react-router"
import FeaturesSection from "./FeaturesSection"
import PhotosSection from "./PhotosSection"

const EditAccommodationFormPage = ({ accommodation }) => {
  const [updateAccommodation, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdateAccommodationMutation()

  const navigate = useNavigate()
  
  const [title, setTitle] = useState(accommodation.title)
  const [address, setAddress] = useState(accommodation.address)
  const [addPhoto, setAddPhoto] = useState([])
  const [description, setDescription] = useState(accommodation.description)
  const [features, setFeatures] = useState(accommodation.features)
  const [extraInfo, setExtraInfo] = useState(accommodation.extraInfo)
  const [checkIn, setCheckIn] = useState(accommodation.checkIn)
  const [checkOut, setCheckOut] = useState(accommodation.checkOut)
  const [maxGuests, setMaxGuests] = useState(accommodation.maxGuests)
  const [price, setPrice] = useState(accommodation.price)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setAddress('')
      setAddPhoto([])
      setDescription('')
      setFeatures('')
      setExtraInfo('')
      setCheckIn('')
      setCheckOut('')
      setMaxGuests('')
      setPrice('')
      navigate('/myaccommodations')
    }
  }, [isSuccess, navigate])

  const onSaveAccommodationClicked = async (e) => {
    try {
      await updateAccommodation({
        id: accommodation.id, title, address, description, features, extraInfo, checkIn, checkOut, maxGuests, price
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>  
      <div>
        <form onSubmit={e => e.preventDefault()}>
          <label htmlFor="title" className="text-2xl mt-4">Title</label>
          <p id="title-description" className="text-gray-500 text-sm my-2"> Please enter the title for your apartment. Make sure it captures the attention of potential guests and accurately reflects the unique qualities of your space</p>
          <input 
            id="title" 
            aria-describedby="title-description" 
            type="text" 
            placeholder="Title, for example: My Lovely Apartment" 
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          
          <label htmlFor="address" className="text-2xl mt-4">Address</label>
          <p id="address-description" className="text-gray-500 text-sm my-2"> Please enter the address to the location of your appartment, Make sure to include the Name of the Place, the Region/State and the Country.</p>
          <input 
            id="address" 
            aria-describedby="address-description" 
            type="text" 
            placeholder="address" 
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          
          <PhotosSection addPhoto={addPhoto} setAddPhoto={setAddPhoto}/>

          <label htmlFor="description" className="text-2xl mt-4">Description</label>
          <p id="accommodation-description" className="text-gray-500 text-sm my-2"> Kindly describe your accommodation in depth</p>
          <textarea 
            type="text" 
            id="description" 
            aria-describedby="accommodation-description" 
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <FeaturesSection features={features} setFeatures={setFeatures}/>

          <label htmlFor="extraInfo" className="text-2xl mt-4">Extra Info</label>
          <p id="extraInfo-description" className="text-gray-500 text-sm my-2">Kindly add extra information about your accommodation i.e house rules</p>
          <textarea 
            id="extraInfo" 
            aria-describedby="extraInfo-description" 
            value={extraInfo}
            onChange={e => setExtraInfo(e.target.value)}
          />

          <label htmlFor="checkInOutGuests" className="text-2xl mt-4"> Check In and out times, maximum guests</label>
          <p id="checkInOutGuests-description" className="text-gray-500 text-sm my-2">Add Check in and out times, remember to have some time window for cleaning the room between guests</p>
          <div id="checkInOutGuests" aria-describedby="checkInOutGuests-description" className="grid gap-2 sm:grid-cols-2">
            <div>
              <h3 className="mt-2">Check In Time</h3>
              <input 
                type="number" 
                placeholder="14" 
                value={checkIn}
                onChange={e => setCheckIn(e.target.value)}
              />
            </div>
            
            <div>
              <h3 className="mt-2">Check Out Time</h3>
              <input 
                type="number" 
                placeholder="14" 
                value={checkOut}
                onChange={e => setCheckOut(e.target.value)}
              />
            </div>
            
            <div>
              <h3 className="mt-2">Maximum number of guests</h3>
              <input 
                type="number" 
                placeholder="1" 
                value={maxGuests}
                onChange={e => setMaxGuests(e.target.value)}
              />
            </div>

            <div>
              <h3 className="mt-2">Price per night</h3>
              <input 
                type="number" 
                placeholder="10"
                value={price}
                onChange={e => setPrice(e.target.value)}
              />
            </div>
          </div>

          <button 
            className="primary my-3"
            onClick={onSaveAccommodationClicked}
          >
            Save
          </button>
        </form>
      </div>
    </>
  )
}

export default EditAccommodationFormPage
