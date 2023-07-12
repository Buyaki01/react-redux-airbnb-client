import { useParams } from "react-router-dom"
import { useGetAccommodationsQuery } from "../../features/accommodations/accommodationsApiSlice"
import EditAccommodationFormPage from "./EditAccommodationFormPage"
import { useEffect } from "react"

const EditAccommodationsPage = () => {
  const { id } = useParams()

  const { accommodation } = useGetAccommodationsQuery("accommodationsList", {
    selectFromResult: ({ data }) => ({
      accommodation: data?.entities[id]
    }),
  })

  useEffect(() => {
    
  }, [accommodation])

  if (!accommodation) return <p>Loading...</p>

  const content = <EditAccommodationFormPage accommodation={accommodation} /> 

  return content
}

export default EditAccommodationsPage