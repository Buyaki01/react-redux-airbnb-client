import { Link } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import { selectAllAccommodations } from "../../features/accommodations/accommodationsApiSlice"
import { useSelector } from "react-redux"

const MyAccommodationsPage = () => {

  const { id: userId } = useAuth()

  const accommodations = useSelector(selectAllAccommodations)

  const ownersAccommodation = accommodations.filter((accommodation) => accommodation.owner === userId)
  
  return (
    <div>
      <div className="text-center mt-3">
        <Link 
          className="inline-flex bg-primary text-white py-2 px-6 rounded-full" 
          to={'/accommodations/new'}
        > 
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add new Accommodation 
        </Link>
      </div>

      <div className="mt-4">
        {ownersAccommodation.length > 0 && ownersAccommodation.map(accommodation => (
          <Link 
            key={accommodation.id}
            to={`/accommodations/edit/${accommodation.id}`}
            className="flex cursor-pointer gap-4 bg-gray-100 p-4 mb-4 rounded-2xl" 
          >
            <div className="flex w-32 h-32 bg-gray-300 grow flex-shrink-0">
              {/* {place.photos.length > 0 && ( */}
                <img className="object-cover" src="" alt="" />
              {/* )}  */}
            </div>
            <div className="flex-grow-0">
              <h2 className="text-xl">{accommodation.title}</h2>
              <p className="text-sm mt-2">{accommodation.description}</p>
            </div>
          </Link>
        )) } 
      </div>
    </div>
  )
}

export default MyAccommodationsPage
