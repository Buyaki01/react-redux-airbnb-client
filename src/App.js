import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import AccommodationsPage from "./components/Accommodations/AccommodationsPage"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import ProfilePage from "./components/ProfilePage"
import BookingsPage from "./components/Bookings/BookingsPage"
import ShowBookingPage from "./components/Bookings/ShowBookingPage"
import MyAccommodationsPage from "./components/Accommodations/MyAccommodationsPage"
import CreateNewAccommodation from "./components/Accommodations/CreateNewAccommodation"
import EditAccommodationsPage from "./components/Accommodations/EditAccommodationsPage"
import ShowAccommodationPage from "./components/Accommodations/ShowAccommodationPage"

function App() {
  return (
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<AccommodationsPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/bookings' element={<BookingsPage/>}/>
          <Route path='/bookings/:id' element={<ShowBookingPage/>}/>
          <Route path='/myaccommodations' element={<MyAccommodationsPage/>}/>
          <Route path='/accommodations/new' element={<CreateNewAccommodation/>}/>
          <Route path='/accommodations/edit/:id' element={<EditAccommodationsPage/>}/>
          <Route path='/accommodation/:id' element={<ShowAccommodationPage/>}/>
        </Route>
    </Routes>      
  )
}

export default App
