import { Routes, Route } from "react-router-dom"
import Layout from "./components/Layout"
import IndexPage from "./components/IndexPage"
import LoginPage from "./components/LoginPage"
import RegisterPage from "./components/RegisterPage"
import ProfilePage from "./components/ProfilePage"
import BookingsPage from "./components/BookingsPage"
import ShowBookingPage from "./components/ShowBookingPage"
import AccommodationsPage from "./components/AccommodationsPage"

function App() {
  return (
    <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<IndexPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/register' element={<RegisterPage/>}/>
          <Route path='/profile' element={<ProfilePage/>}/>
          <Route path='/bookings' element={<BookingsPage/>}/>
          <Route path='/bookings/:id' element={<ShowBookingPage/>}/>
          <Route path='/accommodations' element={<AccommodationsPage/>}/>
        </Route>
    </Routes>      
  )
}

export default App
