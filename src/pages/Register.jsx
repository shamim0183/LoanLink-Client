import React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Register = () => {
  const {
    register: registerUser,
    googleLogin,
    githubLogin,
    updateUserProfile,
  } = useAuth()
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch("password")

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // Register user
      await registerUser(data.email, data.password)

      // Update profile
      await updateUserProfile(data.name, data.photoURL)

      toast.success("Registration successful!")
      navigate("/")
    } catch (error) {
      console.error("Registration error:", error)
      toast.error(error.message || "Registration failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await googleLogin()
      toast.success("Registration successful!")
      navigate("/")
    } catch (error) {
      console.error("Google signup error:", error)
      toast.error(error.message || "Google signup failed.")
    } finally {
      setLoading(false)
    }
  }

  const handleGithubLogin = async () => {
    setLoading(true)
    try {
      await githubLogin()
      toast.success("Registration successful!")
      navigate("/")
    } catch (error) {
      console.error("GitHub signup error:", error)
      toast.error(error.message || "GitHub signup failed.")
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
              Create Account
            </h2>
            <p className="text-center text-base-content/70 mb-6">
              Join LoanLink today
            </p>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="btn btn-outline w-full gap-2"
              >
                <FaGoogle className="text-xl" />
                Sign up with Google
              </button>
              <button
                onClick={handleGithubLogin}
                disabled={loading}
                className="btn btn-outline w-full gap-2"
              >
                <FaGithub className="text-xl" />
                Sign up with GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Register Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name */}
              <div className="form-control">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className={`input-field ${errors.name ? "border-error" : ""}`}
                  {...register("name", {
                    required: "Name is required",
                    minLength: {
                      value: 3,
                      message: "Name must be at least 3 characters",
                    },
                  })}
                />
                {errors.name && (
                  <span className="error-text">{errors.name.message}</span>
                )}
              </div>

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

              {/* Photo URL */}
              <div className="form-control">
                <label className="form-label">Photo URL (Optional)</label>
                <input
                  type="url"
                  placeholder="Enter photo URL"
                  className={`input-field ${
                    errors.photoURL ? "border-error" : ""
                  }`}
                  {...register("photoURL", {
                    pattern: {
                      value: /^https?:\/\/.+/,
                      message: "Invalid URL format",
                    },
                  })}
                />
                {errors.photoURL && (
                  <span className="error-text">{errors.photoURL.message}</span>
                )}
              </div>

              {/* Role */}
              <div className="form-control">
                <label className="form-label">I am a</label>
                <select
                  className={`select-field ${
                    errors.role ? "border-error" : ""
                  }`}
                  {...register("role", {
                    required: "Please select your role",
                  })}
                >
                  <option value="">Select role</option>
                  <option value="borrower">Borrower - I need a loan</option>
                  <option value="manager">Manager - I manage loans</option>
                </select>
                {errors.role && (
                  <span className="error-text">{errors.role.message}</span>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="form-label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    className={`input-field ${
                      errors.password ? "border-error" : ""
                    }`}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                      validate: {
                        hasUpperCase: (value) =>
                          /[A-Z]/.test(value) ||
                          "Password must contain at least one uppercase letter",
                        hasLowerCase: (value) =>
                          /[a-z]/.test(value) ||
                          "Password must contain at least one lowercase letter",
                      },
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

              {/* Password Requirements */}
              <div className="text-sm text-base-content/70 space-y-1">
                <p className={password?.length >= 6 ? "text-success" : ""}>
                  ✓ At least 6 characters
                </p>
                <p className={/[A-Z]/.test(password) ? "text-success" : ""}>
                  ✓ One uppercase letter
                </p>
                <p className={/[a-z]/.test(password) ? "text-success" : ""}>
                  ✓ One lowercase letter
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-primary w-full mt-6"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* Login Link */}
            <p className="text-center mt-6 text-base-content/70">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary font-semibold hover:underline"
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Register
