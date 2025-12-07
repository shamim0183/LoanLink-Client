import React from "react";
import axios from "axios";
import { motion } from "framer-motion"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import LoadingSpinner from "../../components/shared/LoadingSpinner"

const PaymentHistory = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState("all") // all, completed, pending

  // Fetch payment history using TanStack Query
  const { data: payments = [], isLoading: loading } = useQuery({
    queryKey: ["payment-history"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/payments/history`,
        { withCredentials: true }
      )
      return data.payments || []
    },
  })

  const filteredPayments = payments.filter((payment) => {
    if (filter === "all") return true
    return payment.status === filter
  })

  const handleViewReceipt = (payment) => {
    // Navigate to receipt page using application ID
    navigate(`/receipt/${payment.applicationId._id}`)
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Payment History</h1>
          <p className="text-base-content/70 mt-2">
            View all your payment receipts and transaction history
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tabs tabs-boxed mb-6 bg-base-100">
        {["all", "completed", "pending"].map((status) => (
          <a
            key={status}
            className={`tab ${filter === status ? "tab-active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </a>
        ))}
      </div>

      {/* Payment List */}
      {filteredPayments.length > 0 ? (
        <>
          <div className="mb-4">
            <p className="text-base-content/70">
              Showing{" "}
              <span className="font-semibold text-primary">
                {filteredPayments.length}
              </span>{" "}
              payment{filteredPayments.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="space-y-4">
            {filteredPayments.map((payment, index) => (
              <motion.div
                key={payment._id}
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
                                  .toUpperCase()}${payment.loanId.category.slice(
                                  1
                                )} Loan`
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
                          <p className="text-sm text-base-content/70">
                            Payment Date
                          </p>
                          <p className="font-semibold">
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-base-content/70">
                            Transaction ID
                          </p>
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
                              className={`badge badge-sm ${
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
                          onClick={() => handleViewReceipt(payment)}
                          className="btn btn-primary btn-sm gap-2"
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
            ))}
          </div>
        </>
      ) : (
        <div className="card">
          <div className="card-body text-center py-12">
            <div className="w-24 h-24 bg-base-200 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-base-content/40"
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
            </div>
            <p className="text-lg text-base-content/70 mb-2">
              {filter === "all"
                ? "No payment history yet"
                : `No ${filter} payments`}
            </p>
            <p className="text-sm text-base-content/50">
              Your payment transactions will appear here
            </p>
            {filter === "all" && (
              <button
                onClick={() => navigate("/all-loans")}
                className="btn btn-primary mt-4"
              >
                Browse Available Loans
              </button>
            )}
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {filteredPayments.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card mt-6 bg-gradient-to-br from-primary/10 to-secondary/10"
        >
          <div className="card-body">
            <h3 className="text-lg font-bold mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-base-100 p-4 rounded-lg">
                <p className="text-sm text-base-content/70 mb-1">
                  Total Payments
                </p>
                <p className="text-2xl font-bold text-primary">
                  {payments.length}
                </p>
              </div>
              <div className="bg-base-100 p-4 rounded-lg">
                <p className="text-sm text-base-content/70 mb-1">
                  Total Amount Paid
                </p>
                <p className="text-2xl font-bold text-success">
                  ${payments.reduce((sum, p) => sum + p.amount, 0).toFixed(2)}
                </p>
              </div>
              <div className="bg-base-100 p-4 rounded-lg">
                <p className="text-sm text-base-content/70 mb-1">
                  Completed Payments
                </p>
                <p className="text-2xl font-bold text-info">
                  {payments.filter((p) => p.status === "completed").length}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default PaymentHistory
