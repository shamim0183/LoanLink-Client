import React from "react"
import axios from "axios";
import confetti from "canvas-confetti"
import { motion } from "framer-motion"
import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import LoadingSpinner from "../components/shared/LoadingSpinner"

const Receipt = () => {
  const { applicationId } = useParams()
  const navigate = useNavigate()
  const [payment, setPayment] = useState(null)
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  useEffect(() => {
    // Trigger confetti
    const duration = 3 * 1000
    const end = Date.now() + duration

    const colors = ["#ff6b6b", "#4ecdc4", "#45b7d1", "#f7b731", "#5f27cd"]

    ;(function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    })()

    // Fetch payment details
    fetchPaymentByApplication()
  }, [applicationId])

  const fetchPaymentByApplication = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/payments/by-application/${applicationId}`,
        { withCredentials: true }
      )
      setPayment(data.payment)
    } catch (error) {
      console.error("Error fetching receipt:", error)
      toast.error("Failed to load receipt")
      setTimeout(() => navigate("/dashboard/my-loans"), 2000)
    } finally {
      setLoading(false)
    }
  }

  const downloadReceipt = async () => {
    try {
      setDownloading(true)
      const element = document.getElementById("receipt-content")

      const canvas = await html2canvas(element, {
        scale: 2,
        logging: false,
        useCORS: true,
      })

      const imgData = canvas.toDataURL("image/png")
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      })

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)
      pdf.save(`Payment-Receipt-${payment.transactionId}.pdf`)
      toast.success("Receipt downloaded successfully!")
    } catch (error) {
      console.error("Error downloading receipt:", error)
      toast.error("Failed to download receipt")
    } finally {
      setDownloading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!payment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Receipt Not Found</h2>
          <button
            onClick={() => navigate("/dashboard/my-loans")}
            className="btn btn-primary"
          >
            Back to My Applications
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-base-100 to-secondary/5 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="container mx-auto max-w-4xl"
      >
        {/* Success Header */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 bg-success rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </motion.div>
          <h1 className="text-4xl font-bold text-success mb-2">
            Payment Successful!
          </h1>
          <p className="text-lg text-base-content/70">
            Your loan application has been submitted
          </p>
        </div>

        {/* Receipt Card */}
        <div id="receipt-content" className="card bg-base-100 shadow-2xl">
          <div className="card-body p-8">
            {/* Header */}
            <div className="text-center border-b pb-6 mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-3xl">📊</span>
                <h2 className="text-2xl font-bold">LoanLink</h2>
              </div>
              <p className="text-sm text-base-content/60">Payment Receipt</p>
            </div>

            {/* Transaction Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm text-base-content/60 mb-1">
                  Transaction ID
                </p>
                <p className="font-mono font-bold text-primary break-all">
                  {payment.transactionId}
                </p>
              </div>
              <div className="bg-base-200 p-4 rounded-lg">
                <p className="text-sm text-base-content/60 mb-1">Session ID</p>
                <p className="font-mono text-sm break-all">
                  {payment.stripeSessionId}
                </p>
              </div>
            </div>

            {/* Payment Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-base-content/60 mb-1">Amount Paid</p>
                <p className="text-3xl font-bold text-success">
                  ${payment.amount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-base-content/60 mb-1">
                  Payment Date
                </p>
                <p className="text-lg font-semibold">
                  {new Date(payment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="divider"></div>

            {/* Application Details */}
            <h3 className="text-xl font-bold mb-4">Application Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-base-content/60 mb-1">
                  Applicant Name
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
                <p className="text-sm text-base-content/60 mb-1">National ID</p>
                <p className="font-semibold">
                  {payment.applicationId.nationalId}
                </p>
              </div>
            </div>

            <div className="divider"></div>

            {/* Loan Details */}
            <h3 className="text-xl font-bold mb-4">Loan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-base-content/60 mb-1">Loan Type</p>
                <p className="font-semibold">{payment.loanId.title}</p>
              </div>
              <div>
                <p className="text-sm text-base-content/60 mb-1">Category</p>
                <p className="font-semibold capitalize">
                  {payment.loanId.category}
                </p>
              </div>
              <div>
                <p className="text-sm text-base-content/60 mb-1">
                  Requested Amount
                </p>
                <p className="font-semibold text-primary">
                  ${payment.applicationId.loanAmount.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-base-content/60 mb-1">
                  Interest Rate
                </p>
                <p className="font-semibold text-primary">
                  {payment.applicationId.interestRate}%
                </p>
              </div>
            </div>

            <div className="divider"></div>

            {/* Status */}
            <div className="bg-warning/10 p-4 rounded-lg">
              <div className="flex justify-between items-center flex-wrap gap-2">
                <div>
                  <p className="text-sm text-base-content/60 mb-1">
                    Application Status
                  </p>
                  <span className="badge badge-warning badge-lg capitalize justify-center flex items-center py-2">
                    {payment.applicationId.status}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-base-content/60">
                    Your application is under review
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-8 justify-center">
          <button
            onClick={downloadReceipt}
            disabled={downloading}
            className="btn btn-primary gap-2"
          >
            {downloading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Generating PDF...
              </>
            ) : (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Receipt
              </>
            )}
          </button>

          <button
            onClick={() => navigate("/dashboard/my-loans")}
            className="btn btn-outline"
          >
            My Applications
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="btn btn-ghost"
          >
            Dashboard
          </button>
        </div>
      </motion.div>
    </div>
  )
}

export default Receipt
