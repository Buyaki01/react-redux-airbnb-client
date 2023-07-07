import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const registerUser = async (e) => {
    e.preventDefault()
  }

  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md max-auto" onSubmit={registerUser}>
          <input 
            type="text" 
            placeholder="John Doe" 
            value={username}
            onChange={e => setUsername(e.target.value)}
          />

          <input 
            type="email" 
            placeholder="your@email.com" 
            value={email}
            onChange={e => setEmail(e.target.value)}
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