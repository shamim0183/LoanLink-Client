import React from "react"
import { motion } from "framer-motion"

const PaymentSummaryStats = ({ payments }) => {
  const totalAmount = payments.reduce((sum, p) => sum + p.amount, 0)
  const completedCount = payments.filter((p) => p.status === "completed").length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="card mt-6 bg-gradient-to-br from-primary/10 to-secondary/10"
    >
      <div className="card-body">
        <h3 className="text-lg font-bold mb-4">Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-base-100 p-4 rounded-lg">
            <p className="text-sm text-base-content/70 mb-1">Total Payments</p>
            <p className="text-2xl font-bold text-primary">{payments.length}</p>
          </div>
          <div className="bg-base-100 p-4 rounded-lg">
            <p className="text-sm text-base-content/70 mb-1">
              Total Amount Paid
            </p>
            <p className="text-2xl font-bold text-success">
              ${totalAmount.toFixed(2)}
            </p>
          </div>
          <div className="bg-base-100 p-4 rounded-lg">
            <p className="text-sm text-base-content/70 mb-1">
              Completed Payments
            </p>
            <p className="text-2xl font-bold text-info">{completedCount}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default PaymentSummaryStats
