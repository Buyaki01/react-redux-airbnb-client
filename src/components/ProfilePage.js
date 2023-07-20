import { Link, useNavigate } from "react-router-dom"
import { useSendLogoutMutation } from "../features/auth/authApiSlice"
import { useEffect } from "react"
import useAuth from "../hooks/useAuth"

const ProfilePage = () => {

  const { username } = useAuth()

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
      {username ? (
        <div className="text-center">
          <h5>Logged in as {username} </h5>
          <button
            className="primary max-w-sm mt-3"
            title="Logout"
            onClick={sendLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <h5>Not yet logged in</h5>
          <p>Please <Link to={'/login'} className="link-color">log in</Link> to view your profile.</p>
        </div>
      )}
    </div>
  )
}

export default ProfilePage
