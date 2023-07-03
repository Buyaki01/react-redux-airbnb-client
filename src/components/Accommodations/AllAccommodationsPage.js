import { Link } from "react-router-dom"
import { useGetAccommodationsQuery } from "../../features/accommodations/accommodationsApiSlice"

const AllAccommodationsPage = () => {
  const {
    data: accommodations,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetAccommodationsQuery()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {

    content = (
      <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        <Link to={`/accommodation/accommodation.id`}>
          <div className="bg-gray-500 mb-2 rounded-2xl flex"> 
            <img className="rounded-2xl object-cover aspect-square" src="" alt="" />
          </div>
          <h2 className="font-semibold">address</h2>
          <h3 className="text-gray-700">title</h3>
          <div className="mt-1">
            <span className="font-semibold">price</span> per night
          </div>
        </Link>
      </div>
    )
  }

  return content
}

export default AllAccommodationsPage
