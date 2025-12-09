import React from 'react'
import { useState } from "react";
import Countdown from "react-countdown"
import toast from "react-hot-toast"
import { FaBars, FaTimes } from "react-icons/fa"
import { Link, NavLink } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import SuspendDetailsModal from "../modals/SuspendDetailsModal"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  const { user, logout, loading } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showSuspendModal, setShowSuspendModal] = useState(false)

  // Countdown renderer for navbar
  const countdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return null
    }
    return (
      <span className="text-error text-sm font-bold">
        {days > 0 && <>{days}d </>}
        {hours}h {minutes}m {seconds}s
      </span>
    )
  }

  const handleLogout = async () => {
    try {
      await logout()
      toast.success("Logged out successfully!")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const navLinks = user ? (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
            : "text-base-content hover:text-primary transition-all duration-200 hover:scale-105"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/all-loans"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
            : "text-base-content hover:text-primary transition-all duration-200 hover:scale-105"
        }
      >
        All Loans
      </NavLink>
      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
            : "text-base-content hover:text-primary transition-all duration-200 hover:scale-105"
        }
      >
        Dashboard
      </NavLink>
    </>
  ) : (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
            : "text-base-content hover:text-primary transition-all duration-200 hover:scale-105"
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/all-loans"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
            : "text-base-content hover:text-primary transition-all duration-200 hover:scale-105"
        }
      >
        All Loans
      </NavLink>
      <NavLink
        to="/about"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
            : "text-base-content hover:text-primary transition-all duration-200 hover:scale-105"
        }
      >
        About Us
      </NavLink>
      <NavLink
        to="/contact"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
            : "text-base-content hover:text-primary transition-all duration-200 hover:scale-105"
        }
      >
        Contact
      </NavLink>
      <NavLink
        to="/login"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
            : "text-base-content hover:text-primary transition-all duration-200 hover:scale-105"
        }
      >
        Login
      </NavLink>
      <NavLink
        to="/register"
        className={({ isActive }) =>
          isActive
            ? "text-primary font-semibold relative after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-primary"
            : "text-base-content hover:text-primary transition-all duration-200 hover:scale-105"
        }
      >
        Register
      </NavLink>
    </>
  )

  return (
    <nav className="bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 shadow-sm sticky top-0 z-50 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <span className="text-2xl font-bold text-base-content group-hover:scale-105 transition-transform duration-200">
              Loan<span className="text-primary">Link</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">{navLinks}</div>

            <div className="flex items-center space-x-4 border-l border-base-content/10 pl-6">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* User Section - Only show after loading */}
              {!loading && (
                <>
                  {user && (
                    <div className="flex items-center space-x-3">
                      <div className="group relative">
                        <div className="avatar">
                          <div className="w-10 h-10 rounded-full ring-2 ring-primary/50 hover:ring-primary transition-all duration-200 group-hover:scale-110">
                            <img
                              src={
                                user.photoURL ||
                                "https://via.placeholder.com/150"
                              }
                              alt={user.name}
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-base-300 text-base-content text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
                          {user.name}
                        </div>
                      </div>

                      {/* Countdown Timer - Always visible for suspended users */}
                      {user.isSuspended && user.suspendUntil && (
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-error/10 rounded-lg border border-error/20">
                          <div className="flex flex-col">
                            <span className="text-[10px] text-error/70 uppercase font-semibold">
                              Suspended
                            </span>
                            <Countdown
                              date={new Date(user.suspendUntil)}
                              renderer={countdownRenderer}
                            />
                          </div>
                          <button
                            onClick={() => setShowSuspendModal(true)}
                            className="btn btn-xs btn-error"
                          >
                            Details
                          </button>
                        </div>
                      )}
                      <button
                        onClick={handleLogout}
                        className="btn btn-sm bg-gradient-to-r from-primary to-primary-hover hover:shadow-lg hover:scale-105 text-white border-none transition-all duration-200"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-base-content hover:text-primary text-2xl transition-all duration-200 hover:scale-110"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col space-y-1 bg-base-200/50 rounded-lg mt-2 p-2">
            {user ? (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-3 bg-primary/20 text-primary font-medium rounded-lg transition-all"
                      : "block px-4 py-3 text-base-content hover:bg-base-300 rounded-lg transition-all"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/all-loans"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-3 bg-primary/20 text-primary font-medium rounded-lg transition-all"
                      : "block px-4 py-3 text-base-content hover:bg-base-300 rounded-lg transition-all"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Loans
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-3 bg-primary/20 text-primary font-medium rounded-lg transition-all"
                      : "block px-4 py-3 text-base-content hover:bg-base-300 rounded-lg transition-all"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <div className="flex items-center space-x-3 px-4 py-3 bg-base-300 rounded-lg mt-2">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring-2 ring-primary/50">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/150"}
                        alt={user.name}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <span className="text-base-content font-medium block">
                      {user.name}
                    </span>
                    {/* Mobile Countdown */}
                    {user.isSuspended && user.suspendUntil && (
                      <div className="mt-1">
                        <Countdown
                          date={new Date(user.suspendUntil)}
                          renderer={countdownRenderer}
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Suspend Details Button - Mobile */}
                {user.isSuspended && (
                  <button
                    onClick={() => setShowSuspendModal(true)}
                    className="w-full text-center px-4 py-3 bg-error/20 text-error hover:bg-error/30 rounded-lg transition-all font-medium"
                  >
                    View Suspension Details
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full text-center px-4 py-3 bg-primary text-white hover:bg-primary-hover rounded-lg transition-all font-medium mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-3 bg-primary/20 text-primary font-medium rounded-lg transition-all"
                      : "block px-4 py-3 text-base-content hover:bg-base-300 rounded-lg transition-all"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/all-loans"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-3 bg-primary/20 text-primary font-medium rounded-lg transition-all"
                      : "block px-4 py-3 text-base-content hover:bg-base-300 rounded-lg transition-all"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Loans
                </NavLink>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-3 bg-primary/20 text-primary font-medium rounded-lg transition-all"
                      : "block px-4 py-3 text-base-content hover:bg-base-300 rounded-lg transition-all"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-3 bg-primary/20 text-primary font-medium rounded-lg transition-all"
                      : "block px-4 py-3 text-base-content hover:bg-base-300 rounded-lg transition-all"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-3 bg-primary/20 text-primary font-medium rounded-lg transition-all"
                      : "block px-4 py-3 text-base-content hover:bg-base-300 rounded-lg transition-all"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    isActive
                      ? "block px-4 py-3 bg-primary text-white font-medium rounded-lg transition-all mt-2"
                      : "block px-4 py-3 bg-primary/80 text-white hover:bg-primary rounded-lg transition-all mt-2 font-medium"
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>

      {/* Suspend Details Modal */}
      <SuspendDetailsModal
        isOpen={showSuspendModal}
        onClose={() => setShowSuspendModal(false)}
        suspensionReason={user?.suspensionReason}
        suspendUntil={user?.suspendUntil}
      />
    </nav>
  )
}

export default Navbar
