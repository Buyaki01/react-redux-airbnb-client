import { Link } from "react-router-dom"

const BookingsPage = () => {
  return(
    <div>
      <div>
        <Link
          // to={`/account/bookings/${booking._id}`}
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
            <h2 className="text-xl">title</h2>
            <div className="text-xl">
              {/* <BookingDates booking={booking} /> */}
              <div>
                <span className="text-2xl">
                  Total price: $
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default BookingsPage
