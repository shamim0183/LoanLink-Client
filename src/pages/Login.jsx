import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Login = () => {
  const { login, googleLogin, githubLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || "/"

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await login(data.email, data.password)
      toast.success("Login successful!")
      navigate(from, { replace: true })
    } catch (error) {
      console.error("Login error:", error)
      toast.error(error.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await googleLogin()
      toast.success("Login successful!")
      navigate(from, { replace: true })
    } catch (error) {
      console.error("Google login error:", error)
      toast.error(error.message || "Google login failed.")
    } finally {
      setLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setLoading(true)
    try {
      await githubLogin()
      toast.success("Login successful!")
      navigate(from, { replace: true })
    } catch (error) {
      console.error("GitHub login error:", error)
      toast.error(error.message || "GitHub login failed.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Header */}
            <h2 className="text-3xl font-bold text-center mb-2">
              Welcome Back!
            </h2>
            <p className="text-center text-base-content/70 mb-6">
              Login to access your account
            </p>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="btn btn-outline w-full gap-2"
              >
                <FaGoogle className="text-xl" />
                Continue with Google
              </button>
              <button
                onClick={handleGithubLogin}
                disabled={loading}
                className="btn btn-outline w-full gap-2"
              >
                <FaGithub className="text-xl" />
                Continue with GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <div className="form-control">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className={`input-field ${
                    errors.email ? "border-error" : ""
                  }`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <span className="error-text">{errors.email.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="form-label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`input-field ${
                      errors.password ? "border-error" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/60 hover:text-base-content"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.password && (
                  <span className="error-text">{errors.password.message}</span>
                )}
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            {/* Register Link */}
            <p className="text-center mt-6 text-base-content/70">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-primary font-semibold hover:underline"
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
