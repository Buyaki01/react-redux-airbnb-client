import { useSelector } from "react-redux"
import { selectCurrentEmail } from "../features/profile/profileSlice"

const ProfilePage = () => {
  // const username = useSelector(selectCurrentUsername)
  const email = useSelector(selectCurrentEmail)
  console.log(email)

  return (
    <div> 
      <div className="text-center">
        <h5>Logged in as {email} </h5> 
        <button className="primary max-w-sm mt-3">Logout</button>
      </div>
    </div>
  )
}

export default ProfilePage
