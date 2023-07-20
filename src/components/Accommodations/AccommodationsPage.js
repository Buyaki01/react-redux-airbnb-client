import { Link } from "react-router-dom"
import { useGetAccommodationsQuery } from "../../features/accommodations/accommodationsApiSlice"

const AccommodationsPage = () => {
  const { 
    data: accommodations, 
    isLoading, 
    isSuccess, 
    isError, 
    error } = useGetAccommodationsQuery('accommodationsList', {
      pollingInterval: 15000, //sets the polling interval to 60000 milliseconds (60 seconds). This means that the hook will automatically refetch the accommodations data from the API every 60 seconds, keeping it up to date.
      refetchOnFocus: true, //specifies that the accommodations data should be refetched from the API whenever the user interacts with the application window. For example, if the user switches tabs or returns to the application after being away, the data will be refetched to ensure it is current.
      refetchOnMountOrArgChange: true //indicates that the accommodations data should be refetched from the API when the component mounts (initially renders) or when the arguments passed to the useGetAccommodationsQuery hook change. If any of the arguments provided to the hook change during the component's lifecycle, the accommodations data will be refetched to reflect the updated arguments.
    })

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
                <img className="rounded-2xl object-cover aspect-square" src={`https://airbnb-app-server.onrender.com/images/${accommodation.photos?.[0]}`} alt={accommodation.title} />
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
