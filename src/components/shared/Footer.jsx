import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhone,
  FaTwitter,
} from "react-icons/fa"
import { Link } from "react-router-dom"
import React from "react"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral text-white">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              Loan<span className="text-primary">Link</span>
            </h3>
            <p className="text-white mb-4">
              Empowering financial inclusion through accessible microloans in Bangladesh. Your
              trusted partner for quick and transparent loan services.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl hover:text-primary transition">
                <FaFacebook />
              </a>
              <a href="#" className="text-2xl hover:text-primary transition">
                <FaTwitter />
              </a>
              <a href="#" className="text-2xl hover:text-primary transition">
                <FaLinkedin />
              </a>
              <a href="#" className="text-2xl hover:text-primary transition">
                <FaGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-white hover:text-primary transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/all-loans"
                  className="text-white hover:text-primary transition"
                >
                  All Loans
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-white hover:text-primary transition"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-white hover:text-primary transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              <li className="text-white">Personal Loans</li>
              <li className="text-white">Business Loans</li>
              <li className="text-white">Education Loans</li>
              <li className="text-white">Emergency Loans</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3 text-white">
                <FaMapMarkerAlt className="text-primary" />
                <span>123 Finance Street, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3 text-white">
                <FaPhone className="text-primary" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3 text-white">
                <FaEnvelope className="text-primary" />
                <span>info@loanlink.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-base-content/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-white text-sm">
              © {currentYear} LoanLink. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-white hover:text-primary text-sm transition"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-white hover:text-primary text-sm transition"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
