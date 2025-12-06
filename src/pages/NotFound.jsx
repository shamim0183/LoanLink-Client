import React from "react"
import { motion } from "framer-motion"
import { FaFileAlt, FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full text-center"
      >
        {/* Animated GIF */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <img
            src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExcTRoaGE1c3RrYjR3aWh5bjhtcGU0Y2xvNWh5dm9qeGpvZmZqMnVhayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/14uQ3cOFteDaU/giphy.gif"
            alt="404 Not Found"
            className="w-full max-w-md mx-auto rounded-2xl shadow-xl"
          />
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-base-content mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-base-content/70 text-lg mb-8">
            Looks like this loan got lost in the shuffle! The page you're
            looking for doesn't exist.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/" className="btn btn-primary btn-lg gap-2">
            <FaHome className="text-xl" />
            Go to Home
          </Link>
          <Link to="/all-loans" className="btn btn-outline btn-lg gap-2">
            <FaFileAlt className="text-xl" />
            Browse Loans
          </Link>
        </motion.div>

        {/* Fun Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 text-base-content/50 text-sm"
        >
          Error Code: LOAN_NOT_FOUND_404 🔍
        </motion.p>
      </motion.div>
    </div>
  )
}

export default NotFound
