import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"

const LoanCard = ({ loan }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="card bg-base-100 border border-base-content/10 shadow-xl h-full  flex flex-col overflow-hidden"
    >
      {/* Loan Image */}
      <figure className="h-48 flex-shrink-0 overflow-hidden">
        <img
          src={
            loan.images?.[0] ||
            "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400&h=300&fit=crop"
          }
          alt={loan.title}
          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
        />
      </figure>

      <div className="card-body flex-1 flex flex-col p-5">
        {/* Category Badge */}
        <div className="badge badge-primary mb-3 flex justify-center items-center py-3 text-xs font-medium">
          {loan.category}
        </div>

        {/* Title */}
        <h3 className="card-title text-lg font-bold mb-2 line-clamp-1">
          {loan.title}
        </h3>

        {/* Description */}
        {/* <p className="text-base-content/70 text-sm line-clamp-2 mb-4 flex-shrink-0">
          {loan.description}
        </p> */}

        {/* Loan Details */}
        <div className="space-y-2 mb-4 flex-shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-sm text-base-content/70">Interest Rate:</span>
            <span className="font-semibold text-primary">
              {loan.interestRate}%
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-base-content/70">Max Limit:</span>
            <span className="font-semibold">
              ${loan.maxLoanLimit?.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Apply for Loan Button */}
        <div className="card-actions mt-auto">
          <Link
            to={`/loan-details/${loan._id}`}
            className="btn btn-primary  w-full flex justify-center items-center pb-3"
          >
            Apply for Loan
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default LoanCard
