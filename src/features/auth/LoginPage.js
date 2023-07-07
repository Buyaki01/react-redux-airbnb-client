import { Link, useNavigate } from "react-router-dom"
import { useRef, useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { setCredentials } from "./authSlice"
import { useLoginMutation } from "./authApiSlice"

const LoginPage = () => {
  const emailRef = useRef()
  const errRef = useRef()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errMsg, setErrMsg] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [email, password])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    try {
      const { accessToken } = await login({ email, password }).unwrap()
      dispatch(setCredentials({ accessToken }))
      setEmail('')
      setPassword('')
      navigate('/')
    } catch (err) {
      if (!err.status) {
        setErrMsg('No Server Response')
      } else if (err.status === 400) {
        setErrMsg('Missing Email or Password')
      } else if (err.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg(err.data?.message)
      }
      errRef.current.focus()
    }
  }

  const errClass = errMsg ? "errmsg" : "offscreen"

  if (isLoading) return <p>Loading...</p>

  return(
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>

        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>

        <form className="max-w-md max-auto" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            placeholder="your@email.com"
            ref={emailRef}
            value={email}
            onChange={e => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button className="primary mt-2"> Login </button>
          <div className="text-center mt-2 text-gray-500">
            Don't have an account yet?{" "}
            <Link className="underline text-black" to={"/register"}>Register now</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
