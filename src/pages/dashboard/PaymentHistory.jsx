import React from "react"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { PaymentCard, PaymentSummaryStats } from "../../components/dashboard"
import { LoadingSpinner } from "../../components/shared"
import useDocumentTitle from "../../hooks/useDocumentTitle"

const PaymentHistory = () => {
  useDocumentTitle("Payment History - LoanLink")

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
              <PaymentCard
                key={payment._id}
                payment={payment}
                index={index}
                onViewReceipt={handleViewReceipt}
              />
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
        <PaymentSummaryStats payments={payments} />
      )}
    </div>
  )
}

export default PaymentHistory
