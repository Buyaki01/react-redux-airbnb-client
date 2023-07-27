import { Navigate, useNavigate, useLocation } from "react-router-dom"
import { useSendLogoutMutation } from "../features/auth/authApiSlice"
import { useEffect } from "react"
import useAuth from "../hooks/useAuth"

const ProfilePage = () => {
  const location = useLocation()

  const { username, isAuthenticated } = useAuth()

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

  if (isLoading) return <p className="text-center text-xl">Logging Out...</p>

  if (isError) return <p className="text-center text-xl">Error: {error.data?.message}</p>

  return (
    <div>
      {isAuthenticated ? (
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
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </div>
  )
}

export default ProfilePage
