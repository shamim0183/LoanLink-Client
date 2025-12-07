import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import PaymentDetailsModal from "../../components/modals/PaymentDetailsModal"
import LoadingSpinner from "../../components/shared/LoadingSpinner"
import useAuth from "../../hooks/useAuth"

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

const MyLoans = () => {
  const { user } = useAuth()
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [selectedPayment, setSelectedPayment] = useState(null)
  const [processingPayment, setProcessingPayment] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const applicationsPerPage = 5

  useEffect(() => {
    fetchMyApplications()
  }, [])

  const fetchMyApplications = async () => {
    try {
      setLoading(true)
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/applications/my-applications`,
        { withCredentials: true }
      )
      setApplications(data.applications || [])
    } catch (error) {
      console.error("Error fetching applications:", error)
      toast.error("Failed to load applications")
    } finally {
      setLoading(false)
    }
  }

  const handleCancelApplication = async (id) => {
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/applications/${id}/cancel`,
        {},
        { withCredentials: true }
      )

      toast.success("Application cancelled")
      fetchMyApplications() // Refresh list
    } catch (error) {
      console.error("Cancel error:", error)
      toast.error(
        error.response?.data?.message || "Failed to cancel application"
      )
    }
  }

  const handlePayment = async (applicationId) => {
    try {
      setProcessingPayment(applicationId)

      // Create payment intent
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/payments/create-intent`,
        {
          applicationId,
          amount: 10, // $10 application fee
        },
        { withCredentials: true }
      )

      const stripe = await stripePromise

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      })

      if (error) {
        toast.error(error.message)
      }
    } catch (error) {
      console.error("Payment error:", error)
      toast.error(error.response?.data?.message || "Payment failed")
    } finally {
      setProcessingPayment(null)
    }
  }

  const handleViewPaymentDetails = (application) => {
    // Create payment object from application
    const paymentDetails = {
      transactionId: application.paymentTransactionId || application._id,
      amount: "10.00",
      email: application.email || user?.email,
      paidAt: application.feePaidAt,
      loanId: application.loanId,
      paymentMethod: "Stripe",
      notes: `Application fee for ${application.loanTitle}`,
    }
    setSelectedPayment(paymentDetails)
  }

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true
    return app.status === filter
  })

  // Pagination
  const pageCount = Math.ceil(filteredApplications.length / applicationsPerPage)
  const offset = currentPage * applicationsPerPage
  const currentApplications = filteredApplications.slice(
    offset,
    offset + applicationsPerPage
  )

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: "badge-warning",
      approved: "badge-success",
      rejected: "badge-error",
      cancelled: "badge-neutral",
    }
    return badges[status] || "badge-neutral"
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">My Loan Applications</h1>
          <p className="text-base-content/70 mt-2">
            Track and manage your loan applications
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="tabs tabs-boxed mb-6 bg-base-100">
        {["all", "pending", "approved", "rejected", "cancelled"].map(
          (status) => (
            <a
              key={status}
              className={`tab ${filter === status ? "tab-active" : ""}`}
              onClick={() => {
                setFilter(status)
                setCurrentPage(0)
              }}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </a>
          )
        )}
      </div>

      {/* Applications List */}
      {filteredApplications.length > 0 ? (
        <>
          <div className="mb-4">
            <p className="text-base-content/70">
              Showing{" "}
              <span className="font-semibold text-primary">
                {currentApplications.length}
              </span>{" "}
              of {filteredApplications.length} application
              {filteredApplications.length !== 1 ? "s" : ""}
            </p>
          </div>
          <div className="space-y-4">
            {currentApplications.map((app, index) => (
              <motion.div
                key={app._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="card-body">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold">{app.loanTitle}</h3>
                        <span
                          className={`badge flex justify-center items-center py-4 ${getStatusBadge(
                            app.status
                          )}`}
                        >
                          {app.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-sm text-base-content/70">
                            Loan Amount
                          </p>
                          <p className="font-semibold">
                            ${app.loanAmount?.toLocaleString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-base-content/70">
                            Interest Rate
                          </p>
                          <p className="font-semibold text-primary">
                            {app.interestRate}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-base-content/70">
                            Applied On
                          </p>
                          <p className="font-semibold">
                            {new Date(app.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-base-content/70">
                            Applicant
                          </p>
                          <p className="font-semibold">
                            {app.firstName} {app.lastName}
                          </p>
                        </div>
                      </div>

                      {app.status === "approved" && app.approvedAt && (
                        <div className="mt-4 p-3 bg-success/10 rounded-lg">
                          <p className="text-sm text-success font-semibold">
                            ✓ Approved on{" "}
                            {new Date(app.approvedAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}

                      {app.status === "rejected" && app.rejectedAt && (
                        <div className="mt-4 p-3 bg-error/10 rounded-lg">
                          <p className="text-sm text-error font-semibold">
                            ✗ Rejected on{" "}
                            {new Date(app.rejectedAt).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 flex-wrap">
                      {/* Pay Button - Show if fee not paid */}
                      {app.feeStatus === "unpaid" && (
                        <button
                          onClick={() => handlePayment(app._id)}
                          className="btn btn-primary btn-sm"
                          disabled={processingPayment === app._id}
                        >
                          {processingPayment === app._id ? (
                            <span className="loading loading-spinner loading-sm"></span>
                          ) : (
                            "Pay $10 Fee"
                          )}
                        </button>
                      )}

                      {/* View Receipt Button - for paid fees */}
                      {app.feeStatus === "paid" && (
                        <a
                          href={`/receipt/${app._id}`}
                          className="btn btn-success btn-sm gap-2"
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
                        </a>
                      )}

                      {/* Cancel Button - Only for pending */}
                      {app.status === "pending" && (
                        <button
                          onClick={() => handleCancelApplication(app._id)}
                          className="btn btn-error btn-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {pageCount > 1 && (
            <div className="mt-8 flex justify-center">
              <ReactPaginate
                previousLabel={"← Previous"}
                nextLabel={"Next →"}
                pageCount={pageCount}
                onPageChange={handlePageClick}
                containerClassName={"join"}
                pageClassName={"join-item btn btn-sm"}
                previousClassName={"join-item btn btn-sm"}
                nextClassName={"join-item btn btn-sm"}
                activeClassName={"btn-active btn-primary"}
                disabledClassName={"btn-disabled"}
                forcePage={currentPage}
              />
            </div>
          )}
        </>
      ) : (
        <div className="card">
          <div className="card-body text-center py-12">
            <p className="text-lg text-base-content/70">
              {filter === "all"
                ? "No loan applications yet"
                : `No ${filter} applications`}
            </p>
            {filter === "all" && (
              <a href="/all-loans" className="btn btn-primary mt-4">
                Browse Available Loans
              </a>
            )}
          </div>
        </div>
      )}

      {/* Payment Details Modal */}
      {selectedPayment && (
        <PaymentDetailsModal
          payment={selectedPayment}
          onClose={() => setSelectedPayment(null)}
        />
      )}
    </div>
  )
}

export default MyLoans
