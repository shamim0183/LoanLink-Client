import React from "react"
import { motion } from "framer-motion"

const PaymentCard = ({ payment, index, onViewReceipt }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card hover:shadow-lg transition-shadow"
    >
      <div className="card-body">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Payment Info */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-success"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {payment.loanId?.title || "Loan Application Fee"}
                </h3>
                <p className="text-sm text-base-content/60">
                  {payment.loanId?.category
                    ? `${payment.loanId.category
                        .charAt(0)
                        .toUpperCase()}${payment.loanId.category.slice(1)} Loan`
                    : "Application Fee"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-base-content/70">Amount</p>
                <p className="font-bold text-success text-lg">
                  ${payment.amount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Payment Date</p>
                <p className="font-semibold">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Transaction ID</p>
                <p className="font-mono text-xs break-all">
                  {payment.transactionId?.substring(0, 20)}...
                </p>
              </div>
              <div>
                <p className="text-sm text-base-content/70">Status</p>
                <span
                  className={`badge ${
                    payment.status === "completed"
                      ? "badge-success"
                      : "badge-warning"
                  } flex items-center justify-center py-3`}
                >
                  {payment.status}
                </span>
              </div>
            </div>

            {/* Application Status */}
            {payment.applicationId && (
              <div className="mt-4 p-3 bg-base-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-base-content/70">
                    Application Status:
                  </span>
                  <span
                    className={`badge badge-sm flex items-center justify-center py-3 ${
                      payment.applicationId.status === "approved"
                        ? "badge-success"
                        : payment.applicationId.status === "rejected"
                        ? "badge-error"
                        : payment.applicationId.status === "pending"
                        ? "badge-warning"
                        : "badge-neutral"
                    }`}
                  >
                    {payment.applicationId.status}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 flex-wrap">
            {payment.status === "completed" && (
              <button
                onClick={() => onViewReceipt(payment)}
                className="btn btn-primary gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                View Receipt
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PaymentCard
