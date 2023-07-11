import { useParams } from "react-router-dom"
import { useGetAccommodationsQuery } from "../../features/accommodations/accommodationsApiSlice"
import EditAccommodationFormPage from "./EditAccommodationFormPage"

const EditAccommodationsPage = () => {
  const { id } = useParams()

  const { accommodation } = useGetAccommodationsQuery("accommodationsList", {
    selectFromResult: ({ data }) => ({
      accommodation: data?.entities[id]
    }),
  })

  if (!accommodation) return <p>Loading...</p>

  const content = <EditAccommodationFormPage accommodation={accommodation} /> 

  return content
}

export default EditAccommodationsPage