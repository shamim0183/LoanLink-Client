import React from "react"
import axios from "axios"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaArrowLeft, FaCheckCircle } from "react-icons/fa"
import { Link, useNavigate, useParams } from "react-router-dom"
import LoadingSpinner from "../components/shared/LoadingSpinner"
import useAuth from "../hooks/useAuth"

const LoanDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [loan, setLoan] = useState(null)
  const [loading, setLoading] = useState(true)

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
      console.error("Error fetching loan:", error)
      // Demo data for development
      setLoan({
        _id: id,
        title: "Personal Loan",
        description:
          "Our personal loan is designed to help you meet your immediate financial needs with flexible repayment options and competitive interest rates. Whether it's for a medical emergency, home renovation, or debt consolidation, we've got you covered.",
        category: "Personal",
        interestRate: 8.5,
        maxLoanLimit: 50000,
        requiredDocuments: [
          "Valid Government ID",
          "Proof of Income (Last 3 months)",
          "Bank Statements (Last 6 months)",
          "Address Proof",
        ],
        emiPlans: ["6 months", "12 months", "18 months", "24 months"],
        images: [
          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=600&fit=crop",
        ],
      })
    } finally {
      setLoading(false)
    }
  }

  const handleApplyNow = () => {
    if (!user) {
      toast.error("Please login to apply for a loan")
      navigate("/login", {
        state: { from: { pathname: `/loan-details/${id}` } },
      })
      return
    }

    if (user.role === "admin" || user.role === "manager") {
      toast.error("Admins and Managers cannot apply for loans")
      return
    }

    // Navigate to application form
    navigate(`/apply-loan/${id}`)
  }

  if (loading) {
    return <LoadingSpinner fullScreen />
  }

  if (!loan) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loan not found</h2>
          <Link to="/all-loans" className="btn btn-primary">
            Back to All Loans
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-200 py-12">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/all-loans" className="btn btn-ghost gap-2 mb-6">
          <FaArrowLeft />
          Back to All Loans
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <figure className="h-96 overflow-hidden rounded-lg">
                <img
                  src={loan.images[0]}
                  alt={loan.title}
                  className="w-full h-full object-cover"
                />
              </figure>
            </motion.div>

            {/* Loan Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <div className="card-body">
                <div className="badge badge-primary mb-2 flex justify-center items-center py-3">
                  {loan.category}
                </div>
                <h1 className="text-3xl font-bold mb-4">{loan.title}</h1>
                <p className="text-base-content/70 leading-relaxed">
                  {loan.description}
                </p>
              </div>
            </motion.div>

            {/* Required Documents */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <div className="card-body">
                <h3 className="text-xl font-bold mb-4">Required Documents</h3>
                <ul className="space-y-3">
                  {loan.requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FaCheckCircle className="text-success mt-1 flex-shrink-0" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* EMI Plans */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <div className="card-body">
                <h3 className="text-xl font-bold mb-4">Available EMI Plans</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {loan.emiPlans.map((plan, index) => {
                    try {
                      // Parse JSON string to object
                      const parsedPlan =
                        typeof plan === "string" ? JSON.parse(plan) : plan
                      return (
                        <div
                          key={index}
                          className="bg-base-200 p-4 rounded-lg text-center"
                        >
                          <p className="text-2xl font-bold text-primary mb-1">
                            {parsedPlan.months}
                          </p>
                          <p className="text-sm text-base-content/70">months</p>
                          <div className="divider my-2"></div>
                          <p className="text-lg font-semibold text-success">
                            {parsedPlan.rate}%
                          </p>
                          <p className="text-xs text-base-content/60">
                            interest
                          </p>
                        </div>
                      )
                    } catch (e) {
                      // Fallback for non-JSON plans
                      return (
                        <div
                          key={index}
                          className="bg-base-200 p-4 rounded-lg text-center"
                        >
                          <p className="font-semibold text-primary">{plan}</p>
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card sticky top-4"
            >
              <div className="card-body">
                <h3 className="text-xl font-bold mb-6">Loan Summary</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <p className="text-sm text-base-content/70 mb-1">
                      Interest Rate
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {loan.interestRate}%
                    </p>
                  </div>

                  <div className="divider my-2"></div>

                  <div>
                    <p className="text-sm text-base-content/70 mb-1">
                      Maximum Loan Amount
                    </p>
                    <p className="text-2xl font-bold">
                      ${loan.maxLoanLimit.toLocaleString()}
                    </p>
                  </div>

                  <div className="divider my-2"></div>

                  <div>
                    <p className="text-sm text-base-content/70 mb-1">
                      Processing Fee
                    </p>
                    <p className="text-lg font-semibold">$10</p>
                  </div>
                </div>

                <button
                  onClick={handleApplyNow}
                  className="btn btn-primary w-full btn-lg"
                >
                  Apply Now
                </button>

                <div className="mt-6 p-4 bg-info/10 rounded-lg">
                  <p className="text-sm text-center">
                    📞 Need help? <br />
                    <span className="font-semibold">
                      Call us: +1 (555) 123-4567
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoanDetails
