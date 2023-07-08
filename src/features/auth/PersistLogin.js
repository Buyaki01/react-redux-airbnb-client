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
}

export default PersistLogin