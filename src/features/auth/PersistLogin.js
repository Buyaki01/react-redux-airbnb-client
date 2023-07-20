import { Outlet, Link } from "react-router-dom"
import { useEffect, useState, useRef } from "react"
import { useRefreshMutation } from "./authApiSlice"
import usePersist from "../../hooks/usePersist"
import { useSelector } from "react-redux"
import { selectCurrentToken } from "./authSlice"

const PersistLogin = () => {
  const [persist] = usePersist()
  const token = useSelector(selectCurrentToken)
  const effectRan = useRef(false)

  const [trueSuccess, setTrueSuccess] = useState(false)

  const [refresh, {
    isUninitialized, //Refresh function has not been called yet
    isLoading,
    isSuccess,
    isError,
    error
  }] = useRefreshMutation()

  useEffect(() => {

    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {

      const verifyRefreshToken = async () => {
        try {
          // const response = 
          await refresh()

          // const { accessToken } = response.data
          
          setTrueSuccess(true) //Giving time for the credentials above to be set
        } catch (err) {
          console.error(err)
        }
      }

      if (!token && persist) verifyRefreshToken()
    }

    return () => effectRan.current = true

    // eslint-disable-next-line
  }, [])

  let content
  if (!persist) { // persist: no
    content = <Outlet />
  } else if (isLoading) { //persist: yes, token: no
    content = <p className="text-center">Loading...</p>
  } else if (isError) { //persist: yes, token: no
    content = (
      <p className='errmsg text-center'>
        {`${error?.data?.message} - `}
        <Link to="/login" className="underline">Please login again</Link>.
      </p>
    )
  } else if (isSuccess && trueSuccess) { //persist: yes, token: yes
    content = <Outlet />
  } else if (token && isUninitialized) { //persist: yes, token: yes
    content = <Outlet />
  }

  return content
}

export default PersistLogin