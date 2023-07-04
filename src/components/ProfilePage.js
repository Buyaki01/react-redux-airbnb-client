import { useGetProfileQuery, selectProfileData } from "../features/profile/profileApiSlice"
import { useSelector } from "react-redux"

const ProfilePage = () => {
  const { data: profile, isLoading, isSuccess, isError, error } = useGetProfileQuery()
  const profileData = useSelector(selectProfileData)
  
  let content
  
  if (isLoading) {
    content = <p>Loading...</p>
  }
  
  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }
 
  if (isSuccess) {
    content (
      <div> 
        <div className="text-center">
         <h5>Logged in as {profileData.email} </h5>
          <button className="primary max-w-sm mt-3">Logout</button>
        </div>
      </div>
    )
  }

  return content
}

export default ProfilePage;
