import React from "react"
import { useState } from "react"
import toast from "react-hot-toast"
import {
  FaBars,
  FaCheckCircle,
  FaFileAlt,
  FaHome,
  FaPlus,
  FaSignOutAlt,
  FaTasks,
  FaTimes,
  FaUser,
  FaUsers,
} from "react-icons/fa"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const DashboardLayout = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully")
      navigate("/")
    } catch (error) {
      toast.error(error.message || "Logout failed")
    }
  }

  // Admin Menu
  const adminMenu = [
    { to: "/dashboard", icon: <FaHome />, text: "Dashboard" },
    { to: "/dashboard/manage-users", icon: <FaUsers />, text: "Manage Users" },
    { to: "/dashboard/all-loans", icon: <FaFileAlt />, text: "All Loans" },
    {
      to: "/dashboard/loan-applications",
      icon: <FaTasks />,
      text: "Applications",
    },
  ]

  // Manager Menu
  const managerMenu = [
    { to: "/dashboard", icon: <FaHome />, text: "Dashboard" },
    { to: "/dashboard/add-loan", icon: <FaPlus />, text: "Add Loan" },
    {
      to: "/dashboard/manage-loans",
      icon: <FaFileAlt />,
      text: "Manage Loans",
    },
    {
      to: "/dashboard/pending-applications",
      icon: <FaTasks />,
      text: "Pending",
    },
    {
      to: "/dashboard/approved-applications",
      icon: <FaCheckCircle />,
      text: "Approved",
    },
    { to: "/dashboard/profile", icon: <FaUser />, text: "Profile" },
  ]

  // Borrower Menu
  const borrowerMenu = [
    { to: "/dashboard", icon: <FaHome />, text: "Dashboard" },
    { to: "/dashboard/my-loans", icon: <FaFileAlt />, text: "My Loans" },
    { to: "/dashboard/profile", icon: <FaUser />, text: "Profile" },
  ]

  const getMenuItems = () => {
    if (user?.role === "admin") return adminMenu
    if (user?.role === "manager") return managerMenu
    return borrowerMenu
  }

  const menuItems = getMenuItems()

  const MenuItem = ({ to, icon, text }) => {
    const isActive = location.pathname === to

    return (
      <Link
        to={to}
        onClick={() => setSidebarOpen(false)}
        className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
          isActive ? "bg-primary text-white" : "text-white hover:bg-primary/20"
        }`}
      >
        <span className="text-xl">{icon}</span>
        <span className="font-medium">{text}</span>
      </Link>
    )
  }

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 right-4 z-50 btn btn-sm bg-base-100 border border-base-content/20 hover:bg-primary hover:border-primary text-base-content hover:text-white shadow-lg transition-all"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-neutral transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-base-content/10">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">
                Loan<span className="text-primary">Link</span>
              </span>
            </Link>
          </div>

          {/* User Info */}
          <div className="p-6 border-b border-base-content/10">
            <div className="flex items-center space-x-3">
              <div className="avatar">
                <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-2 ring-offset-neutral">
                  <img
                    src={user?.photoURL || "https://via.placeholder.com/150"}
                    alt={user?.name}
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-semibold truncate">
                  {user?.name}
                </p>
                <p className="text-sm text-base-content/70 capitalize">
                  {user?.role}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item, index) => (
              <MenuItem key={index} {...item} />
            ))}
          </nav>

          {/* Logout Button */}
          <div className="p-4 border-t border-base-content/10">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-3 w-full px-4 py-3 text-white hover:bg-error/20 rounded-lg transition-all"
            >
              <FaSignOutAlt className="text-xl" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-x-hidden">
        <div className="p-4 pt-16 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default DashboardLayout
