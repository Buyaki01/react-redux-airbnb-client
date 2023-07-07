import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAccommodationById } from "../../features/accommodations/accommodationsApiSlice"
import EditAccommodationFormPage from "./EditAccommodationFormPage"

const EditAccommodationsPage = () => {
  const { id } = useParams()

  const accommodation = useSelector(state => selectAccommodationById(state, id))

  const content = accommodation ? <EditAccommodationFormPage accommodation={accommodation} /> : <p>Loading...</p>

  return content
}

export default EditAccommodationsPage