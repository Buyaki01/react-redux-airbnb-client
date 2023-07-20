import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import AccommodationsPage from "./components/Accommodations/AccommodationsPage"
import LoginPage from "./features/auth/LoginPage"
import RegisterPage from "./components/RegisterPage"
import ProfilePage from "./components/ProfilePage"
import MyBookingsPage from "./components/Bookings/MyBookingsPage"
import ShowBookingPage from "./components/Bookings/ShowBookingPage"
import MyAccommodationsPage from "./components/Accommodations/MyAccommodationsPage"
import CreateNewAccommodation from "./components/Accommodations/CreateNewAccommodation"
import EditAccommodationsPage from "./components/Accommodations/EditAccommodationsPage"
import ShowAccommodationPage from "./components/Accommodations/ShowAccommodationPage"
import Prefetch from "./features/auth/Prefetch"
import PersistLogin from "./features/auth/PersistLogin"

function App() {
  return (
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<AccommodationsPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/accommodations/:id' element={<ShowAccommodationPage/>}/>
          
          <Route element={<PersistLogin />}>
            <Route element={<Prefetch/>}>
              <Route path='/profile' element={<ProfilePage/>}/>
              <Route path='/mybookings' element={<MyBookingsPage/>}/>
              <Route path='/booking/:bookingId/:accommodationId' element={<ShowBookingPage/>}/>
              <Route path='/myaccommodations' element={<MyAccommodationsPage/>}/>
              <Route path='/accommodations/new' element={<CreateNewAccommodation/>}/>
              <Route path='/accommodations/edit/:id' element={<EditAccommodationsPage/>}/>
            </Route>
          </Route>
        </Route>
    </Routes>      
  )
}

export default App
