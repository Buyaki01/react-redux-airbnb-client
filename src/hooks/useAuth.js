import { useSelector } from "react-redux"
import { selectCurrentToken } from "../features/auth/authSlice"
import jwtDecode from "jwt-decode"

const useAuth = () => {
  const token = useSelector(selectCurrentToken)
  
  if (token) {
    const decoded = jwtDecode(token)
    const { username, id } = decoded.UserInfo

    return { username, id }
  }

  return { username: '', id: '' } //What will be returned if we do not have a token
}

export default useAuth