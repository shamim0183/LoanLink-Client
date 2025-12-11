import React from "react";
import axios from "axios";
import confetti from "canvas-confetti"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import useDocumentTitle from "../hooks/useDocumentTitle"

const Receipt = () => {
  useDocumentTitle("Payment Receipt - LoanLink")

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

  const downloadReceipt = () => {
    try {
      setDownloading(true)

      // Use browser's native print dialog - fully supports oklch and all modern CSS
      window.print()

      toast.success("Use 'Save as PDF' in the print dialog to download")
    } catch (error) {
      console.error("Error opening print dialog:", error)
      toast.error("Failed to open print dialog")
    } finally {
      // Delay to allow print dialog to open
      setTimeout(() => setDownloading(false), 500)
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
    <>
      {/* Print-specific CSS */}
      <style>{`
        @media print {
          /* Hide everything on the page */
          body * {
            visibility: hidden;
          }
          
          /* Only show the receipt content */
          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }
          
          /* Position receipt at top of page */
          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 10px !important;
            max-height: 100vh !important;
            overflow: hidden !important;
          }
          
          /* Hide parent containers that cause extra pages */
          body {
            overflow: hidden !important;
          }
          
          /* Optimize table styling for print */
          #receipt-content table {
            font-size: 11px !important;
          }
          
          #receipt-content table td {
            padding: 6px 8px !important;
          }
          
          #receipt-content h3 {
            font-size: 14px !important;
            margin-bottom: 8px !important;
            margin-top: 8px !important;
          }
          
          #receipt-content h2 {
            font-size: 22px !important;
          }
          
          /* Compact header */
          #receipt-content .pb-4 {
            padding-bottom: 8px !important;
          }
          
          #receipt-content .mb-6 {
            margin-bottom: 12px !important;
          }
          
          #receipt-content .mb-4 {
            margin-bottom: 8px !important;
          }
          
          #receipt-content .mb-3 {
            margin-bottom: 6px !important;
          }
          
          /* Reduce amount font size */
          #receipt-content .text-2xl {
            font-size: 18px !important;
          }
          
          /* Footer styling */
          #receipt-content .mt-6 {
            margin-top: 10px !important;
          }
          
          #receipt-content .pt-4 {
            padding-top: 8px !important;
          }
          
          /* Remove page margins and set size */
          @page {
            margin: 0.5cm;
            size: A4;
          }
          
          /* Ensure no page breaks */
          #receipt-content {
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          
          #receipt-content table {
            page-break-inside: avoid !important;
          }
          
          /* Hide everything after receipt */
          #receipt-content ~ * {
            display: none !important;
          }
        }
      `}</style>

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
              <div className="text-center border-b-2 border-primary pb-4 mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="text-3xl">📊</span>
                  <h2 className="text-3xl font-bold text-primary">LoanLink</h2>
                </div>
                <p className="text-sm text-base-content/60 font-semibold">
                  PAYMENT RECEIPT
                </p>
                <p className="text-xs text-base-content/50 mt-1">
                  Transaction ID: {payment.transactionId}
                </p>
              </div>

              {/* Payment Summary Table */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-primary">
                  Payment Information
                </h3>
                <table className="table table-zebra w-full">
                  <tbody>
                    <tr>
                      <td className="font-semibold w-1/3">Amount Paid</td>
                      <td className="text-right">
                        <span className="text-2xl font-bold text-success">
                          ${payment.amount.toFixed(2)}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Payment Date</td>
                      <td className="text-right">
                        {new Date(payment.createdAt).toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Payment Method</td>
                      <td className="text-right">Stripe</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Applicant Details Table */}
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-3 text-primary">
                  Applicant Details
                </h3>
                <table className="table table-zebra w-full">
                  <tbody>
                    <tr>
                      <td className="font-semibold w-1/3">Full Name</td>
                      <td className="text-right">
                        {payment.applicationId.firstName}{" "}
                        {payment.applicationId.lastName}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Email</td>
                      <td className="text-right">{payment.userEmail}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Contact Number</td>
                      <td className="text-right">
                        {payment.applicationId.contactNumber}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">National ID</td>
                      <td className="text-right">
                        {payment.applicationId.nationalId}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Loan Details Table */}
              <div className="mb-4">
                <h3 className="text-lg font-bold mb-3 text-primary">
                  Loan Details
                </h3>
                <table className="table table-zebra w-full">
                  <tbody>
                    <tr>
                      <td className="font-semibold w-1/3">Loan Type</td>
                      <td className="text-right">{payment.loanId.title}</td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Category</td>
                      <td className="text-right capitalize">
                        {payment.loanId.category}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Requested Amount</td>
                      <td className="text-right font-bold text-primary">
                        ${payment.applicationId.loanAmount.toLocaleString()}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-semibold">Interest Rate</td>
                      <td className="text-right font-bold text-primary">
                        {payment.applicationId.interestRate}%
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Footer Note */}
              <div className="text-center mt-6 pt-4 border-t">
                <p className="text-xs text-base-content/50">
                  Thank you for choosing LoanLink. For any queries, please
                  contact our support team.
                </p>
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
    </>
  )
}

export default Receipt
