import { Link } from "react-router-dom"

const RegisterPage = () => {
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md max-auto">
          <input type="text" placeholder="John Doe" />
          <input type="email" placeholder="your@email.com" />
          <input type="password" placeholder="password" />
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