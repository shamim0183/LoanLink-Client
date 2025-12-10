import React from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import { FormInput } from "../components/forms"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import { ERROR_MESSAGES } from "../constants"
import useAuth from "../hooks/useAuth"

const ApplyLoan = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loan, setLoan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [processing, setProcessing] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm()

  const loanAmount = watch("loanAmount")

  useEffect(() => {
    fetchLoanDetails()
  }, [id])

  const fetchLoanDetails = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/loans/${id}`
      )
      setLoan(data.loan)
    } catch (error) {
      console.error("Error:", error)
      toast.error(ERROR_MESSAGES.LOAN_LOAD_FAILED)
      navigate("/all-loans")
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (formData) => {
    setProcessing(true)

    try {
      // Create Stripe Checkout Session
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-checkout-session`,
        {
          amount: 10, // Application fee in USD (change this value as needed)
          applicationData: {
            ...formData,
            interestRate: loan.interestRate,
            loanImage: loan.images?.[0] || null, // Use first image from images array
          },
          loanId: loan._id,
          loanTitle: loan.title,
        },
        { withCredentials: true }
      )

      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error("Checkout error:", error)
      toast.error(ERROR_MESSAGES.PAYMENT_PROCESSING_FAILED)
      setProcessing(false)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loan not found</h2>
          <button
            onClick={() => navigate("/all-loans")}
            className="btn btn-primary"
          >
            Back to All Loans
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <button
          onClick={() => navigate(`/loan-details/${id}`)}
          className="btn btn-ghost gap-2 mb-6"
        >
          <FaArrowLeft />
          Back
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Apply for {loan.title}</h1>
          <p className="text-base-content/70 mb-8">
            Fill out the application form and pay the processing fee to submit
            your application
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="card">
              <div className="card-body">
                <h2 className="text-xl font-bold mb-4">Personal Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="First Name"
                    error={errors.firstName}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />

                  <FormInput
                    label="Last Name"
                    error={errors.lastName}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />

                  <FormInput
                    label="Contact Number"
                    type="tel"
                    error={errors.contactNumber}
                    {...register("contactNumber", {
                      required: "Contact number is required",
                    })}
                  />

                  <FormInput
                    label="National ID"
                    error={errors.nationalId}
                    {...register("nationalId", {
                      required: "National ID is required",
                    })}
                  />
                </div>

                <div className="form-control">
                  <label className="form-label">Address</label>
                  <textarea
                    className={`textarea-field ${
                      errors.address ? "border-error" : ""
                    }`}
                    rows="3"
                    {...register("address", {
                      required: "Address is required",
                    })}
                  ></textarea>
                  {errors.address && (
                    <span className="error-text">{errors.address.message}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="card">
              <div className="card-body">
                <h2 className="text-xl font-bold mb-4">
                  Financial Information
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="form-control">
                    <label className="form-label">Income Source</label>
                    <select
                      className={`select-field ${
                        errors.incomeSource ? "border-error" : ""
                      }`}
                      {...register("incomeSource", {
                        required: "Income source is required",
                      })}
                    >
                      <option value="">Select income source</option>
                      <option value="Salary">Salary/Employment</option>
                      <option value="Business">Business</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Investment">Investment</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.incomeSource && (
                      <span className="error-text">
                        {errors.incomeSource.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="form-label">Monthly Income ($)</label>
                    <input
                      type="number"
                      className={`input-field ${
                        errors.monthlyIncome ? "border-error" : ""
                      }`}
                      {...register("monthlyIncome", {
                        required: "Monthly income is required",
                        min: { value: 0, message: "Invalid amount" },
                      })}
                    />
                    {errors.monthlyIncome && (
                      <span className="error-text">
                        {errors.monthlyIncome.message}
                      </span>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="form-label">Loan Amount ($)</label>
                    <input
                      type="number"
                      className={`input-field ${
                        errors.loanAmount ? "border-error" : ""
                      }`}
                      {...register("loanAmount", {
                        required: "Loan amount is required",
                        min: { value: 10, message: "Minimum $10" },
                        max: {
                          value: loan.maxLoanLimit,
                          message: `Maximum $${loan.maxLoanLimit}`,
                        },
                      })}
                    />
                    {errors.loanAmount && (
                      <span className="error-text">
                        {errors.loanAmount.message}
                      </span>
                    )}
                    <span className="text-sm text-base-content/70 mt-1">
                      Max: ${loan.maxLoanLimit.toLocaleString()}
                    </span>
                  </div>

                  <div className="form-control">
                    <label className="form-label">Reason for Loan</label>
                    <input
                      type="text"
                      className={`input-field ${
                        errors.reason ? "border-error" : ""
                      }`}
                      {...register("reason", {
                        required: "Reason is required",
                      })}
                    />
                    {errors.reason && (
                      <span className="error-text">
                        {errors.reason.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="form-label">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    className="textarea-field"
                    rows="3"
                    placeholder="Any additional information..."
                    {...register("extraNotes")}
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Loan Summary */}
            {loanAmount && (
              <div className="card bg-primary/10">
                <div className="card-body">
                  <h3 className="text-xl font-bold mb-4">Loan Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-base-content/70">
                        Loan Amount
                      </p>
                      <p className="text-2xl font-bold">
                        ${parseFloat(loanAmount).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-base-content/70">
                        Interest Rate
                      </p>
                      <p className="text-2xl font-bold text-primary">
                        {loan.interestRate}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary w-full btn-lg"
              disabled={processing}
            >
              {processing ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Processing...
                </>
              ) : (
                "Proceed to Payment"
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default ApplyLoan
