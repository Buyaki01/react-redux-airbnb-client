import { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRegisterMutation } from "../features/register/registerApiSlice"

const RegisterPage = () => {
  const usernameRef = useRef()
  const emailRef = useRef()
  const errRef = useRef()
  const [errMsg, setErrMsg] = useState('')

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const [register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  useEffect(() => {
    emailRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [username, email, password])

  const registerUser = async (e) => {
    e.preventDefault()

    try {
      await register({ username, email, password})
      setUsername('')
      setEmail('')
      setPassword('')
      navigate('/login')
    } catch (err) {
      console.log(err)
      errRef.current.focus()
    }
  }

  if (isLoading) return <p>Loading...</p>

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>

        <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
        
        <form className="max-w-md max-auto" onSubmit={registerUser}>
          <input 
            type="text" 
            placeholder="John Doe"
            ref={usernameRef} 
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="off"
            required
          />

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

          <button className="primary mt-2"> Register </button>

          <div className="text-center mt-2 text-gray-500">
            Have an account? <Link className="underline text-black" to={'/login'}> Login </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterPage