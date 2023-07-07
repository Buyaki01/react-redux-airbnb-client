import { Link } from "react-router-dom"

const LoginPage = () => {
  return(
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-64">
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form className="max-w-md max-auto">
          <input
            type="email"
            placeholder="your@email.com"
          />
          <input
            type="password"
            placeholder="password"
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
