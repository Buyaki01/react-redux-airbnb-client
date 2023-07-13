import { Link } from "react-router-dom"
import BookingDates from "./BookingDates"
import useAuth from "../../hooks/useAuth"
import { useSelector } from "react-redux"
import { selectAllBookings } from "../../features/Bookings/bookingsApiSlice"

const BookingsPage = () => {
  
  const { id: userId } = useAuth()

  const bookings = useSelector(selectAllBookings)

  const ownersBookings = bookings.filter((booking) => booking.userId === userId)

  return(
    <div>
      <div>
        {ownersBookings.length > 0 &&
          ownersBookings.map((booking) => (
            <Link
              key={booking.id}
              to={`/booking/${booking.id}`}
              className="flex gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-3"
            >
              <div className="w-48">
                <img
                  className="object-cover"
                  src=""
                  alt=""
                />
              </div>
              <div className="py-3 pr-3 grow">
                <h2 className="text-xl">booking.accomodationId.title</h2>
                <div className="text-xl">

                  <BookingDates booking={booking} />
                  
                  <div>
                    <span className="text-2xl">
                      Total price: ${booking.price}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )) 
        }
      </div>
    </div>
  )
}

export default BookingsPage
