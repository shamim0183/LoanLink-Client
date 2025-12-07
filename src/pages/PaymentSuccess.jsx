import React from "react"
import axios from "axios"
import confetti from "canvas-confetti"
import { motion } from "framer-motion"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import {
  FaCheckCircle,
  FaDownload,
  FaHome,
  FaListAlt,
  FaReceipt,
} from "react-icons/fa"
import { useNavigate, useSearchParams } from "react-router-dom"
import LoadingSpinner from "../components/shared/LoadingSpinner"

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const sessionId = searchParams.get("session_id")

  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    if (!sessionId) {
      toast.error("Invalid payment session")
      navigate("/all-loans")
      return
    }

    fetchPaymentReceipt()
    triggerConfetti()
  }, [sessionId])

  const triggerConfetti = () => {
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }

  const fetchPaymentReceipt = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payments/receipt/${sessionId}`,
        { withCredentials: true }
      )
      setPayment(data.payment)
    } catch (error) {
      console.error("Error fetching receipt:", error)

      // If payment not found (404), try to create it from Stripe session
      if (error.response?.status === 404) {
        try {
          toast.loading("Processing your payment receipt...")

          // Call backend to fetch Stripe session and save data
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_URL}/payments/process-session`,
            { sessionId },
            { withCredentials: true }
          )

          setPayment(data.payment)
          toast.dismiss()
          toast.success("Receipt loaded successfully!")
        } catch (processError) {
          console.error("Error processing session:", processError)
          toast.dismiss()
          toast.error(
            "Payment successful but receipt processing failed. Please check My Applications.",
            { duration: 6000 }
          )
          setTimeout(() => navigate("/dashboard"), 3000)
        }
      } else {
        toast.error("Failed to load payment details")
        setTimeout(() => navigate("/dashboard"), 3000)
      }
    } finally {
      setLoading(false)
    }
  }

  const downloadReceipt = async () => {
    try {
      setDownloading(true)
      const receiptElement = document.getElementById("payment-receipt")

      const canvas = await html2canvas(receiptElement, {
        scale: 2,
        logging: false,
        backgroundColor: "#ffffff",
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const imgWidth = 210 // A4 width in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight)
      pdf.save(`Payment-Receipt-${payment.transactionId}.pdf`)

      toast.success("Receipt downloaded successfully!")
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Failed to download receipt")
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!payment) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-success/20 via-base-200 to-primary/20 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Success Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <FaCheckCircle className="text-success text-8xl mb-4 mx-auto" />
            </motion.div>
            <h1 className="text-4xl font-bold text-success mb-2">
              Payment Successful!
            </h1>
            <p className="text-xl text-base-content/70">
              Your loan application has been submitted
            </p>
          </div>

          {/* Payment Receipt */}
          <div
            id="payment-receipt"
            className="card bg-base-100 shadow-2xl mb-6"
          >
            <div className="card-body">
              {/* Header */}
              <div className="text-center border-b pb-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <FaReceipt className="text-primary text-2xl" />
                  <h2 className="text-3xl font-bold">
                    Loan<span className="text-primary">Link</span>
                  </h2>
                </div>
                <p className="text-sm text-base-content/60">Payment Receipt</p>
              </div>

              {/* Transaction Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-base-content/60 mb-1">
                    Transaction ID
                  </p>
                  <p className="font-mono font-bold">{payment.transactionId}</p>
                </div>
                <div>
                  <p className="text-sm text-base-content/60 mb-1">
                    Payment Date
                  </p>
                  <p className="font-semibold">
                    {new Date(payment.createdAt).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-base-content/60 mb-1">
                    Payment Method
                  </p>
                  <p className="font-semibold capitalize">
                    {payment.paymentMethod}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-base-content/60 mb-1">Status</p>
                  <span className="badge badge-success badge-lg flex justify-center items-center py-2">
                    {payment.status}
                  </span>
                </div>
              </div>

              <div className="divider"></div>

              {/* Amount Paid */}
              <div className="bg-primary/10 rounded-lg p-6 mb-6">
                <p className="text-sm text-base-content/60 mb-2">
                  Application Fee Paid
                </p>
                <p className="text-4xl font-bold text-primary">
                  ${payment.amount.toFixed(2)}
                </p>
              </div>

              {/* Loan Details */}
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">Loan Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-base-content/60 mb-1">
                      Loan Type
                    </p>
                    <p className="font-semibold">{payment.loanId.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60 mb-1">
                      Category
                    </p>
                    <p className="font-semibold capitalize">
                      {payment.loanId.category}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60 mb-1">
                      Requested Amount
                    </p>
                    <p className="font-semibold text-lg">
                      ${payment.applicationId.loanAmount.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60 mb-1">
                      Interest Rate
                    </p>
                    <p className="font-semibold text-lg text-primary">
                      {payment.loanId.interestRate}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {/* Applicant Information */}
              <div>
                <h3 className="text-xl font-bold mb-4">
                  Applicant Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-base-content/60 mb-1">
                      Full Name
                    </p>
                    <p className="font-semibold">
                      {payment.applicationId.firstName}{" "}
                      {payment.applicationId.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60 mb-1">Email</p>
                    <p className="font-semibold">{payment.userEmail}</p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60 mb-1">
                      Contact Number
                    </p>
                    <p className="font-semibold">
                      {payment.applicationId.contactNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-base-content/60 mb-1">
                      National ID
                    </p>
                    <p className="font-semibold">
                      {payment.applicationId.nationalId}
                    </p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-base-content/60 mb-1">
                      Application Status
                    </p>
                    <span className="badge badge-warning badge-lg capitalize justify-center flex items-center py-2">
                      {payment.applicationId.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer Note */}
              <div className="mt-6 pt-6 border-t text-center text-sm text-base-content/60">
                <p>
                  Thank you for choosing LoanLink. Your application is now under
                  review.
                </p>
                <p className="mt-2">
                  You will be notified once a decision has been made.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={downloadReceipt}
              disabled={downloading}
              className="btn btn-primary gap-2"
            >
              <FaDownload />
              {downloading ? "Downloading..." : "Download Receipt"}
            </button>
            <button
              onClick={() => navigate("/dashboard/my-loans")}
              className="btn btn-outline gap-2"
            >
              <FaListAlt />
              View My Applications
            </button>
            <button
              onClick={() => navigate("/dashboard")}
              className="btn btn-outline gap-2"
            >
              <FaHome />
              Go to Dashboard
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentSuccess
