import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectAccommodationById } from "../../features/accommodations/accommodationsApiSlice"

const EditAccommodationsPage = () => {
  const { id } = useParams()

  const accommodation = useSelector(state => selectAccommodationById(state, id))

  console.log(accommodation)
}

export default EditAccommodationsPage