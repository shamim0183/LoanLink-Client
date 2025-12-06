import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import axios from "axios"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { FaArrowLeft, FaCreditCard } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import useAuth from "../hooks/useAuth"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const PaymentForm = ({ loanData, applicationData, onSuccess }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)

  const handlePayment = async (e) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setProcessing(true)

    try {
      // Create payment intent on backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-intent`,
        {
          amount: 10, // $10 application fee
          applicationData,
        },
        { withCredentials: true }
      )

      // Confirm payment
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        data.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      )

      if (error) {
        toast.error(error.message)
      } else if (paymentIntent.status === "succeeded") {
        // Payment successful
        onSuccess(paymentIntent)
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Payment failed. Please try again.")
    } finally {
      setProcessing(false)
    }
  }

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <div className="card bg-base-100">
        <div className="card-body">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FaCreditCard className="text-primary" />
            Payment Information
          </h3>

          <div className="bg-base-200 p-4 rounded-lg mb-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#1A1A2E",
                    "::placeholder": {
                      color: "#8B95A5",
                    },
                  },
                  invalid: {
                    color: "#DC3545",
                  },
                },
              }}
            />
          </div>

          <div className="alert alert-info">
            <div>
              <p className="font-semibold">Application Fee: $10.00</p>
              <p className="text-sm">One-time non-refundable processing fee</p>
            </div>
          </div>

          <button
            type="submit"
            disabled={!stripe || processing}
            className="btn btn-primary w-full btn-lg"
          >
            {processing ? (
              <>
                <span className="loading loading-spinner"></span>
                Processing...
              </>
            ) : (
              `Pay $10 & Submit Application`
            )}
          </button>
        </div>
      </div>
    </form>
  )
}

const ApplyLoan = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loan, setLoan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showPayment, setShowPayment] = useState(false)
  const [applicationData, setApplicationData] = useState(null)

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
      // Demo data
      setLoan({
        _id: id,
        title: "Personal Loan",
        interestRate: 8.5,
        maxLoanLimit: 50000,
        emiPlans: ["6 months", "12 months", "18 months", "24 months"],
      })
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = (data) => {
    setApplicationData(data)
    setShowPayment(true)
  }

  const handlePaymentSuccess = async (paymentIntent) => {
    try {
      // Submit application to backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/applications`,
        {
          ...applicationData,
          loanId: loan._id,
          loanTitle: loan.title,
          interestRate: loan.interestRate,
          transactionId: paymentIntent.id,
        },
        { withCredentials: true }
      )

      // Show success with confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      Swal.fire({
        icon: "success",
        title: "Application Submitted!",
        html: `
          <p>Your loan application has been submitted successfully.</p>
          <p class="text-sm text-gray-600 mt-2">Transaction ID: ${paymentIntent.id}</p>
          <p class="text-sm text-gray-600">We'll review your application and get back to you soon.</p>
        `,
        confirmButtonText: "View My Loans",
        confirmButtonColor: "#FF6B2C",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/dashboard/my-loans")
        }
      })
    } catch (error) {
      console.error("Application error:", error)
      toast.error("Failed to submit application")
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
          onClick={() => navigate(-1)}
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

          {!showPayment ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Personal Information */}
              <div className="card">
                <div className="card-body">
                  <h2 className="text-xl font-bold mb-4">
                    Personal Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="form-label">First Name</label>
                      <input
                        type="text"
                        className={`input-field ${
                          errors.firstName ? "border-error" : ""
                        }`}
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                      />
                      {errors.firstName && (
                        <span className="error-text">
                          {errors.firstName.message}
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="form-label">Last Name</label>
                      <input
                        type="text"
                        className={`input-field ${
                          errors.lastName ? "border-error" : ""
                        }`}
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                      />
                      {errors.lastName && (
                        <span className="error-text">
                          {errors.lastName.message}
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="form-label">Contact Number</label>
                      <input
                        type="tel"
                        className={`input-field ${
                          errors.contactNumber ? "border-error" : ""
                        }`}
                        {...register("contactNumber", {
                          required: "Contact number is required",
                        })}
                      />
                      {errors.contactNumber && (
                        <span className="error-text">
                          {errors.contactNumber.message}
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label className="form-label">National ID</label>
                      <input
                        type="text"
                        className={`input-field ${
                          errors.nationalId ? "border-error" : ""
                        }`}
                        {...register("nationalId", {
                          required: "National ID is required",
                        })}
                      />
                      {errors.nationalId && (
                        <span className="error-text">
                          {errors.nationalId.message}
                        </span>
                      )}
                    </div>
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
                      <span className="error-text">
                        {errors.address.message}
                      </span>
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
                          min: { value: 100, message: "Minimum $100" },
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

              <button type="submit" className="btn btn-primary w-full btn-lg">
                Proceed to Payment
              </button>
            </form>
          ) : (
            <Elements stripe={stripePromise}>
              <PaymentForm
                loanData={loan}
                applicationData={applicationData}
                onSuccess={handlePaymentSuccess}
              />
            </Elements>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default ApplyLoan
