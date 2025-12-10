import React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FaEnvelope } from "react-icons/fa"
import { Link, useLocation } from "react-router-dom"
import Swal from "sweetalert2"
import { FormInput } from "../components/forms"
import LoadingButton from "../components/shared/LoadingButton"
import { ERROR_MESSAGES } from "../constants"
import useAuth from "../hooks/useAuth"
import { emailValidation } from "../utils/validations"

const ForgotPassword = () => {
  const { resetPassword } = useAuth()
  const location = useLocation()
  const emailFromLogin = location.state?.email || ""
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: emailFromLogin,
    },
  })

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await resetPassword(data.email)
      setEmailSent(true)
      Swal.fire({
        title: "Email Sent!",
        html: `<p>We've sent a password reset link to <strong>${data.email}</strong></p><p>Please check your email and follow the instructions to reset your password.</p>`,
        icon: "success",
        confirmButtonColor: "#10b981",
      })
    } catch (error) {
      setLoading(false)
      Swal.fire({
        title: "Error!",
        text: error.message?.includes("user-not-found")
          ? "No account found with this email address."
          : error.message || ERROR_MESSAGES.RESET_PASSWORD_FAILED,
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
            <div className="text-center mb-2">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                <FaEnvelope className="text-3xl text-primary" />
              </div>
              <h2 className="text-3xl font-bold">Forgot Password?</h2>
              <p className="text-base-content/70 mt-2">
                {emailSent
                  ? "Check your email for reset instructions"
                  : "Enter your email and we'll send you a reset link"}
              </p>
            </div>

            {!emailSent ? (
              <>
                {/* Reset Password Form */}
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 mt-6"
                >
                  {/* Email */}
                  <FormInput
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email"
                    error={errors.email}
                    {...register("email", emailValidation)}
                  />

                  {/* Submit Button */}
                  <LoadingButton
                    type="submit"
                    loading={loading}
                    className="btn-primary w-full"
                  >
                    Send Reset Link
                  </LoadingButton>
                </form>

                {/* Back to Login */}
                <div className="divider">OR</div>
                <Link to="/login" className="btn btn-ghost w-full">
                  Back to Login
                </Link>
              </>
            ) : (
              <div className="space-y-4 mt-6">
                {/* Success Message */}
                <div className="alert alert-success">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>Password reset email sent successfully!</span>
                </div>

                {/* Instructions */}
                <div className="bg-base-200 p-4 rounded-lg space-y-2">
                  <p className="font-semibold">Next Steps:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Check your email inbox</li>
                    <li>Click the password reset link</li>
                    <li>Create a new password</li>
                    <li>Login with your new password</li>
                  </ol>
                </div>

                {/* Didn't receive email? */}
                <div className="text-center text-sm space-y-2">
                  <p className="text-base-content/70">
                    Didn't receive the email?
                  </p>
                  <button
                    onClick={() => setEmailSent(false)}
                    className="btn btn-sm btn-outline"
                  >
                    Try Again
                  </button>
                </div>

                {/* Back to Login */}
                <Link to="/login" className="btn btn-primary w-full mt-4">
                  Back to Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPassword
