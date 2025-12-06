import React from "react";
import { useState } from "react";
import toast from "react-hot-toast"
import { FaBars, FaTimes } from "react-icons/fa"
import { Link, NavLink } from "react-router-dom"
import useAuth from "../../hooks/useAuth"
import ThemeToggle from "./ThemeToggle"

const Navbar = () => {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
      <NavLink to="/" className="text-primary">
        Home
      </NavLink>
      <NavLink to="/all-loans" className="text-primary">
        All Loans
      </NavLink>
      <NavLink to="/dashboard" className="text-white">
        Dashboard
      </NavLink>
    </>
  ) : (
    <>
      <NavLink to="/" className="text-primary-light">
        Home
      </NavLink>
      <NavLink to="/all-loans" className="text-primary-light">
        All Loans
      </NavLink>
      <NavLink to="/about" className="text-primary-light">
        About Us
      </NavLink>
      <NavLink to="/contact" className="text-primary-light">
        Contact
      </NavLink>
      <NavLink to="/login" className="text-primary-light">
        Login
      </NavLink>
    </>
  )

  return (
    <nav className="bg-neutral shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">
              Loan<span className="text-primary">Link</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks}

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* User Section */}
            {user && (
              <div className="flex items-center space-x-4">
                <div className="avatar">
                  <div className="w-10 h-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                    <img
                      src={(() => {
                        const photoURL =
                          user.photoURL || "https://via.placeholder.com/150"
                        console.log("🖼️ Navbar photoURL:", photoURL)
                        console.log(
                          "📸 Is from ImgBB?",
                          photoURL.includes("imgbb") ? "✅ YES" : "❌ NO"
                        )
                        return photoURL
                      })()}
                      alt={user.name}
                    />
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="btn btn-primary btn-sm"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white text-2xl"
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col space-y-2">
            {user ? (
              <>
                <NavLink
                  to="/"
                  className="block px-4 py-2 text-primary hover:bg-primary/20 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/all-loans"
                  className="block px-4 py-2 text-primary hover:bg-primary/20 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Loans
                </NavLink>
                <NavLink
                  to="/dashboard"
                  className="block px-4 py-2 text-white hover:bg-primary/20 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </NavLink>
                <div className="flex items-center space-x-3 px-4 py-2">
                  <div className="avatar">
                    <div className="w-10 h-10 rounded-full ring ring-primary">
                      <img
                        src={user.photoURL || "https://via.placeholder.com/150"}
                        alt={user.name}
                      />
                    </div>
                  </div>
                  <span className="text-white">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-white hover:bg-primary/20 rounded-lg transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/"
                  className="block px-4 py-2 text-primary-light hover:bg-primary/20 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/all-loans"
                  className="block px-4 py-2 text-primary-light hover:bg-primary/20 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  All Loans
                </NavLink>
                <NavLink
                  to="/about"
                  className="block px-4 py-2 text-primary-light hover:bg-primary/20 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </NavLink>
                <NavLink
                  to="/contact"
                  className="block px-4 py-2 text-primary-light hover:bg-primary/20 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </NavLink>
                <NavLink
                  to="/login"
                  className="block px-4 py-2 text-primary-light hover:bg-primary/20 rounded-lg transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
