import { useState } from "react"
import { NavLink } from "react-router-dom"
import k from "./assest/images.png"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!email || !password) {
      setError("Please fill all fields")
      return
    }

    setLoading(true)

    // 🔗 BACKEND API WILL GO HERE
    // Example:
    // await fetch("http://localhost:5000/login", {...})

    setTimeout(() => {
      setLoading(false)
      alert("Connected to backend successfully!")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      
      {/* Logo */}
      <img src={k} alt="logo" className="h-12 mt-8 mb-6" />

      {/* Sign In Box */}
      <div className="bg-white p-6 w-[350px] rounded border">
        <h1 className="text-2xl font-semibold mb-4">Sign in</h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-3 text-sm rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <label className="text-sm font-semibold">Email</label>
          <input
            type="email"
            className="w-full border p-2 rounded mt-1 mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-xs text-gray-600 mt-4">
          By continuing, you agree to Amazon's Conditions of Use and Privacy Notice.
        </p>
      </div>

      {/* Create account */}
      <div className="mt-6 w-[350px] text-center">
        <p className="text-sm text-gray-600 mb-2">New to Amazon?</p>
        <NavLink to="/signup">
          <button className="w-full border py-2 rounded hover:bg-gray-50">
            Create your Amazon account
          </button>
        </NavLink>
      </div>
    </div>
  )
}

export default SignIn
