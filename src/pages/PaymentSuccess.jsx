import React from "react";
import axios from "axios";
import confetti from "canvas-confetti"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaCheckCircle, FaDownload, FaHome, FaListAlt } from "react-icons/fa"
import { useNavigate, useSearchParams } from "react-router-dom"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import ReceiptCard from "../components/shared/ReceiptCard"
import useDocumentTitle from "../hooks/useDocumentTitle"

const PaymentSuccess = () => {
  useDocumentTitle("Payment Successful - LoanLink")

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

  const downloadReceipt = () => {
    try {
      setDownloading(true)
      // Use browser's print functionality
      window.print()
      toast.success("Print dialog opened!")
    } catch (error) {
      console.error("Download error:", error)
      toast.error("Failed to open print dialog")
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
    <>
      {/* Print-specific CSS - Only show receipt when printing */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          
          #receipt-content,
          #receipt-content * {
            visibility: visible;
          }
          
          #receipt-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            box-shadow: none !important;
            margin: 0 !important;
            padding: 20px !important;
          }
          
          @page {
            margin: 0.5cm;
            size: A4;
          }
        }
      `}</style>

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
            <ReceiptCard payment={payment} />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
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
    </>
  )
}

export default PaymentSuccess
