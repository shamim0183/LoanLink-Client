import React from "react"
import { motion } from "framer-motion"
import { FaArrowLeft, FaExclamationTriangle, FaRedo } from "react-icons/fa"
import { useNavigate, useParams } from "react-router-dom"
import useDocumentTitle from "../hooks/useDocumentTitle"

const PaymentCancel = () => {
  useDocumentTitle("Payment Cancelled - LoanLink")

  const navigate = useNavigate()
  const { id } = useParams() // loan ID if coming from apply-loan

  return (
    <div className="min-h-screen bg-gradient-to-br from-error/20 via-base-200 to-warning/20 flex items-center justify-center py-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card bg-base-100 shadow-2xl"
        >
          <div className="card-body text-center">
            {/* Warning Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block"
            >
              <FaExclamationTriangle className="text-warning text-8xl mb-4 mx-auto" />
            </motion.div>

            {/* Header */}
            <h1 className="text-3xl font-bold mb-2">Payment Cancelled</h1>
            <p className="text-base-content/70 mb-6">
              Your payment was not completed. No charges were made to your
              account.
            </p>

            {/* Info Alert */}
            <div className="alert alert-info mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div className="text-left">
                <p className="font-semibold">What happened?</p>
                <p className="text-sm">
                  You either cancelled the payment or closed the checkout page.
                  Your loan application was not submitted.
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button
                onClick={() => navigate(-1)}
                className="btn btn-primary gap-2"
              >
                <FaRedo />
                Try Again
              </button>
              <button
                onClick={() => navigate("/all-loans")}
                className="btn btn-outline gap-2"
              >
                <FaArrowLeft />
                Browse Other Loans
              </button>
            </div>

            {/* Help Text */}
            <div className="mt-8 text-sm text-base-content/60">
              <p>Need help? Contact our support team:</p>
              <p className="font-semibold text-primary">support@loanlink.com</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default PaymentCancel
