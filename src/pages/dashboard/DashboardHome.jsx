import React from 'react'
import { motion } from "framer-motion";
import {
  FaCheckCircle,
  FaFileAlt,
  FaHourglassHalf,
  FaUsers,
} from "react-icons/fa"
import useAuth from "../../hooks/useAuth"
import { useNavigate } from "react-router-dom"

const DashboardHome = () => {
  const { user } = useAuth()
  const navigate = useNavigate()

  // Demo stats
  const stats = {
    admin: [
      {
        label: "Total Users",
        value: "1,234",
        icon: <FaUsers />,
        color: "bg-primary",
      },
      {
        label: "Total Loans",
        value: "156",
        icon: <FaFileAlt />,
        color: "bg-secondary",
      },
      {
        label: "Pending",
        value: "23",
        icon: <FaHourglassHalf />,
        color: "bg-warning",
      },
      {
        label: "Approved",
        value: "133",
        icon: <FaCheckCircle />,
        color: "bg-success",
      },
    ],
    manager: [
      {
        label: "My Loans",
        value: "45",
        icon: <FaFileAlt />,
        color: "bg-primary",
      },
      {
        label: "Pending Apps",
        value: "12",
        icon: <FaHourglassHalf />,
        color: "bg-warning",
      },
      {
        label: "Approved",
        value: "28",
        icon: <FaCheckCircle />,
        color: "bg-success",
      },
      {
        label: "Total Amount",
        value: "$1.2M",
        icon: <FaFileAlt />,
        color: "bg-secondary",
      },
    ],
    borrower: [
      {
        label: "My Applications",
        value: "3",
        icon: <FaFileAlt />,
        color: "bg-primary",
      },
      {
        label: "Pending",
        value: "1",
        icon: <FaHourglassHalf />,
        color: "bg-warning",
      },
      {
        label: "Approved",
        value: "2",
        icon: <FaCheckCircle />,
        color: "bg-success",
      },
      {
        label: "Total Borrowed",
        value: "$15K",
        icon: <FaFileAlt />,
        color: "bg-secondary",
      },
    ],
  }

  const userStats = stats[user?.role] || stats.borrower

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
        {userStats.map((stat, index) => (
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
                  onClick={() => navigate("/dashboard/my-loans")}
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
