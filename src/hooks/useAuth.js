import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from "jwt-decode"

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  
  if (token) {
    const decoded = jwtDecode(token)
    const { username } = decoded.UserInfo

    return { username }
  }

  return { username: ''} //What will be returned if we do not have a token
}

export default useAuth