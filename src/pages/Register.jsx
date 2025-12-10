import React from "react";
import axios from "axios";
import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaCamera, FaEye, FaEyeSlash, FaGithub, FaGoogle } from "react-icons/fa"
import { Link, useNavigate } from "react-router-dom"
import { FormInput, FormSelect } from "../components/forms"
import { SUCCESS_MESSAGES } from "../constants"
import useAuth from "../hooks/useAuth"
import { useImageUpload } from "../hooks/useImageUpload"
import {
  emailValidation,
  nameValidation,
  passwordValidation,
} from "../utils/validations"

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

  // Use image upload hook
  const { uploading, imagePreview, photoURL, handleImageUpload } =
    useImageUpload()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const password = watch("password")

  // Image upload logic moved to useImageUpload hook

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // Register user
      await registerUser(data.email, data.password)

      // Update Firebase profile with photoURL from ImgBB
      if (photoURL) {
        await updateUserProfile(data.name, photoURL)

        // Update backend database with photoURL and role
        try {
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/auth/update-profile`,
            {
              name: data.name,
              photoURL: photoURL,
              role: data.role,
            },
            { withCredentials: true }
          )
        } catch (backendError) {
          console.error("Backend update failed:", backendError)
        }
      } else {
        await updateUserProfile(data.name, "")

        // Update backend with role even without photo
        try {
          await axios.patch(
            `${import.meta.env.VITE_API_URL}/auth/update-profile`,
            {
              name: data.name,
              role: data.role,
            },
            { withCredentials: true }
          )
        } catch (backendError) {
          console.error("Backend update failed:", backendError)
        }
      }

      toast.success(SUCCESS_MESSAGES.REGISTRATION_SUCCESS)

      // Wait for Firebase auth state to sync before navigation
      setTimeout(() => {
        navigate("/")
      }, 1000) // Increased to 1 second for reliable auth sync
    } catch (error) {
      console.error("Registration error:", error)
      toast.error(error.message || ERROR_MESSAGES.REGISTRATION_FAILED)
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
      toast.error(error.message || ERROR_MESSAGES.GOOGLE_SIGNUP_FAILED)
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
      toast.error(error.message || ERROR_MESSAGES.GITHUB_SIGNUP_FAILED)
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
              <FormInput
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                error={errors.name}
                {...register("name", nameValidation)}
              />

              {/* Email */}
              <FormInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                error={errors.email}
                {...register("email", emailValidation)}
              />

              {/* Photo Upload */}
              <div className="form-control">
                <label className="form-label">Profile Photo (Optional)</label>
                <div className="flex items-center gap-4">
                  {imagePreview && (
                    <div className="avatar">
                      <div className="w-20 h-20 rounded-full ring ring-primary">
                        <img src={imagePreview} alt="Preview" />
                      </div>
                    </div>
                  )}
                  <label
                    htmlFor="photoUpload"
                    className="btn btn-outline btn-primary flex-1"
                  >
                    {uploading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : (
                      <>
                        <FaCamera />
                        {imagePreview ? "Change Photo" : "Upload Photo"}
                      </>
                    )}
                    <input
                      id="photoUpload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                      disabled={uploading || loading}
                    />
                  </label>
                </div>
              </div>

              {/* Role */}
              <FormSelect
                label="I am a"
                placeholder="Select role"
                options={[
                  { value: "borrower", label: "Borrower - I need a loan" },
                  { value: "manager", label: "Manager - I manage loans" },
                ]}
                error={errors.role}
                {...register("role", { required: "Please select your role" })}
              />

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
                    {...register("password", passwordValidation)}
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
