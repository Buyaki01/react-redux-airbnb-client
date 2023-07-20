import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from "jwt-decode"

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  
  if (token) {
    const decoded = jwtDecode(token)
    const { username, id } = decoded.UserInfo

    return { username, id, isAuthenticated: true }
  }

  return { username: '', id: '', isAuthenticated: false } //What will be returned if we do not have a token
}

export default useAuth