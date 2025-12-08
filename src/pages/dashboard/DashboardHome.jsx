import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { motion } from "framer-motion"
import {
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaUsers,
} from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import useAuth from "../../hooks/useAuth"

const DashboardHome = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Fetch dynamic stats from backend
  const { data: statsData, isLoading } = useQuery({
    queryKey: ["dashboardStats", user?.role],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/dashboard/stats`,
        {
          withCredentials: true,
        }
      )
      return data
    },
    enabled: !!user,
  })

  // Build stats array based on role and fetched data
  const getStats = () => {
    if (!statsData) return []

    if (user?.role === "admin") {
      return [
        {
          label: "Total Users",
          value: statsData.totalUsers || 0,
          icon: <FaUsers />,
          color: "bg-primary",
        },
        {
          label: "Total Loans",
          value: statsData.totalLoans || 0,
          icon: <FaFileAlt />,
          color: "bg-secondary",
        },
        {
          label: "Pending",
          value: statsData.pendingApplications || 0,
          icon: <FaHourglassHalf />,
          color: "bg-warning",
        },
        {
          label: "Approved",
          value: statsData.approvedApplications || 0,
          icon: <FaCheckCircle />,
          color: "bg-success",
        },
      ]
    }

    if (user?.role === "manager") {
      return [
        {
          label: "My Loans",
          value: statsData.myLoans || 0,
          icon: <FaFileAlt />,
          color: "bg-primary",
        },
        {
          label: "Pending Apps",
          value: statsData.pendingApplications || 0,
          icon: <FaHourglassHalf />,
          color: "bg-warning",
        },
        {
          label: "Approved",
          value: statsData.approvedApplications || 0,
          icon: <FaCheckCircle />,
          color: "bg-success",
        },
        {
          label: "Total Amount",
          value: `$${((statsData.totalAmount || 0) / 1000).toFixed(1)}K`,
          icon: <FaFileAlt />,
          color: "bg-secondary",
        },
      ]
    }

    // Borrower stats
    return [
      {
        label: "My Applications",
        value: statsData.myApplications || 0,
        icon: <FaFileAlt />,
        color: "bg-primary",
      },
      {
        label: "Pending",
        value: statsData.pendingApplications || 0,
        icon: <FaHourglassHalf />,
        color: "bg-warning",
      },
      {
        label: "Approved",
        value: statsData.approvedApplications || 0,
        icon: <FaCheckCircle />,
        color: "bg-success",
      },
      {
        label: "Total Borrowed",
        value: `$${((statsData.totalBorrowed || 0) / 1000).toFixed(1)}K`,
        icon: <FaFileAlt />,
        color: "bg-secondary",
      },
    ]
  }

  const userStats = getStats()

  return (
    <div>
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {user?.name}! 👋
        </h1>
        <p className="text-base-content/70">
          Here's what's happening with your{" "}
          {user?.role === "borrower" ? "loans" : "dashboard"} today.
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {isLoading
          ? // Loading skeletons
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="card">
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="h-4 bg-base-300 rounded w-24 mb-2 animate-pulse"></div>
                      <div className="h-8 bg-base-300 rounded w-16 animate-pulse"></div>
                    </div>
                    <div className="w-16 h-16 bg-base-300 rounded-lg animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))
          : userStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card"
              >
                <div className="card-body">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-base-content/70 mb-1">
                        {stat.label}
                      </p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div
                      className={`p-4 rounded-lg ${stat.color} text-white text-2xl`}
                    >
                      {stat.icon}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="card"
      >
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {user?.role === "borrower" && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/all-loans")}
                >
                  Apply for New Loan
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/dashboard/my-loans")}
                >
                  View My Loans
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/dashboard/payment-history")}
                >
                  Payment History
                </button>
              </>
            )}
            {user?.role === "manager" && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/dashboard/add-loan")}
                >
                  Add New Loan
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/dashboard/pending")}
                >
                  Review Applications
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/dashboard/manage-loans")}
                >
                  View Reports
                </button>
              </>
            )}
            {user?.role === "admin" && (
              <>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/dashboard/manage-users")}
                >
                  Manage Users
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/dashboard/all-loans")}
                >
                  View All Loans
                </button>
                <button
                  className="btn btn-outline"
                  onClick={() => navigate("/dashboard/manage-users")}
                >
                  System Settings
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card mt-6"
      >
        <div className="card-body">
          <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
              <div>
                <p className="font-semibold">New loan application submitted</p>
                <p className="text-sm text-base-content/70">2 hours ago</p>
              </div>
              <span className="badge badge-warning flex justify-center items-center py-3">
                Pending
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
              <div>
                <p className="font-semibold">Loan application approved</p>
                <p className="text-sm text-base-content/70">1 day ago</p>
              </div>
              <span className="badge badge-success flex justify-center items-center py-3">
                Approved
              </span>
            </div>
            <div className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
              <div>
                <p className="font-semibold">Payment received</p>
                <p className="text-sm text-base-content/70">3 days ago</p>
              </div>
              <span className="badge badge-info flex justify-center items-center py-3">
                Paid
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default DashboardHome
