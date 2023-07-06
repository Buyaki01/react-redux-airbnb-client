import { Link } from "react-router-dom"
import { useGetAllAccommodationsQuery } from "../../features/accommodations/accommodationsApiSlice"

const AccommodationsPage = () => {
  const { data: accommodations, isLoading, isSuccess, isError, error } = useGetAllAccommodationsQuery()

  let content

  if (isLoading) {
    content = <p>Loading...</p>
  }

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids, entities } = accommodations

    content = (
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {ids.map((id) => {
          const accommodation = entities[id]
          return (
            <Link key={id} to={`/accommodations/${id}`}>
              <div className="bg-gray-500 mb-2 rounded-2xl flex">
                <img className="rounded-2xl object-cover aspect-square" src="" alt={accommodation.title} />
              </div>
              <h2 className="font-semibold">{accommodation.address}</h2>
              <h3 className="text-gray-700">{accommodation.title}</h3>
              <div className="mt-1">
                <span className="font-semibold">{accommodation.price}</span> per night
              </div>
            </Link>
          )
        })}
      </div>
    )
  }

  return content
}

export default AccommodationsPage
