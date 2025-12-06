import { FaCheckCircle, FaReceipt, FaTimes } from "react-icons/fa"

const PaymentDetailsModal = ({ payment, onClose }) => {
  if (!payment) return null

  return (
    <dialog id="payment_details_modal" className="modal modal-open">
      <div className="modal-box max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-bold text-2xl flex items-center gap-2">
            <FaReceipt className="text-success" />
            Payment Details
          </h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            <FaTimes />
          </button>
        </div>

        <div className="space-y-4">
          {/* Success Badge */}
          <div className="alert alert-success">
            <FaCheckCircle className="text-xl" />
            <span className="font-semibold">Payment Successful!</span>
          </div>

          {/* Payment Information */}
          <div className="card bg-base-200">
            <div className="card-body">
              <h4 className="font-bold mb-3">Transaction Information</h4>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm opacity-70">Transaction ID</p>
                  <p className="font-semibold font-mono">
                    {payment.transactionId || payment._id}
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-70">Amount Paid</p>
                  <p className="font-semibold text-success text-lg">
                    ${payment.amount || "10.00"}
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-70">Email</p>
                  <p className="font-semibold">
                    {payment.email || payment.user?.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-70">Payment Date</p>
                  <p className="font-semibold">
                    {payment.paidAt
                      ? new Date(payment.paidAt).toLocaleString()
                      : new Date().toLocaleString()}
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-70">Loan ID</p>
                  <p className="font-semibold font-mono">
                    {payment.loanId || payment.loan?._id}
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-70">Payment Method</p>
                  <p className="font-semibold">
                    {payment.paymentMethod || "Stripe"}
                  </p>
                </div>

                <div>
                  <p className="text-sm opacity-70">Status</p>
                  <span className="badge badge-success">Paid</span>
                </div>

                <div>
                  <p className="text-sm opacity-70">Fee Type</p>
                  <p className="font-semibold">Application Fee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          {payment.notes && (
            <div className="card bg-base-200">
              <div className="card-body">
                <h4 className="font-bold mb-2">Notes</h4>
                <p className="text-sm">{payment.notes}</p>
              </div>
            </div>
          )}

          {/* Receipt Footer */}
          <div className="text-center pt-4 border-t">
            <p className="text-sm opacity-70">
              This is an electronic receipt. Keep this for your records.
            </p>
            <p className="text-xs opacity-50 mt-2">
              Transaction processed securely by LoanLink via Stripe
            </p>
          </div>
        </div>

        <div className="modal-action">
          <button onClick={onClose} className="btn btn-primary">
            Close
          </button>
          <button onClick={() => window.print()} className="btn btn-ghost">
            Print Receipt
          </button>
        </div>
      </div>
    </dialog>
  )
}

export default PaymentDetailsModal
