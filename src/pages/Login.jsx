import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaGithub, FaGoogle } from "react-icons/fa"
import { Link, useLocation, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { FormInput, PasswordInput } from "../components/forms"
import LoadingButton from "../components/shared/LoadingButton"
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants"
import useAuth from "../hooks/useAuth"
import useDocumentTitle from "../hooks/useDocumentTitle"
import { emailValidation } from "../utils/validations"

const Login = () => {
  useDocumentTitle("Login - LoanLink")

  const { login, googleLogin, githubLogin } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [loading, setLoading] = useState(false)

  const from = location.state?.from?.pathname || "/"

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await login(data.email, data.password)
      toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS)
      navigate(from, { replace: true })
    } catch (error) {
      Swal.fire({
        title: "Login Failed!",
        text: error.message?.includes("invalid-credential")
          ? "Invalid email or password. Please check your credentials and try again."
          : error.message || ERROR_MESSAGES.LOGIN_FAILED,
        icon: "error",
        confirmButtonColor: "#ef4444",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await googleLogin()
      toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS)
      navigate(from, { replace: true })
    } catch (error) {
      Swal.fire({
        title: "Google Login Failed!",
        text: error.message || ERROR_MESSAGES.GOOGLE_LOGIN_FAILED,
        icon: "error",
        confirmButtonColor: "#ef4444",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setLoading(true)
    try {
      await githubLogin()
      toast.success(SUCCESS_MESSAGES.LOGIN_SUCCESS)
      navigate(from, { replace: true })
    } catch (error) {
      Swal.fire({
        title: "GitHub Login Failed!",
        text: error.message || ERROR_MESSAGES.GITHUB_LOGIN_FAILED,
        icon: "error",
        confirmButtonColor: "#ef4444",
      })
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

            {/* Demo Login Info */}
            <div className="alert alert-info flex justify-between items-center gap-2 bg-info/10 border-info/20">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="stroke-info shrink-0 w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span className="text-sm">Want to try without signing up?</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const emailInput = document.querySelector(
                    'input[type="email"]'
                  )
                  const passwordInput = document.querySelector(
                    'input[type="password"]'
                  )
                  if (emailInput) emailInput.value = "demo@loanlink.com"
                  if (passwordInput) passwordInput.value = "Demo123!"
                  // Trigger onChange events manually
                  const event = new Event("input", { bubbles: true })
                  emailInput?.dispatchEvent(event)
                  passwordInput?.dispatchEvent(event)
                }}
                className="btn btn-sm btn-outline btn-info"
              >
                Use Demo Account
              </button>
            </div>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Login Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Email */}
              <FormInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email}
                {...register("email", emailValidation)}
              />

              {/* Password */}
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                error={errors.password}
                {...register("password", {
                  required: ERROR_MESSAGES.PASSWORD_REQUIRED,
                })}
              />

              <div className="flex items-center justify-between">
                <label className="cursor-pointer flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm checkbox-primary"
                  />
                  <span className="text-sm">Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() =>
                    navigate("/forgot-password", {
                      state: { email: watch("email") },
                    })
                  }
                  className="text-sm text-primary hover:underline bg-transparent border-none cursor-pointer p-0"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <LoadingButton
                type="submit"
                loading={loading}
                className="btn-primary w-full"
              >
                Login
              </LoadingButton>
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
