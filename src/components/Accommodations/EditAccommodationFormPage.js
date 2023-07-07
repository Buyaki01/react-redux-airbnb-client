import { useState, useEffect } from "react"
import { useUpdateAccommodationMutation, useDeleteAccommodationMutation } from "../../features/accommodations/accommodationsApiSlice"
import { useNavigate } from "react-router"

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
  const [description, setDescription] = useState(accommodation.description)
  const [extraInfo, setExtraInfo] = useState(accommodation.extraInfo)
  const [checkIn, setCheckIn] = useState(accommodation.checkIn)
  const [checkOut, setCheckOut] = useState(accommodation.checkOut)
  const [maxGuests, setMaxGuests] = useState(accommodation.maxGuests)
  const [price, setPrice] = useState(accommodation.price)

  useEffect(() => {
    if (isSuccess) {
      setTitle('')
      setAddress('')
      setDescription('')
      setExtraInfo('')
      setCheckIn('')
      setCheckOut('')
      setMaxGuests('')
      setPrice('')
    }
  }, [isSuccess, navigate])

  return (
    
  )
}

export default EditAccommodationFormPage
