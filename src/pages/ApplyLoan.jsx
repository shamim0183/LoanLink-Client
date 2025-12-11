import React from "react"
import axios from "axios";
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaArrowLeft } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import {
  FinancialInformationFields,
  PersonalInformationFields,
} from "../components/loan"
import { LoadingSpinner } from "../components/shared"
import { ERROR_MESSAGES } from "../constants"
import useAuth from "../hooks/useAuth"
import useDocumentTitle from "../hooks/useDocumentTitle"

const ApplyLoan = () => {
  useDocumentTitle("Apply for Loan - LoanLink")

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

      // Check if user is suspended
      if (error.response?.status === 403 && error.response?.data?.suspended) {
        const { suspensionReason, suspendUntil } = error.response.data
        const untilDate = suspendUntil
          ? new Date(suspendUntil).toLocaleString()
          : "indefinitely"
        toast.error(
          `Account Suspended: ${
            suspensionReason || "No reason provided"
          }. Suspended until ${untilDate}`,
          { duration: 6000 }
        )
      } else {
        toast.error(ERROR_MESSAGES.PAYMENT_PROCESSING_FAILED)
      }
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
                <PersonalInformationFields
                  register={register}
                  errors={errors}
                />
              </div>
            </div>

            {/* Financial Information */}
            <div className="card">
              <div className="card-body">
                <h2 className="text-xl font-bold mb-4">
                  Financial Information
                </h2>
                <FinancialInformationFields
                  register={register}
                  errors={errors}
                  maxLoanLimit={loan.maxLoanLimit}
                />
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
