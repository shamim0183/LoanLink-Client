import React from "react"
const ReceiptHeader = ({ transactionId }) => {
  return (
    <div className="text-center border-b-2 border-primary pb-4 mb-6">
      <div className="flex items-center justify-center gap-2 mb-2">
        <span className="text-3xl">📊</span>
        <h2 className="text-3xl font-bold text-primary">LoanLink</h2>
      </div>
      <p className="text-sm text-base-content/60 font-semibold">
        PAYMENT RECEIPT
      </p>
      <p className="text-xs text-base-content/50 mt-1">
        Transaction ID: {transactionId}
      </p>
    </div>
  )
}

export default ReceiptHeader
