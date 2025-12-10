import React from "react"
import PropTypes from "prop-types"

const ReceiptCard = ({ payment }) => {
  return (
    <div id="receipt-content" className="card bg-base-100 shadow-2xl">
      <div className="card-body p-8">
        {/* Header */}
        <div className="text-center border-b-2 border-primary pb-4 mb-6">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">📊</span>
            <h2 className="text-3xl font-bold text-primary">LoanLink</h2>
          </div>
          <p className="text-sm text-base-content/60 font-semibold">
            PAYMENT RECEIPT
          </p>
          <p className="text-xs text-base-content/50 mt-1">
            Transaction ID: {payment.transactionId}
          </p>
        </div>

        {/* Payment Information Table */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-primary">
            Payment Information
          </h3>
          <table className="table table-zebra w-full">
            <tbody>
              <tr>
                <td className="font-semibold w-1/3">Amount Paid</td>
                <td className="text-right">
                  <span className="text-2xl font-bold text-success">
                    ${payment.amount.toFixed(2)}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Payment Date</td>
                <td className="text-right">
                  {new Date(payment.createdAt).toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Payment Method</td>
                <td className="text-right">Stripe</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Applicant Details Table */}
        <div className="mb-6">
          <h3 className="text-lg font-bold mb-3 text-primary">
            Applicant Details
          </h3>
          <table className="table table-zebra w-full">
            <tbody>
              <tr>
                <td className="font-semibold w-1/3">Full Name</td>
                <td className="text-right">
                  {payment.applicationId.firstName}{" "}
                  {payment.applicationId.lastName}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Email</td>
                <td className="text-right">{payment.userEmail}</td>
              </tr>
              <tr>
                <td className="font-semibold">Contact Number</td>
                <td className="text-right">
                  {payment.applicationId.contactNumber}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">National ID</td>
                <td className="text-right">
                  {payment.applicationId.nationalId}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Loan Details Table */}
        <div className="mb-4">
          <h3 className="text-lg font-bold mb-3 text-primary">Loan Details</h3>
          <table className="table table-zebra w-full">
            <tbody>
              <tr>
                <td className="font-semibold w-1/3">Loan Type</td>
                <td className="text-right">{payment.loanId.title}</td>
              </tr>
              <tr>
                <td className="font-semibold">Category</td>
                <td className="text-right capitalize">
                  {payment.loanId.category}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Requested Amount</td>
                <td className="text-right font-bold text-primary">
                  ${payment.applicationId.loanAmount.toLocaleString()}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Interest Rate</td>
                <td className="text-right font-bold text-primary">
                  {payment.applicationId.interestRate}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Footer Note */}
        <div className="text-center mt-6 pt-4 border-t">
          <p className="text-xs text-base-content/50">
            Thank you for choosing LoanLink. For any queries, please contact our
            support team.
          </p>
        </div>
      </div>
    </div>
  )
}

ReceiptCard.propTypes = {
  payment: PropTypes.shape({
    transactionId: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    userEmail: PropTypes.string.isRequired,
    applicationId: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      contactNumber: PropTypes.string.isRequired,
      nationalId: PropTypes.string.isRequired,
      loanAmount: PropTypes.number.isRequired,
      interestRate: PropTypes.number.isRequired,
    }).isRequired,
    loanId: PropTypes.shape({
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default ReceiptCard
