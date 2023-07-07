import { useNavigate } from "react-router-dom"
import { useSendLogoutMutation } from "../features/auth/authApiSlice"
import { useEffect } from "react"

const ProfilePage = () => {
  const navigate = useNavigate()

  const [sendLogout, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useSendLogoutMutation()

  useEffect(() => {
    if (isSuccess) navigate('/')
  }, [isSuccess, navigate])

  if (isLoading) return <p>Logging Out...</p>

  if (isError) return <p>Error: {error.data?.message}</p>

  return (
    <div> 
      <div className="text-center">
        <h5>Logged in as </h5> 
        <button 
          className="primary max-w-sm mt-3" 
          title="Logout"
          onClick={sendLogout}
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default ProfilePage
